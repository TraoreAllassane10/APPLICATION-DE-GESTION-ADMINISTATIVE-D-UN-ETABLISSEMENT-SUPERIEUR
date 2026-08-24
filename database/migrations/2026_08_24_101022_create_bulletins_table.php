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
        Schema::create('bulletins', function (Blueprint $table) {
            $table->id();
            $table->integer("moyenne_generale")->nullable();
            $table->string('mention')->nullable();
            $table->string('decision_jury')->nullable();
            $table->string('statut')->default("BROUILLON");
            $table->integer("rang")->nullable();
            $table->integer("effectif_classe")->nullable();

            $table->foreignId('inscription_id')->constrained('inscriptions')->cascadeOnDelete();
            $table->foreignId('periode_academique_id')->constrained('periode_academiques')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulletins');
    }
};
