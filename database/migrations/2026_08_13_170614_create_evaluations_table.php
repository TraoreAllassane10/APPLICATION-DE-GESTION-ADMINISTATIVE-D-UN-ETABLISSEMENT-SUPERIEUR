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
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('enseignement_id')->constrained("enseignements")->cascadeOnDelete();
            $table->foreignId('periode_academique_id')->constrained("periode_academiques")->cascadeOnDelete();
            $table->string('type');
            $table->string('titre');
            $table->date('date');
            $table->integer('note_maximale');
            $table->integer('coefficient');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evaluations');
    }
};
