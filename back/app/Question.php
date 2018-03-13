<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $with = ['answers'];
    protected $hidden = array('pivot');

    protected $fillable = [
        'type', 'text'
    ];

    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    public function answers()
    {
        return $this->hasMany('App\Answer');
    }
}
