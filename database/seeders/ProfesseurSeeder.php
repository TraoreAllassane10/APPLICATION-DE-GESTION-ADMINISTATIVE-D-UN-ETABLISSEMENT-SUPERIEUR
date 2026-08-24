<?php

namespace Database\Seeders;

use App\Models\AnneeUniversitaire;
use App\Models\Professeur;
use Illuminate\Database\Seeder;

class ProfesseurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Recherche de l'année universitaire active (ou existante)
        $anneeActive = AnneeUniversitaire::where('estActive', 1)->first() ?? AnneeUniversitaire::first();

        if ($anneeActive) {
            // Créer 40 professeurs rattachés à l'année universitaire en cours
            Professeur::factory()
                ->count(40)
                ->avecAnneeUniversitaire($anneeActive)
                ->create();

            // Créer 10 professeurs non encore inscrits dans l'année en cours (pour tester l'option "Enseignant existant")
            Professeur::factory()
                ->count(10)
                ->create();
        } else {
            // Créer directement les 50 professeurs
            Professeur::factory()
                ->count(50)
                ->create();
        }
    }
}
