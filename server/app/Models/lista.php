<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lista extends Model
{



    use HasFactory;

    protected $fillable = [
        'title',
        'completed',
        'store_id',
        'user_id',
    ];

    public function storee() {
        return $this->belongsTo(Store::class);
    }

    public function userr() {
        return $this->belongsTo(User::class);
    }
}
