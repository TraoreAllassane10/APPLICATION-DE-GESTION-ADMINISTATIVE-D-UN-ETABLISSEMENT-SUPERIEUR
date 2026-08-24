<?php

namespace Database\Factories;

use App\Models\AnneeUniversitaire;
use App\Models\Professeur;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Professeur>
 */
class ProfesseurFactory extends Factory
{
    protected $model = Professeur::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $noms = [
            'KOUASSI', 'KONÉ', 'TRAORÉ', 'OUATTARA', 'KOFFI', 'KOUAMÉ',
            'YAO', 'BAMBA', 'TOURÉ', 'COULIBALY', 'KONAN', 'DIALLO',
            'SANGARÉ', 'FOFANA', 'CISSE', 'N\'GUESSAN', 'BROU', 'BAKAYOKO',
            'DIOMANDÉ', 'GNAHORÉ', 'LAGO', 'KIPRÉ', 'AMANI', 'ASSI',
            'KASSI', 'ZADI', 'DADIÉ', 'SERI', 'BAILLY', 'BOGA',
            'DJÉDJÉ', 'GNAGNE', 'DAH', 'HIEN', 'KAMBOU', 'YÉO',
            'SILUÉ', 'SORO', 'MEÏTÉ', 'SYLLA', 'DIABATÉ', 'BOHOUSSOU',
            'GNAMIEN', 'N\'DRI', 'DIBY', 'KRA', 'ALLASSANE', 'GOUAMÉNÉ'
        ];

        $prenomsMasculins = [
            'Mamadou', 'Ibrahim', 'Moussa', 'Adama', 'Kouamé', 'Jean-Marc',
            'Christian', 'Franck', 'Patrice', 'Stéphane', 'Thierry', 'Yves',
            'Alain', 'David', 'Rodrigue', 'Fabrice', 'Ismaël', 'Mohamed',
            'Seydou', 'Didier', 'Serge', 'Bakary', 'Ange', 'Arnaud',
            'Brice', 'Charles', 'Désiré', 'Éric', 'Guy-Roland', 'Hermann',
            'Joël', 'Kader', 'Lassina', 'Marc-Aurèle', 'Narcisse', 'Olivier',
            'Philippe', 'Romaric', 'Souleymane', 'Tidiane', 'Wilfried', 'Yannick'
        ];

        $prenomsFeminins = [
            'Aïcha', 'Fatoumata', 'Mariam', 'Aminata', 'Affoué', 'Aya',
            'Akissi', 'Marie-Noëlle', 'Edwige', 'Clarisse', 'Patricia',
            'Estelle', 'Sandrine', 'Christelle', 'Grace', 'Félicité',
            'Danielle', 'Sylvie', 'Salimata', 'Tenin', 'Assetou', 'Bintou',
            'Christiane', 'Delphine', 'Evelyne', 'Florence', 'Geneviève',
            'Henriette', 'Inès', 'Josiane', 'Kady', 'Laetitia', 'Maimouna',
            'Nathalie', 'Prisca', 'Rosine', 'Syntyche', 'Viviane', 'Yasmine'
        ];

        $specialites = [
            'Génie Logiciel & Systèmes d\'Information',
            'Réseaux, Télécoms & Sécurité Informatique',
            'Intelligence Artificielle & Data Science',
            'Mathématiques Appliquées & Statistiques',
            'Sciences Économiques & Gestion d\'Entreprise',
            'Comptabilité, Contrôle & Audit (CCA)',
            'Finance & Ingénierie Financière',
            'Droit Privé & Droit des Affaires',
            'Droit Public & Relations Internationales',
            'Marketing Digital & Stratégie Commerciale',
            'Gestion des Ressources Humaines (GRH)',
            'Physique Appliquée & Électronique',
            'Génie Civil & BTP',
            'Logistique & Supply Chain Management',
            'Communication & Relations Publiques',
            'Management de Projets & Qualité',
            'Anglais Professionnel & des Affaires',
            'Électromécanique & Automatisme',
            'Chimie & Procédés Industriels',
            'Biochimie & Microbiologie Appliquée'
        ];

        
        $pays = array_merge(
            array_fill(0, 16, "Côte d'Ivoire"),
            ['Sénégal', 'Burkina Faso', 'Mali', 'Bénin', 'Togo', 'Guinée', 'Cameroun', 'France']
        );

