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
        Schema::create('bulletin_lignes', function (Blueprint $table) {
            $table->id();
            $table->decimal('moyenne_generale_matiere', 5, 2);
            $table->integer('coefficient')->nullable();
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
