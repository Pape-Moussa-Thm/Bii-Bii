<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleVenteController;
use App\Http\Controllers\FournisseurController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', CategorieController::class);
Route::get('categorie', [CategorieController::class, 'all']);
Route::post('categories/delete', [CategorieController::class, "supCat"])->name('deleteCategorie');
Route::post('categories/restore', [CategorieController::class, "restore"])->name('restorerCategorie');


Route::get('articles', [ArticleController::class, 'all'])->name('listerArticle');
Route::get('articles/catfour', [ArticleController::class, 'index'])->name('CatAndFour');
Route::post('articles', [ArticleController::class, 'store'])->name('ajoutArticle');
Route::get('articles/{articleId}', [ArticleController::class, 'show'])->name('searchArticle');
Route::put('articles/{articleId}', [ArticleController::class, 'update'])->name('updateArticle');
Route::delete('articles/{articleId}', [ArticleController::class, 'destroy'])->name('deleteArticle');
Route::post('image', [ArticleController::class, 'image']);

Route::apiResource('fournisseur', FournisseurController::class);

// New routes

Route::get('articles/search/{search}', [ArticleController::class, 'search']);

Route::apiResource('artVente', ArticleVenteController::class);

