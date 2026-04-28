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
        Schema::create('personnels', function (Blueprint $table) {
            $table->id();

            $table->string('nom');
            $table->string('prenom');
            $table->date('date_naissance');
            $table->string('lieu_naissance');
            $table->string('genre');
            $table->string('nationalite')->nullable();
            $table->string('matricule')->nullable();
            $table->string('fonction')->nullable();
            $table->string('situation_matrimoniale')->nullable();
            $table->integer('nombre_enfant')->nullable();
            $table->integer('nombre_enfant_charge')->nullable();
            $table->string('telephone')->nullable();
            $table->string('email')->nullable();
            $table->string('bp')->nullable();
            $table->string('rib')->nullable();
            $table->string('nom_entreprise')->nullable();
            $table->boolean('proprietaire')->default(0);
            $table->string('numero_registre_commerce')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personnels');
    }
};
