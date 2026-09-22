<?php

use App\Modules\Inscription\Enums\TypeInscription;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\FraisConfiguration;
use App\Models\Inscription;
use App\Models\Niveau;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Prépare les fixtures communes à tous les tests d'inscription.
 * Retourne un tableau prêt à merger avec les données spécifiques au test.
 */
function inscriptionFixtures(): array
{
    $user = User::factory()->create();

    // L'observer EtudiantObserver requiert un utilisateur authentifié.
    // On s'authentifie avant de créer l'étudiant via factory.
    test()->actingAs($user);

    $etudiant = Etudiant::factory()->create();
    $annee    = AnneeUniversitaire::factory()->active()->create();
    $niveau   = Niveau::factory()->withScolarite()->create();
    FraisConfiguration::factory()->create();

    return [
        'etudiant'  => $etudiant,
        'annee'     => $annee,
        'niveau'    => $niveau,
        'base_data' => [
            'type_inscription' => TypeInscription::NOUVELLE->value,
            'etudiant_ip'      => $etudiant->ip,
            'annee_id'         => $annee->id,
            'niveaux'          => [$niveau->id],
        ],
    ];
}

// ─── Cas nominaux ─────────────────────────────────────────────────────────────

test('Inscription sans réduction', function () {
    $fixtures = inscriptionFixtures();

    $response = $this->post('/inscriptions/create', $fixtures['base_data']);

    $this->assertDatabaseCount('inscriptions', 1);

    $inscription = Inscription::first();
    expect($inscription->taux_reduction)->toBe(0)
        ->and($inscription->montant_reduction)->toBeNull();
});

test('Inscription avec réduction par taux', function () {
    $fixtures = inscriptionFixtures();
    $niveau   = $fixtures['niveau'];

    // La scolarité du niveau est définie par la factory withScolarite
    $scolarite = $niveau->scolarites()->first()->montant;

    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'taux_reduction' => 20,
    ]));

    $inscription = Inscription::first();

    expect($inscription)->not->toBeNull()
        ->and($inscription->taux_reduction)->toBe(20)
        ->and($inscription->montant_reduction)->toBeNull()
        // Vérifie que le montant scolarité correspond bien à une réduction de 20 %
        ->and($inscription->montant_scolarite)->toBe((int) round($scolarite * 0.80));
});

test('Inscription avec réduction par montant fixe', function () {
    $fixtures = inscriptionFixtures();
    $niveau   = $fixtures['niveau'];

    $scolarite = $niveau->scolarites()->first()->montant;
    $reduction = min(10000, $scolarite); // On s'assure de ne pas dépasser la scolarité

    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'montant_reduction' => $reduction,
    ]));

    $inscription = Inscription::first();

    expect($inscription)->not->toBeNull()
        ->and($inscription->montant_reduction)->toBe($reduction)
        ->and($inscription->taux_reduction)->toBe(0)
        ->and($inscription->montant_scolarite)->toBe($scolarite - $reduction);
});

// ─── Règle mutex ──────────────────────────────────────────────────────────────

test('Saisie simultanée de taux et de montant est refusée', function () {
    $fixtures = inscriptionFixtures();

    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'taux_reduction'    => 10,
        'montant_reduction' => 5000,
    ]));

    // La validation doit échouer (422 Unprocessable Entity)
    $response->assertStatus(422);

    $this->assertDatabaseCount('inscriptions', 0);
});

// ─── Valeurs invalides ────────────────────────────────────────────────────────

test('Taux de réduction supérieur à 100 est refusé', function () {
    $fixtures = inscriptionFixtures();

    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'taux_reduction' => 150,
    ]));

    $response->assertStatus(422);
    $this->assertDatabaseCount('inscriptions', 0);
});

test('Taux de réduction négatif est refusé', function () {
    $fixtures = inscriptionFixtures();

    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'taux_reduction' => -5,
    ]));

    $response->assertStatus(422);
    $this->assertDatabaseCount('inscriptions', 0);
});

test('Montant de réduction négatif est refusé', function () {
    $fixtures = inscriptionFixtures();

    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'montant_reduction' => -1000,
    ]));

    $response->assertStatus(422);
    $this->assertDatabaseCount('inscriptions', 0);
});

// ─── Dépassement du montant de référence ──────────────────────────────────────

test('Montant de réduction supérieur à la scolarité est refusé par le service', function () {
    $fixtures  = inscriptionFixtures();
    $niveau    = $fixtures['niveau'];
    $scolarite = $niveau->scolarites()->first()->montant;

    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'montant_reduction' => $scolarite + 1,
    ]));

    $data = $response->json();

    // Le service renvoie un 200 avec success=false (comportement existant du projet)
    expect($data['success'])->toBeFalse();
    $this->assertDatabaseCount('inscriptions', 0);
});

// ─── Compatibilité inscriptions existantes ────────────────────────────────────

test('Une inscription existante sans montant_reduction reste valide', function () {
    $fixtures = inscriptionFixtures();

    // Simulation d'une inscription créée avant la feature (montant_reduction = null)
    $response = $this->post('/inscriptions/create', array_merge($fixtures['base_data'], [
        'taux_reduction' => 0,
    ]));

    $inscription = Inscription::first();

    expect($inscription)->not->toBeNull()
        ->and($inscription->montant_reduction)->toBeNull()
        ->and($inscription->taux_reduction)->toBe(0);
});
