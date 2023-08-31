<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Article;


class ArticleVente extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable=["promo", "valeur", "categorie_id", "cout", "marge", "prix_vente", "reference", "photo"];

    public function article()
    {
        return $this->belongsToMany(Article::class, 'breukhs', 'article_vente_id', 'article_id')
                    ->withPivot('qte')
                    ->withTimestamps();
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    protected static function booted():void
    {
        static::created(function (ArticleVente $article) {
            $artConf = request()->articlesConfection;
            $articlesVente = [];

            foreach ($artConf as $confectionItem) {
                $key = key($confectionItem);
                $articleName = $confectionItem[$key];
                $quantity = $confectionItem['qte'];

                $articleConf = Article::where('libelle', $articleName)->first();

                $articleVente =  [
                    'qte' => $quantity,
                    'article_id' => $articleConf->id,
                    'article_vente_id' => $article->id,
                ];
                $articlesVente [] = $articleVente;
            }
            $article->article()->attach($articlesVente);
        });

        static::updated(function (ArticleVente $article) {
            $article->article()->detach();
            $artConf = request()->articlesConfection;
            $articlesVente = [];

            foreach ($artConf as $confectionItem) {
                $key = key($confectionItem);
                $articleName = $confectionItem[$key];
                $quantity = $confectionItem['qte'];

                $articleConf = Article::where('libelle', $articleName)->first();

                $articleVente =  [
                    'qte' => $quantity,
                    'article_id' => $articleConf->id,
                    'article_vente_id' => $article->id,
                ];
                $articlesVente [] = $articleVente;
            }
            $article->article()->attach($articlesVente);
        });

        static::deleted(function (ArticleVente $article) {
            $article->article()->detach();
        });

    }

}

