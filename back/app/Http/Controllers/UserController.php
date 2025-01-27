<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\User;

class UserController extends Controller
{
    public function addUser(Request $request) {
        $name = $request->name;

        if($name === null) {
            return response()->json([
                'valid' => false,
                'error' => "param name is missing"
            ]);
        }

        $usersSameName = User::where("name", $name)->get()->count();
        if($usersSameName > 0) {
            return response()->json([
                'valid' => false,
                'error' => "This name has already been added"
            ]);
        } 
        
        $user = new User;
        $user->timestamps = false;
        $user->name = $name;
        $user->save();

        return response()->json([
            'valid' => true
        ]);
    }

    public function getUserList(Request $request) {
        return User::get(['name'])->toArray();
    }

    public function getRanks(Request $request) {
        return response()->json(User::whereNotNull("time")->get()->toArray());
    }

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

        //if($user->time === null) {
        $result = $this->calculateResult($questions, $responses);
        $user->time = $result["time"];
        $user->score = $result["score"];
        $user->timestamps = false;
        $user->save();
        //}

        // responsed, show result
        return response()->json([
            'valid' => true,
            'data' => array(
                'user' => $user,
                'state' => "responsed",
                'questions' => $questionArray,
                'responses' => $responseArray,
                'result' => array("time" => $user->time, "score" =>$user->score)
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

        $questionCount = 0;
        foreach ($questions as $q) {
            $questionCount++;
            $answersOfQuestion = $q->answers()->get();
            foreach ($answersOfQuestion as $a) {
                if ($a->isCorrect) {
                    if(in_array($a->id, $answersIdChosen)) {
                        if($questionCount > 5) {
                            $totalPoints += 2;
                            //error_log("extra +2");
                        } else {
                            $totalPoints += 1;
                            //error_log("normal +1");
                        }
                    }
                } else {
                    if(in_array($a->id, $answersIdChosen)) {
                        if($questionCount > 5) {
                            $totalPoints -= 1;
                            //error_log("extra -1");
                        } else {
                            // nothing
                            //error_log("normal 0");
                        }
                    }
                }
            }
        }

        return array("time" => $totalTime, "score" => $totalPoints);
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
