<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use App\Models\ArticleVente;
use App\Http\Resources\ArticleVenteResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ArticleVenteCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
       $articles = ArticleVente::paginate(2);
        return [
            "data" => [
                "articles" => ArticleVenteResource::collection($articles),
                "art" => ArticleVente::all()
            ],
        ];
    }

    public function paginationInformation($resquest, $paginated, $default)
    {
        return [
            "data" => [
                "link" => $default["meta"]['links'],
                "message" => "Sucess",
                "sucess" => 200
            ]
        ];
    }


}

