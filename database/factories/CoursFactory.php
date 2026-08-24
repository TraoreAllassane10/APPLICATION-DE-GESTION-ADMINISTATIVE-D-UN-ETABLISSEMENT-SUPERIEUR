<?php

namespace Database\Factories;

use App\Models\Cours;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cours>
 */
class CoursFactory extends Factory
{
    protected $model = Cours::class;

    /**
     * Dictionnaire complet des matières par filière (conforme au cursus ivoirien BTS / Licence).
     */
    public static array $coursParFiliere = [
        'Informatique Développeur d\'Application' => [
            'Algorithmique & Structures de Données',
            'Programmation Web (HTML5, CSS3, JavaScript, PHP)',
            'Conception et Modélisation UML & Merise',
            'Bases de Données Relationnelles & SQL',
            'Programmation Orientée Objet (Java / C#)',
            'Développement d\'Applications Mobiles (Flutter / Android)',
            'Frameworks Web Modernes (Laravel, React)',
            'Administration Systèmes & Réseaux Linux',
            'Sécurité Informatique & Cryptographie',
            'Génie Logiciel & Méthodes Agiles (Scrum)',
            'Architecture des Ordinateurs & Maintenance',
            'Bureautique Avancée & Outils Collaboratifs',
        ],

        'Finance Comptabilité et Gestion des Entreprises' => [
            'Comptabilité Générale (SYSCOHADA Révisé)',
            'Comptabilité Analytique d\'Exploitation (CAE)',
            'Comptabilité des Sociétés & Opérations Spécifiques',
            'Fiscalité des Entreprises & Droit Fiscal Ivoirien',
            'Analyse Financière & Diagnostic Financier',
            'Gestion de Trésorerie & Relations Bancaires',
            'Gestion Budgétaire & Contrôle de Gestion',
            'Mathématiques Financières & Actuariat',
            'Économie Générale & Économie d\'Entreprise',
            'Audit Comptable et Financier',
            'Droit des Affaires & Droit Commercial (OHADA)',
            'Logiciels de Gestion Comptable (Sage Saari)',
        ],

        'Ressources Humaines et Communication' => [
            'Gestion Prévisionnelle des Emplois et des Compétences (GPEC)',
            'Droit du Travail & Législation Sociale Ivoirienne',
            'Administration du Personnel, Paie et Déclarations Sociales',
            'Processus de Recrutement, Intégration et Gestion des Carrières',
            'Communication Interne & Stratégie Institutionnelle',
            'Psychologie du Travail & Dynamique de Groupe',
            'Techniques d\'Expression Écrite et Orale en Entreprise',
            'Gestion des Conflits & Négociation Sociale',
            'Élaboration et Suivi du Plan de Formation',
            'Responsabilité Sociétale des Entreprises (RSE) & Éthique',
            'Audit Social & Conception du Bilan Social',
            'Communication Digitale & Relations Publiques',
        ],

        'Électrotechnique' => [
            'Circuits Électriques & Électronique de Puissance',
            'Machines Électriques (Transformateurs, Moteurs, Alternateurs)',
            'Schémas & Installations Électriques Industrielles',
            'Automates Programmables Industriels (API) & Supervision',
            'Production, Transport & Distribution de l\'Énergie Électrique',
            'Énergies Renouvelables & Systèmes Solaires Photovoltaïques',
            'Régulation, Asservissement & Automatisme',
            'Maintenance Électrique Industrielle & Sécurité Habilitation',
            'Mesures Électriques & Instrumentation Industrielle',
            'Dessin Technique & CAO/DAO Électrique (AutoCAD Electrical)',
            'Réseaux Haute Tension & Postes de Transformation',
            'Électronique Industrielle & Capteurs',
        ],

        'Tourisme et Hôtellerie' => [
            'Gestion des Opérations d\'Hébergement & Front Office',
            'Techniques d\'Accueil, Réception & Conciergerie',
            'Restauration, Art de la Table & Sommellerie',
            'Gestion des Agences de Voyages & Billetterie (Amadeus)',
            'Écotourisme & Valorisation du Patrimoine Touristique Ivoirien',
            'Marketing Touristique, Hôtelier et Digital',
            'Géographie Touristique de la Côte d\'Ivoire & de l\'Afrique',
            'Organisation d\'Événements, Congrès & Banquets',
            'Hygiène, Salubrité & Normes Alimentaires (HACCP)',
            'Anglais Professionnel Appliqué au Tourisme & Hôtellerie',
            'Contrôle de Gestion Hôtelier & Yield Management',
            'Conception, Tarification & Vente de Forfaits Touristiques',
        ],

        'Agriculture Tropicale et Production Option Végétale' => [
            'Agronomie Générale & Science des Sols Tropicaux (Pédologie)',
            'Cultures Pérennes & d\'Exportation (Cacao, Café, Hévéa, Palmier)',
            'Cultures Vivrières & Maraîchères (Manioc, Igname, Riz, Maïs, Tomate)',
            'Phytopathologie & Protection Intégrée des Cultures',
            'Arboriculture Fruitière Tropicale (Banane, Mangue, Ananas, Papaye)',
            'Techniques d\'Irrigation & Drainage en Climat Tropical',
            'Machinisme Agricole & Conduite des Engins de Récolte',
            'Agroécologie & Restauration Durable de la Fertilité des Sols',
            'Foresterie, Agroforesterie & Préservation de l\'Environnement',
            'Biotechnologies Végétales & Multiplication des Semences Certifiées',
            'Conservation, Conditionnement & Transformation des Produits Végétaux',
            'Gestion Technico-Économique d\'une Exploitation Végétale',
        ],

        'Agriculture Tropicale et Production Option Animale' => [
            'Zootechnie Générale & Anatomie des Espèces d\'Élevage',
            'Conduite d\'Élevage Avicole (Poulets de Chair & Pondeuses)',
            'Élevage des Petits Ruminants (Ovins, Caprins) & Porciculture',
            'Élevage Bovin & Production Laitière en Zone Tropicale',
            'Nutrition, Alimentation Animale & Formulation des Rations',
            'Santé Animale, Pathologie & Prophylaxie Vétérinaire',
            'Pisciculture, Aquaculture & Aménagement des Étangs',
            'Mini-Élevages Non Conventionnels (Aulacodiculture & Héliciculture)',
            'Conception & Hygiène des Bâtiments d\'Élevage',
            'Reproduction Animale & Techniques d\'Insémination Artificielle',
            'Transformation & Conservation des Produits Animaux (Viande, Lait)',
            'Gestion Technico-Économique des Entreprises Pastorales',
        ],

        'Gestion Commerciale' => [
            'Stratégie Marketing & Réalisation d\'Études de Marché',
            'Techniques de Vente, Prospection & Négociation Commerciale',
            'Merchandising, Distribution & Gestion du Point de Vente',
            'Gestion de la Relation Client (CRM) & Politiques de Fidélisation',
            'Management & Animation de la Force de Vente',
            'Commerce International & Formalités Douanières',
            'Droit Commercial, Droit de la Concurrence & Protection du Consommateur',
            'E-commerce, Vente en Ligne & Marketing Digital',
            'Gestion des Approvisionnements & Gestion des Stocks',
            'Publicité, Promotion des Ventes & Stratégie Média',
            'Calcul des Prix de Revient, Marges & Tarification Commerciale',
            'Psychologie du Consommateur & Analyse des Comportements d\'Achat',
        ],
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tousLesCours = [];
        foreach (self::$coursParFiliere as $coursListe) {
            $tousLesCours = array_merge($tousLesCours, $coursListe);
        }

        return [
            'nom' => $this->faker->randomElement($tousLesCours),
        ];
    }

