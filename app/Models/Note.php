<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    /** @use HasFactory<\Database\Factories\NoteFactory> */
    use HasFactory;

    protected $guarded = [];

    public function inscription() {
        return $this->belongsTo(Inscription::class);
    }

    public function evaluation() {
        return $this->belongsTo(Evaluation::class);
    }
}
