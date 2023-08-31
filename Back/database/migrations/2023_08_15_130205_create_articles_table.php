<?php

use App\Models\Categorie;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(Categorie::class)->constrained();
            $table->string('libelle')->unique();
            $table->float('prix');
            $table->float('stock');
            $table->string('photo')->nullable();
            $table->string('reference')->unique();
        });
    }

    /**
     * Reverse the migrations.
     */

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }

    
};

