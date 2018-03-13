<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

use App\User;
use App\Question;
use App\Answer;
use App\Response as Res;

class ResponseController extends Controller
{
    public function postResponse(Request $request) {
    	// validation
    	$user = $this->findUser($request);
    	if($user instanceof JsonResponse) return $user;

    	if(!$this->checkIsComposedQuestionsInternal($user)) {
    		return response()->json([
			    'valid' => false,
			    'error' => 'questions not composed'
			]);
    	}

    	$time = $request->time;
    	$answerId = $request->answerId;

    	if($time == null || $answerId == null) {
    		return response()->json([
			    'valid' => false,
			    'error' => 'Param(s) missing'
			]);
    	}

    	if(!ctype_digit($time) || $time <= 0) {
    		return response()->json([
			    'valid' => false,
			    'error' => 'time should be a positif number'
			]);
    	}

    	$answer = Answer::find($answerId);
    	if($answer == null) {
    		return response()->json([
			    'valid' => false,
			    'error' => 'answerId not exists'
			]);
    	}

    	// check if user chose a question which contains this id
    	$questions = $user->questions()->get();
    	$found = false;
    	$answeringQuestionId = null;
    	foreach ($questions as $q) {
    		$answersOfQuestion = $q->answers()->get();
    		foreach ($answersOfQuestion as $a) {
    			if($a->id == $answer->id) {
    				$found = true;
    				$answeringQuestionId = $q->id;
    			}
    		}
    	}

    	if(!$found) {
    		return response()->json([
			    'valid' => false,
			    'error' => 'user didn\'t choose a question with this answerId'
			]);
    	}

    	// check if user has already response this question
    	$responsesResponsed = $user->responses()->get();
    	$isResponsed = false;
    	foreach ($responsesResponsed as $r) {
    		$qId = $r->answer()->join('questions', 'answers.question_id', '=', 'questions.id')->select(DB::raw('questions.id'))->first()->id;
    		if($qId == $answeringQuestionId) $isResponsed = true;
    	}

    	if($isResponsed) {
    		return response()->json([
			    'valid' => false,
			    'error' => 'user has already responsed this questions'
			]);
    	}

    	$resp = new Res;
    	$resp->time = $time;
    	$resp->answer()->associate($answer);
    	$resp->user()->associate($user);
    	$resp->save();

    	return response()->json([
		    'valid' => true,
		    'data' => 'response saved'
		]);
    }

	/**
	 * Internal usage
	 */
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
