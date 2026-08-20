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
        Schema::create('notes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('inscription_id')->constrained('inscriptions')->onDelete("cascade");
            $table->foreignId("evaluation_id")->constrained('evaluations')->onDelete("cascade");
            $table->decimal('valeur', 5, 2)->nullable();
            $table->boolean('est_absent')->default(0);
            $table->string('appreciation')->nullable();

            $table->unique(['inscription_id', 'evaluation_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
