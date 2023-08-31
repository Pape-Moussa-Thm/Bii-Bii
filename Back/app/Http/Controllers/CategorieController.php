<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CategorieController extends Controller
{

    public function index()
    {
        return Categorie::paginate(3);
    }

    public function all(){
        return Categorie::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required'
        ]);
        $test=Categorie::where('libelle', $request->libelle)->first();
        if(!$test){
            $cat = Categorie::create([
                'libelle' => $request->libelle
            ]);
            return response()->json(['message' => 'Catégorie créé avec succès', 'data' => $cat]);
        }else{
            return response()->json(['message'=>"Ce catégorie existe déjà"]);
        }
    }


    public function supCat(Request $request)
    {
        $request->validate([
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id'
        ]);

        $categoryIds = $request->input('categories');

        Categorie::destroy($categoryIds);

        return response()->json(['message' => 'Catégories supprimées avec succès']);
    }

    public function show($libelle)
    {
        if (strlen($libelle) < 3) {
            return response()->json(['message' => 'Le libellé doit avoir au moins 3 caractères'], 400);
        }

        $categorie = Categorie::where('libelle', $libelle)->first();

        if (!$categorie) {
            return response()->json(['message' => 'false']);
        }

        return response()->json(['message'=>'true']);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categories.*.id' => 'required|exists:categories,id',
            'categories.*.libelle' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        foreach ($request->input('categories') as $categoryData) {
            $categorie = Categorie::findOrFail($categoryData['id']);
            $categorie->update(['libelle' => $categoryData['libelle']]);
        }

        return response()->json(['message' => 'Catégories mises à jour avec succès']);
    }

    public function restore(Request $request)
    {
        $request->validate([
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id'
        ]);

        $categoryIds = $request->categories;

        DB::transaction(function () use ($categoryIds) {
            Categorie::whereIn('id', $categoryIds)->restore();
        });

        return response()->json(['message' => 'Catégories restaurées avec succès']);
    
    }

}

