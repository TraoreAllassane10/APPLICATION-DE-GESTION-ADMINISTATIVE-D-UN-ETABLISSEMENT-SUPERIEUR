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
        Schema::create('bullettin_lignes', function (Blueprint $table) {
            $table->id();
            $table->integer('moyenne_generale_matiere');
            $table->integer('coefficient');
            $table->string('appreciation_professeur')->nullable();

            $table->foreignId('enseignement_id')->constrained('enseignements')->cascadeOnDelete();
            $table->foreignId('bulletin_id')->constrained('bulletins')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bullettin_lignes');
    }
};
