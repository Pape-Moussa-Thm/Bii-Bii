<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFournisseurRequest;
use App\Http\Requests\UpdateFournisseurRequest;
use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Fournisseur::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "nomComplet" => "required"
        ]);

        $data = Fournisseur::create([
            "nomComplet" => $request->nomComplet
        ]);

        return response()->json(['message'=>'fournisseur ajouté avec succès', 'data'=>$data]);

    }

    /**
     * Display the specified resource.
     */
    public function show($four)
    {
        $four = Fournisseur::where('nomComplet','LIKE', "$four%")->get();
        if ($four->isEmpty()) {
            return response()->json(['message' => 'false']);
        }else{

            return response()->json(['message' => 'true', 'data' => $four]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fournisseur $fournisseur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFournisseurRequest $request, Fournisseur $fournisseur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fournisseur $fournisseur)
    {
        //
    }
}
