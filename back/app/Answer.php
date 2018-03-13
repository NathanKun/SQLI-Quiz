<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
	protected $hidden = array('question_id');

    protected $fillable = [
        'answer', 'isCorrect'
    ];

    public function question()
    {
        return $this->belongsTo('App\Question');
    }
}
