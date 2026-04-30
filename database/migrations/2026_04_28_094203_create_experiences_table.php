<?php

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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();

            $table->string('annee')->nullable();
            $table->string('nom_ecole')->nullable();
            $table->string('fonction')->nullable();
            $table->string('nombre_annee_enseignement')->nullable();
            $table->string('matiere_enseignee')->nullable();

            $table->foreignId('personnel_id')->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experiences');
    }
};