    /**
     * Matière pour Informatique Développeur d'Application (IDA).
     */
    public function informatique(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Informatique Développeur d\'Application']),
        ]);
    }

    /**
     * Matière pour Finance Comptabilité et Gestion des Entreprises (FCGE).
     */
    public function financeComptabilite(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Finance Comptabilité et Gestion des Entreprises']),
        ]);
    }

    /**
     * Matière pour Ressources Humaines et Communication (RHC).
     */
    public function ressourcesHumaines(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Ressources Humaines et Communication']),
        ]);
    }

    /**
     * Matière pour Électrotechnique (ELT).
     */
    public function electrotechnique(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Électrotechnique']),
        ]);
    }

    /**
     * Matière pour Tourisme et Hôtellerie (TH).
     */
    public function tourismeHotellerie(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Tourisme et Hôtellerie']),
        ]);
    }

    /**
     * Matière pour Agriculture Tropicale - Option Végétale (ATPV).
     */
    public function productionVegetale(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Agriculture Tropicale et Production Option Végétale']),
        ]);
    }

    /**
     * Matière pour Agriculture Tropicale - Option Animale (ATPA).
     */
    public function productionAnimale(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Agriculture Tropicale et Production Option Animale']),
        ]);
    }

    /**
     * Matière pour Gestion Commerciale (GEC).
     */
    public function gestionCommerciale(): static
    {
        return $this->state(fn() => [
            'nom' => $this->faker->randomElement(self::$coursParFiliere['Gestion Commerciale']),
        ]);
    }
}
