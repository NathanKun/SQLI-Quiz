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

    private function getUserState(Request $request) {
        $user = $this->checkIsUserExisted($request);
        if($user instanceof JsonResponse) return $user;

        // not composed yet
        if(!$this->checkIsComposedQuestionsInternal($user)) {
            return response()->json([
                'valid' => true,
                'data' => {
                    'user' => $user,
                    'state' => "composing"
                }
            ]);
        }

        $questions = $user->questions();
        $responses = $user->responses();

        // composed, responsing question
        if($questions->count() != $responses->count()) {
            return response()->json([
                'valid' => true,
                'data' => {
                    'user' => $user,
                    'state' => "responsing",
                    'questions' => $question->toArray(),
                    'responses' => $responses->toArray()
                }
            ]);
        }

        // responsed, show result
        return response()->json([
            'valid' => true,
            'data' => {
                'user' => $user,
                'state' => "responsed",
                'questions' => $question->toArray(),
                'responses' => $responses->toArray(),
                'result' => ""
            }
        ]);
    }

    private function getResult(User $user) {
        $questions = $user->questions();
        $responses = $user->responses();
        
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
}
