<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleVenteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'categorie_id' => $this->categorie_id,
            'libelle' => $this->libelle,
            'prix_vente' => $this->prix_vente,
            'qteStock' => $this->qteStock,
            'marge' => $this->marge,
            'valeur' => $this->valeur,
            'promo' => $this->promo,
            'cout' => $this->cout,
            'reference' => $this->reference,
            'categorie_libelle'=>$this->categorie->libelle,
            'categorie_numArticles' => $this->categorie->numArticles,
            'article'=>$this->article,
            'photo' => $this->photo
        ];    
    }

}
