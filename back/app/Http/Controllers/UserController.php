<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\User;

class UserController extends Controller
{
    public function userLogin(Request $request) {
    	$user = $this->checkIsUserExisted($request);
    	if($user instanceof JsonResponse) return $user;

    	return response()->json([
		    'valid' => true,
		    'data' => $user
		]);
    }

    public function filterUserName(Request $request) {
    	$str = $request->str;
    	$users = User::where('name', 'LIKE', '%'.$str.'%')->get()->makeHidden('id');
    	$res = array();
    	foreach ($users as $k => $v) {
    		array_push($res, $v->name);
    	}
    	return $res;
    }

    public function getUserState(Request $request) {
        $user = $this->findUser($request);
        if($user instanceof JsonResponse) return $user;

        // not composed yet
        if(!$this->checkIsComposedQuestionsInternal($user)) {
            return response()->json([
                'valid' => true,
                'data' => array(
                    'user' => $user,
                    'state' => "composing"
                )
            ]);
        }

        $questions = $user->questions()->get();
        $responses = $user->responses()->get();

        $questionArray = $questions->toArray();
        $responseArray = $responses->toArray();

        // composed, responsing question
        if($questions->count() != $responses->count()) {
            return response()->json([
                'valid' => true,
                'data' => array(
                    'user' => $user,
                    'state' => "responsing",
                    'questions' => $questionArray,
                    'responses' => $responseArray
                )
            ]);
        }

        // responsed, show result
        return response()->json([
            'valid' => true,
            'data' => array(
                'user' => $user,
                'state' => "responsed",
                'questions' => $questionArray,
                'responses' => $responseArray,
                'result' => $this->calculateResult($questions, $responses)
            )
        ]);
    }

    private function calculateResult($questions, $responses) {
        $answersIdChosen = array();
        $totalTime = 0;
        $totalPoints = 0;

        foreach ($responses as $r) {
            $totalTime += $r->time;
            array_push($answersIdChosen, $r->answer()->first()->id);
        }

        foreach ($questions as $q) {
            $answersOfQuestion = $q->answers()->get();
            foreach ($answersOfQuestion as $a) {
                if ($a->isCorrect) {
                    if(in_array($a->id, $answersIdChosen)) {
                        if($q->type == 'extra') {
                            $totalPoints += 2;
                        } else {
                            $totalPoints += 1;
                        }
                    }
                } else {
                    if(in_array($a->id, $answersIdChosen)) {
                        if($q->type == 'extra') {
                            $totalPoints -= 1;
                        } else {
                            // nothing
                        }
                    }
                }
            }
        }

        return array("time" => $totalTime, "points" => $totalPoints);
    }

    private function checkIsUserExisted(Request $request) {
    	$userName = $request->name;
    	$user = User::where('name', $userName)->first();

    	if($userName == null || $user == null) {
    		return response()->json([
			    'valid' => false,
			    'error' => 'user name not exists'
			]);
    	}
    	return $user;
    }

    private function checkIsComposedQuestionsInternal(User $user) {
        return $user->questions()->count() == 0 ? false : true;
    }

    private function findUser(Request $request) {
        $userId = $request->userId;
        if($userId == null) {
            return response()->json([
                'valid' => false,
                'error' => 'userId param missing'
            ]);
        }

        $user = User::find($userId);
        if($user == null) {
            return response()->json([
                'valid' => false,
                'error' => 'user id not exists'
            ]);
        }

        return $user;
    }
}
