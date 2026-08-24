<?php

namespace Database\Seeders;

use App\Models\Cours;
use Database\Factories\CoursFactory;
use Illuminate\Database\Seeder;

class CoursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Enregistrement de l'ensemble des matières par filière
        foreach (CoursFactory::$coursParFiliere as $filiere => $matieres) {
            foreach ($matieres as $matiere) {
                Cours::firstOrCreate([
                    'nom' => $matiere,
                ]);
            }
        }
    }
}
