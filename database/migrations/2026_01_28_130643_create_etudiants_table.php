<?php

use App\Modules\Etudiant\Enums\StatutEtudiant;
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
        Schema::create('etudiants', function (Blueprint $table) {
            // Identifiant permanent de l'etudiant
            $table->string("ip")->primary();

            $table->string("civilite");
            $table->string('genre');
            $table->string("nom");
            $table->string("prenom");
            $table->date("date_naissance");
            $table->string("lieu_naissance");
            $table->string('nationnalite');
            $table->enum('statut', StatutEtudiant::cases());

            $table->string('email')->nullable();
            $table->string('pays_residence')->nullable();
            $table->string('etablissement_origine')->nullable();
            $table->string('annee_obtention_bac')->nullable();
            $table->string('serie_bac')->nullable();
            $table->string('numero_table_bac')->nullable();
            $table->string("contacts")->nullable();
            $table->string('nature_piece')->nullable();
            $table->string('numero_piece')->nullable();
            $table->string('adresse_geographique')->nullable();
            $table->string('matricule_secondaire')->nullable();

            $table->string('type_responsable')->nullable();
            $table->string("nom_responsable")->nullable();
            $table->string("numero_responsable")->nullable();
            $table->string("profession_responsable")->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('etudiants');
    }
};
