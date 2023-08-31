<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Categorie;

class Article extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        "libelle","prix","stock","categorie_id","photo","reference"
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function fournisseurs()
    {
        return $this->belongsToMany(Fournisseur::class, 'article_fournisseurs', 'article_id', 'fournisseur_id');
    }

    public function articleVente()
    {
        return $this->belongsToMany(ArticleVente::class, 'breukhs', 'article_id', 'article_vente_id');
    }

    protected static function booted():void
    {
        static::created(function (Article $article) {
            $fournisseurs = request()->fournisseurs;
            $fourId = Fournisseur::whereIn('nomComplet', $fournisseurs)->pluck('id');
            $article->fournisseurs()->attach($fourId);
        });

        static::deleted(function (Article $article) {
            $article->fournisseurs()->detach();
        });
    }

}

