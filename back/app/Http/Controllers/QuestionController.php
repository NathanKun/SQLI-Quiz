<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

use App\User;
use App\Question;
use App\Anwser;
use App\Response as Res;

class QuestionController extends Controller
{

	public function getQuestionsOfUser(Request $request) {
    	$user = $this->findUser($request);
    	if($user instanceof JsonResponse) return $user;

    	if(!$this->checkIsComposedQuestionsInternal($user)) {
    		return response()->json([
			    'status' => 'error',
			    'error' => 'questions not composed'
			]);
    	}

    	return $user->questions()->get()->toArray();;
	}

    public function checkIsComposedQuestions(Request $request) {
    	$user = $this->findUser($request);
    	if($user instanceof JsonResponse) return $user;

    	if($this->checkIsComposedQuestionsInternal($user)) {
    		return response()->json([
			    'status' => 'ok',
			    'isComposed' => true
			]);
    	} else {
    		return response()->json([
			    'status' => 'ok',
			    'isComposed' => false
			]);
    	}
    }    

    public function composeQuestions(Request $request) {
    	$user = $this->findUser($request);
    	if($user instanceof JsonResponse) return $user;

    	if($this->checkIsComposedQuestionsInternal($user)) {
    		return response()->json([
			    'status' => 'error',
			    'error' => 'already composed questions'
			]);
    	}

    	$techniqueCount = $request->technique;
    	$pilotageCount = $request->pilotage;
    	$fonctionnelCount = $request->fonctionnel;
    	$extraCount = $request->extra;

    	if($techniqueCount == null || $pilotageCount == null || $fonctionnelCount == null || $extraCount == null) {
    		return response()->json([
			    'status' => 'error',
			    'error' => 'questionCounts missing'
			]);
    	}

		$userId = $user->id;

    	$this->attachQuestionsToUser('technique', $userId, $techniqueCount);
    	$this->attachQuestionsToUser('pilotage', $userId, $pilotageCount);
    	$this->attachQuestionsToUser('fonctionnel', $userId, $fonctionnelCount);
    	$this->attachQuestionsToUser('extra', $userId, $extraCount);

    	return response()->json([
		    'status' => 'ok'
		]);
    }

	/**
	 * attach random questions to user
	 */
    private function attachQuestionsToUser(string $type, int $userId, int $questionCount) {
    	$rands = array();
    	$questions = Question::where('type', $type);
    	$questionsTotal = $questions->count();

    	for ($i = 0; $i < $questionCount; $i++) {
    		$rand = 0;
    		do {
    			$rand = rand(0, $questionsTotal - 1);
    		} while(in_array($rand, $rands));
    		array_push($rands, $rand);

    		$q = $questions->get()->get($rand);
    		$q->users()->attach($userId);
    	}
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
