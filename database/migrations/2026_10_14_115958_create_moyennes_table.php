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
        Schema::create('moyennes', function (Blueprint $table) {
            $table->id();

            $table->decimal('valeur', 5, 2)->nullable();
            $table->integer('rang')->nullable();
            $table->string('appreciation')->nullable();
            $table->foreignId('inscription_id')->constrained()->cascadeOnDelete();
            $table->foreignId('enseignement_id')->constrained()->cascadeOnDelete();
            $table->foreignId('periode_academique_id')->constrained()->cascadeOnDelete();

            $table->unique(["inscription_id", "enseignement_id", "periode_academique_id"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('moyennes');
    }
};
