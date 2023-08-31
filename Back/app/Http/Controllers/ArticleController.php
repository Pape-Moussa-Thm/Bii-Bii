<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;
use App\Models\Article;
use App\Models\ArticleFournisseur;
use App\Models\Categorie;
use App\Models\Fournisseur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ArticleResource;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{

    public function all(){
        $articles = Article::all();
        return response()->json([
            'data'=>
                [
                    'articles' => ArticleResource::collection($articles)
                ]
        ]);
    }

    public function index()
    {
        $categories = Categorie::all();
        $catConf = Categorie::where('typeArticle', 'confection')->get();
        $catVente = Categorie::where('typeArticle', 'vente')->get();
        $fournisseurs = Fournisseur::all();

        return response()->json([
                'data'=>
                    [
                        'categories' => $categories,
                        'catConf' => $catConf,
                        'catVente' => $catVente,
                        'fournisseurs' => $fournisseurs
                    ]
        ]);
    }

    public function store(StoreArticleRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $article = new Article();
            $article->libelle = $request->validated()['libelle'];
            $article->prix = $request->validated()['prix']; 
            $article->stock = $request->validated()['stock'];

            $imagePath = str_replace('data:image/jpeg;base64,', '', $request->photo_name);
            $fileName = $request->photo;

            if (Storage::disk('public')->put($fileName, base64_decode($imagePath))) {
                $article->photo = $fileName;
            } else {
                throw new \Exception('Erreur lors de l\'insertion de l\'image');
            }

            $cat = Categorie::where('libelle', $request->validated()['categorie_libelle'])->first();
            if (!$cat) {
                throw new \Exception('Catégorie introuvable');
            }
            $article->categorie_id = $cat->id;

            $libellePrefix = substr($article->libelle, 0, 3);
            $categorieText = $article->categorie->libelle;
            $orderNumber = $cat->numArticles + 1;
            $reference = "REF-$libellePrefix-$categorieText-$orderNumber";
            $article->reference = $reference;

            if (!$article->save()) {
                throw new \Exception('Erreur lors de l\'enregistrement de l\'article');
            }
            $cat->update(['numArticles' => $orderNumber]);
            
            // $fournisseurs = $request->validated()['fournisseurs'];
            // $fourId = Fournisseur::whereIn('nomComplet', $fournisseurs)->pluck('id');
            // $article->fournisseurs()->attach($fourId);

            return response()->json(
                [
                    'message' => 'Article créé avec succès', 
                    'data' => $article, 
                    'status' => 201
                ]);
        });
    }

    public function update(UpdateArticleRequest $request, $articleId)
    {
        return DB::transaction(function () use ($request, $articleId) {
            $article = Article::findOrFail($articleId);
            $validatedData = $request->validated();

            $article->update([
                'libelle' => $validatedData['libelle'],
                'prix' => $validatedData['prix'],
                'stock' => $validatedData['stock'],
                'photo' => $validatedData['photo'],
            ]);

            $ref = 0;

            $catId = Categorie::find($article->categorie_id);

            if ($catId->libelle == $validatedData['categorie_libelle']) {
                $ref = explode("-", $article->reference)[3];
                $categorieText = $catId->libelle;
            } else {
                $cat = Categorie::where('libelle', $validatedData['categorie_libelle'])->first();
                if (!$cat) {
                    return response()->json(['message' => 'Catégorie introuvable'], 400);
                }
                $categorieText = $cat->libelle;
                $cat->update(['numArticles' => $cat->numArticles + 1]);
                $catId->update(['numArticles' => $catId->numArticles - 1]);
                $ref = $cat->numArticles;
                $article->categorie()->associate($cat);
            }

            $libellePrefix = substr($article->libelle, 0, 3);
            $reference = "REF-$libellePrefix-$categorieText-$ref";
            $article->reference = $reference;

            $article->save();

            $fournisseurs = $validatedData['fournisseurs'];
            $fournisseurIds = Fournisseur::whereIn('nomComplet', $fournisseurs)->pluck('id');

            if ($fournisseurIds->count() !== count($fournisseurs)) {
                return response()->json(['message' => 'Fournisseur non existant'], 400);
            }

            $article->fournisseurs()->sync($fournisseurIds);

            return response()->json(
                [
                    'message' => 'Article mis à jour avec succès', 
                    'data' => $article, 
                    'status' => 201
                ]);
        });
    }

    public function destroy($articleId)
    {
        return DB::transaction(function () use ($articleId) {
            $article = Article::findOrFail($articleId);
            // $article->fournisseurs()->detach();
            $article->delete();
            $cat = Categorie::find($article->categorie_id);
            $cat->decrement('numArticles');
            return response()->json(
                [
                    'message' => 'Article supprimé avec succès', 
                    'data'=>$article, 
                    'status' => 200
                ]);
        });
    }

    public function search($art)
    {
        $articles = Article::where('libelle', $art)->first()->prix;
        return $articles;
        // $articles = Article::where('libelle', 'LIKE', "$art%")->get();
        // $libAndStock = $articles->map(function ($article) {
        //     return [
        //         'libelle' => $article->libelle,
        //         'stock' => $article->stock,
        //         'prix' => $article->prix
        //     ];
        // });
        // return $libAndStock;

    }

    public function image(Request $request)
    {
        $file = $request->file("photo")->store("public/images");
       return $file;
    }


}

