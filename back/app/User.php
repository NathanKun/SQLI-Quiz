<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'time', 'score'
    ];

    public function questions()
    {
        return $this->belongsToMany('App\Question');
    }

    public function responses()
    {
        return $this->hasMany('App\Response');
    }
}
