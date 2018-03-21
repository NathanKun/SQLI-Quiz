<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/question/checkiscomposedquestions', 'QuestionController@checkIsComposedQuestions');
Route::post('/question/composequestions', 'QuestionController@composeQuestions');
Route::post('/question/getquestionsofuser', 'QuestionController@getQuestionsOfUser');
Route::post('/question/retry', 'QuestionController@retry');

Route::post('/response/postResponse', 'ResponseController@postResponse');

Route::post('/user/userlogin', 'UserController@userLogin');
Route::get('/user/filterusername', 'UserController@filterUserName');
Route::post('/user/getuserstate', 'UserController@getUserState');
Route::get('/user/getranks', 'UserController@getRanks');
Route::get('/user/getuserlist', 'UserController@getUserList');
