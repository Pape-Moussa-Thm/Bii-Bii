<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Article;
use App\Models\ArticleVente;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('breukhs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->float('qte');
            $table->foreignIdFor(Article::class)->constrained();
            $table->foreignIdFor(ArticleVente::class)->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('breukhs');
    }
};
