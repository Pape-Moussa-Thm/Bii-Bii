<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Categorie;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('article_ventes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('libelle')->unique();
            $table->float('qteStock');
            $table->boolean('promo');
            $table->float('valeur')->nullable();
            $table->string('reference')->unique();
            $table->float('cout');
            $table->string('marge')->nullable();
            $table->float('prix_vente');
            $table->string('photo')->nullable();
            $table->foreignIdFor(Categorie::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_ventes');
    }
};
