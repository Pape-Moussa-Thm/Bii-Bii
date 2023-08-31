<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleFournisseur extends Model
{
    use HasFactory;

    public function articles()
    {
        return $this->belongsTo(Article::class);
    }

    public function fournisseurs()
    {
        return $this->belongsTo(Fournisseur::class);
    }

}

