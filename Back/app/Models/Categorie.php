<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Article;

class Categorie extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "libelle", "numArticles", "typeArticle"
    ];

    public function articles()
    {
        return $this->hasMany(Article::class, 'categorie_id');
    }

    public function articlesVente()
    {
        return $this->hasMany(ArticleVente::class, 'categorie_id');
    }


}