        $sexe = $this->faker->randomElement(['M', 'F']);
        $prenom = $sexe === 'M'
            ? $this->faker->randomElement($prenomsMasculins)
            : $this->faker->randomElement($prenomsFeminins);
        $nom = $this->faker->randomElement($noms);

        // Numéro de téléphone au plan ivoirien (10 chiffres : 01 / 05 / 07)
        $prefixeTel = $this->faker->randomElement(['01', '05', '07']);
        $telephone = $prefixeTel . $this->faker->numerify('########');

        return [
            'matricule' => 'ENS-' . $this->faker->unique()->numerify('#####'),
            'nom_prenom' => $nom . ' ' . $prenom,
            'sexe' => $sexe,
            'date_naissance' => $this->faker->dateTimeBetween('-62 years', '-28 years')->format('Y-m-d'),
            'pays' => $this->faker->randomElement($pays),
            'specialite' => $this->faker->randomElement($specialites),
            'telephone' => $telephone,
        ];
    }

    /**
     * État pour un professeur masculin.
     */
    public function masculin(): static
    {
        return $this->state(function (array $attributes) {
            $prenomsMasculins = ['Mamadou', 'Ibrahim', 'Moussa', 'Adama', 'Kouamé', 'Jean-Marc', 'Christian', 'Franck', 'Patrice', 'Stéphane'];
            $nom = explode(' ', $attributes['nom_prenom'])[0] ?? 'KOUASSI';
            return [
                'sexe' => 'M',
                'nom_prenom' => $nom . ' ' . $this->faker->randomElement($prenomsMasculins),
            ];
        });
    }

    /**
     * État pour un professeur féminin.
     */
    public function feminin(): static
    {
        return $this->state(function (array $attributes) {
            $prenomsFeminins = ['Aïcha', 'Fatoumata', 'Mariam', 'Aminata', 'Affoué', 'Aya', 'Akissi', 'Marie-Noëlle', 'Edwige', 'Clarisse'];
            $nom = explode(' ', $attributes['nom_prenom'])[0] ?? 'KOUASSI';
            return [
                'sexe' => 'F',
                'nom_prenom' => $nom . ' ' . $this->faker->randomElement($prenomsFeminins),
            ];
        });
    }

    /**
     * Associer le professeur à une année universitaire avec des informations de fonction réalistes.
     */
    public function avecAnneeUniversitaire(?AnneeUniversitaire $annee = null, array $pivotAttributes = []): static
    {
        return $this->afterCreating(function (Professeur $professeur) use ($annee, $pivotAttributes) {
            $anneeId = $annee?->id ?? AnneeUniversitaire::where('estActive', 1)->value('id') ?? AnneeUniversitaire::first()?->id;

            if (!$anneeId) {
                return;
            }

            $diplomes = [
                'Doctorat / Ph.D',
                'Doctorat d\'État',
                'Master 2 Recherche',
                'Master Professionnel',
                'Ingénieur de Conception',
                'Agrégation de l\'Enseignement Supérieur',
                'DESS'
            ];

            // Diplôme, Grade CAMES (1: Prof Titulaire, 2: Maître de Conférences, 3: Maître-Assistant, 4: Assistant), Statut (1: Permanent, 2: Contractuel, 3: Vacataire)
            $defaultPivot = [
                'diplome' => $this->faker->randomElement($diplomes),
                'grade' => $this->faker->numberBetween(1, 4),
                'statut' => $this->faker->randomElement([1, 2, 3]),
                'annee_prise_fonction' => $this->faker->numberBetween(2005, 2024),
                'formation_continue' => $this->faker->randomElement([0, 1]),
                'nombre_heure_cours_prevue' => $this->faker->randomElement([120, 150, 180, 200, 250, 300]),
                'nombre_heure_cours_realise' => $this->faker->randomElement([80, 100, 120, 150, 180, 220]),
            ];

            $professeur->anneeAcademiques()->syncWithoutDetaching([
                $anneeId => array_merge($defaultPivot, $pivotAttributes)
            ]);
        });
    }
}
