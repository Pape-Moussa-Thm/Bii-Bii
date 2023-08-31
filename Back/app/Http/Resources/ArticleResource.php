<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
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
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'categorie_id' => $this->categorie_id,
            'libelle' => $this->libelle,
            'prix' => $this->prix,
            'stock' => $this->stock,
            'categorie_libelle'=>$this->categorie->libelle,
            'categorie_numArticles' => $this->categorie->numArticles,
            'fournisseurs'=>$this->fournisseurs,
            'photo' => $this->photo
        ];
    }

}

