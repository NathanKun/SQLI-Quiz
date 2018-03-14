<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $hidden = array('id', 'created_at', 'updated_at');

    protected $fillable = [
        'time'
    ];

    public function answer()
    {
        return $this->belongsTo('App\Answer');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
