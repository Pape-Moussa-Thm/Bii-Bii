<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Breukh extends Model
{
    use HasFactory;

    protected $fillable = [
        "article_id", "qte", "article_vente_id"
    ];

    public function articles()
    {
        return $this->belongsTo(Article::class);
    }

    public function articlesVentes()
    {
        return $this->belongsTo(ArticleVente::class);
    }
}
