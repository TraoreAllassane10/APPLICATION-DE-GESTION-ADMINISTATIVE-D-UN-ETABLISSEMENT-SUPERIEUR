<?php

use App\Enums\RoleUser;
use App\Models\AnneeUniversitaire;
use App\Models\Bulletin;
use App\Models\Cours;
use App\Models\Enseignement;
use App\Models\Etudiant;
use App\Models\Filiere;
use App\Models\Inscription;
use App\Models\Moyenne;
use App\Models\Niveau;
use App\Models\PeriodeAcademique;
use App\Models\Professeur;
use App\Models\User;
use App\Modules\Bulletin\Services\BulletinService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

beforeEach(function () {
    Role::firstOrCreate(['name' => RoleUser::ADMINISTRATEUR->value]);
    Role::firstOrCreate(['name' => RoleUser::INSPECTEUR_PEDAGOGIQUE->value]);
    Role::firstOrCreate(['name' => RoleUser::PROFESSEUR->value]);
    Role::firstOrCreate(['name' => RoleUser::SCOLARITE->value]);

    $user = User::factory()->create();
    $user->assignRole(RoleUser::ADMINISTRATEUR->value);
    $this->actingAs($user);
});

test('Le calcul de la moyenne générale pondère correctement par les coefficients de enseignement_classe', function () {
    $service = app(BulletinService::class);

    $annee = AnneeUniversitaire::factory()->create();
    $filiere = Filiere::factory()->create();
    $niveau = Niveau::factory()->create(['filiere_id' => $filiere->id]);
    $prof = Professeur::factory()->create();

    $cours1 = Cours::factory()->create(['nom' => 'Algorithmique']);
    $cours2 = Cours::factory()->create(['nom' => 'Base de Données']);

    $ens1 = Enseignement::factory()->create([
        'cours_id' => $cours1->id,
        'professeur_id' => $prof->id,
        'annee_universitaire_id' => $annee->id,
    ]);
    $ens2 = Enseignement::factory()->create([
        'cours_id' => $cours2->id,
        'professeur_id' => $prof->id,
        'annee_universitaire_id' => $annee->id,
    ]);

    // Attach to classe with coefficients: ens1 coef=2, ens2 coef=3
    $niveau->enseignements()->attach($ens1->id, ['coefficient' => 2.0]);
    $niveau->enseignements()->attach($ens2->id, ['coefficient' => 3.0]);

    $enseignements = $niveau->enseignements()->get();

    // Moyennes: ens1 = 12, ens2 = 15
    // Calcul attendu : (12 * 2 + 15 * 3) / (2 + 3) = (24 + 45) / 5 = 69 / 5 = 13.80
    $moyenne1 = new Moyenne(['enseignement_id' => $ens1->id, 'valeur' => 12.0]);
    $moyenne2 = new Moyenne(['enseignement_id' => $ens2->id, 'valeur' => 15.0]);

    $moyennes = collect([$ens1->id => $moyenne1, $ens2->id => $moyenne2]);

    $moyenneGenerale = $service->calculerMoyenneGenerale($enseignements, $moyennes, true);

    expect($moyenneGenerale)->toBe(13.80);
});

test('La détermination de la mention respecte les seuils académiques', function () {
    $service = app(BulletinService::class);

    expect($service->determinerMention(16.5))->toBe('Très Bien');
    expect($service->determinerMention(16.0))->toBe('Très Bien');
    expect($service->determinerMention(14.5))->toBe('Bien');
    expect($service->determinerMention(14.0))->toBe('Bien');
    expect($service->determinerMention(12.5))->toBe('Assez Bien');
    expect($service->determinerMention(12.0))->toBe('Assez Bien');
    expect($service->determinerMention(10.5))->toBe('Passable');
    expect($service->determinerMention(10.0))->toBe('Passable');
    expect($service->determinerMention(8.5))->toBe('Insuffisant');
    expect($service->determinerMention(8.0))->toBe('Insuffisant');
    expect($service->determinerMention(6.0))->toBe('Médiocre');
    expect($service->determinerMention(null))->toBe('Non évalué');
});

test('La décision du jury est En attente si le bulletin est incomplet, Admis si >= 10, Ajourné sinon', function () {
    $service = app(BulletinService::class);

    expect($service->determinerDecisionJury(14.0, false))->toBe('En attente');
    expect($service->determinerDecisionJury(null, true))->toBe('En attente');
    expect($service->determinerDecisionJury(10.0, true))->toBe('Admis');
    expect($service->determinerDecisionJury(12.5, true))->toBe('Admis');
    expect($service->determinerDecisionJury(9.5, true))->toBe('Ajourné');
});

function creerInscription($etudiant, $annee) {
    return Inscription::create([
        'etudiant_ip' => $etudiant->ip,
        'annee_universitaire_id' => $annee->id,
        'date' => now(),
        'status' => 'Bon',
        'taux_reduction' => 0,
        'frais_annexe' => 20000,
        'montant_scolarite' => 145000,
        'montant_total' => 165000,
    ]);
}

test('Le calcul des rangs applique la règle de compétition pour les ex æquo', function () {
    $service = app(BulletinService::class);

    $annee = AnneeUniversitaire::factory()->create();
    $filiere = Filiere::factory()->create();
    $niveau = Niveau::factory()->create(['filiere_id' => $filiere->id]);
    $periode = PeriodeAcademique::create([
        'libelle' => 'Semestre 1',
        'date_debut' => '2025-09-01',
        'date_fin' => '2026-01-31',
        'annee_universitaire_id' => $annee->id,
    ]);

    // 4 étudiants
    $inscriptions = [];
    $moyennesNotes = [16.0, 14.0, 14.0, 11.0]; // Rang attendu: 1er, 2e, 2e, 4e

    foreach ($moyennesNotes as $note) {
        $etudiant = Etudiant::factory()->create();
        $inscrit = creerInscription($etudiant, $annee);
        $inscrit->niveaux()->attach($niveau->id);

        $bulletin = Bulletin::create([
            'inscription_id' => $inscrit->id,
            'periode_academique_id' => $periode->id,
            'moyenne_generale' => $note,
            'statut' => 'BROUILLON',
        ]);

        $inscriptions[] = $inscrit;
    }

    $service->calculerRangsEtEffectif($niveau->id, $periode->id);

    $bulletins = Bulletin::where('periode_academique_id', $periode->id)->get()->keyBy('moyenne_generale');

    expect($bulletins[16.0]->rang)->toBe(1);
    expect($bulletins[14.0]->rang)->toBe(2);
    expect($bulletins[11.0]->rang)->toBe(4);
    expect($bulletins[16.0]->effectif_classe)->toBe(4);
});

test('Un bulletin incomplet ne peut pas être validé ou publié', function () {
    $service = app(BulletinService::class);

    $annee = AnneeUniversitaire::factory()->create();
    $filiere = Filiere::factory()->create();
    $niveau = Niveau::factory()->create(['filiere_id' => $filiere->id]);
    $periode = PeriodeAcademique::create([
        'libelle' => 'Semestre 1',
        'date_debut' => '2025-09-01',
        'date_fin' => '2026-01-31',
        'annee_universitaire_id' => $annee->id,
    ]);
    $prof = Professeur::factory()->create();

    $cours1 = Cours::factory()->create();
    $cours2 = Cours::factory()->create();

    $ens1 = Enseignement::factory()->create([
        'cours_id' => $cours1->id,
        'professeur_id' => $prof->id,
        'annee_universitaire_id' => $annee->id,
    ]);
    $ens2 = Enseignement::factory()->create([
        'cours_id' => $cours2->id,
        'professeur_id' => $prof->id,
        'annee_universitaire_id' => $annee->id,
    ]);

    $niveau->enseignements()->attach($ens1->id, ['coefficient' => 1.0]);
    $niveau->enseignements()->attach($ens2->id, ['coefficient' => 1.0]);

    $etudiant = Etudiant::factory()->create();
    $inscrit = creerInscription($etudiant, $annee);
    $inscrit->niveaux()->attach($niveau->id);

    // Seulement 1 matière sur 2 a une moyenne
    Moyenne::create([
        'inscription_id' => $inscrit->id,
        'enseignement_id' => $ens1->id,
        'periode_academique_id' => $periode->id,
        'valeur' => 12.0,
    ]);

    $bulletin = Bulletin::create([
        'inscription_id' => $inscrit->id,
        'periode_academique_id' => $periode->id,
        'moyenne_generale' => 12.0,
        'statut' => 'BROUILLON',
    ]);

    // Validation doit échouer
    expect(fn() => $service->validerBulletin($bulletin->id))->toThrow(Exception::class);
    // Publication doit échouer
    expect(fn() => $service->publierBulletin($bulletin->id))->toThrow(Exception::class);
});

test('Un bulletin publié ne peut pas être modifié ou régénéré', function () {
    $service = app(BulletinService::class);

    $annee = AnneeUniversitaire::factory()->create();
    $filiere = Filiere::factory()->create();
    $niveau = Niveau::factory()->create(['filiere_id' => $filiere->id]);
    $periode = PeriodeAcademique::create([
        'libelle' => 'Semestre 1',
        'date_debut' => '2025-09-01',
        'date_fin' => '2026-01-31',
        'annee_universitaire_id' => $annee->id,
    ]);

    $etudiant = Etudiant::factory()->create();
    $inscrit = creerInscription($etudiant, $annee);
    $inscrit->niveaux()->attach($niveau->id);

    $bulletin = Bulletin::create([
        'inscription_id' => $inscrit->id,
        'periode_academique_id' => $periode->id,
        'moyenne_generale' => 15.0,
        'statut' => 'PUBLIE',
    ]);

    expect(fn() => $service->genererBulletinPourInscription($inscrit->id, $periode->id))->toThrow(Exception::class);
});

test('L\'API POST bulletins/generer génère les bulletins et l\'API GET /search lit sans écrire', function () {
    $admin = User::factory()->create();
    $admin->assignRole(RoleUser::ADMINISTRATEUR->value);

    $annee = AnneeUniversitaire::factory()->create();
    $filiere = Filiere::factory()->create();
    $niveau = Niveau::factory()->create(['filiere_id' => $filiere->id]);
    $periode = PeriodeAcademique::create([
        'libelle' => 'Semestre 1',
        'date_debut' => '2025-09-01',
        'date_fin' => '2026-01-31',
        'annee_universitaire_id' => $annee->id,
    ]);
    $prof = Professeur::factory()->create();

    $cours = Cours::factory()->create();
    $ens = Enseignement::factory()->create([
        'cours_id' => $cours->id,
        'professeur_id' => $prof->id,
        'annee_universitaire_id' => $annee->id,
    ]);
    $niveau->enseignements()->attach($ens->id, ['coefficient' => 2.0]);

    $etudiant = Etudiant::factory()->create();
    $inscrit = creerInscription($etudiant, $annee);
    $inscrit->niveaux()->attach($niveau->id);

    Moyenne::create([
        'inscription_id' => $inscrit->id,
        'enseignement_id' => $ens->id,
        'periode_academique_id' => $periode->id,
        'valeur' => 14.0,
        'appreciation' => 'Bon travail',
    ]);

    // 1. Appel POST pour générer
    $responseGen = $this->actingAs($admin)->postJson(route('bulletins.generer'), [
        'classeId' => $niveau->id,
        'periodeId' => $periode->id,
    ]);

    $responseGen->assertOk()
        ->assertJsonPath('success', true);

    $bulletin = Bulletin::where('inscription_id', $inscrit->id)
        ->where('periode_academique_id', $periode->id)
        ->first();

    expect($bulletin)->not->toBeNull();
    expect((float) $bulletin->moyenne_generale)->toBe(14.0);
    expect($bulletin->mention)->toBe('Bien');
    expect($bulletin->decision_jury)->toBe('Admis');
    expect($bulletin->rang)->toBe(1);

    // 2. Appel GET pour lecture
    $responseGet = $this->actingAs($admin)->getJson(route('bulletins.getBulletins', [
        'classeId' => $niveau->id,
        'periodeId' => $periode->id,
    ]));

    $responseGet->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('data.stats.total_etudiants', 1)
        ->assertJsonPath('data.stats.total_admis', 1);

    expect((float) $responseGet->json('data.stats.moyenne_classe'))->toBe(14.0);
});

test('Un utilisateur autorisé peut valider puis publier un bulletin complet', function () {
    $admin = User::factory()->create();
    $admin->assignRole(RoleUser::ADMINISTRATEUR->value);

    $annee = AnneeUniversitaire::factory()->create();
    $filiere = Filiere::factory()->create();
    $niveau = Niveau::factory()->create(['filiere_id' => $filiere->id]);
    $periode = PeriodeAcademique::create([
        'libelle' => 'Semestre 1',
        'date_debut' => '2025-09-01',
        'date_fin' => '2026-01-31',
        'annee_universitaire_id' => $annee->id,
    ]);
    $prof = Professeur::factory()->create();

    $cours = Cours::factory()->create();
    $ens = Enseignement::factory()->create([
        'cours_id' => $cours->id,
        'professeur_id' => $prof->id,
        'annee_universitaire_id' => $annee->id,
    ]);
    $niveau->enseignements()->attach($ens->id, ['coefficient' => 1.0]);

    $etudiant = Etudiant::factory()->create();
    $inscrit = creerInscription($etudiant, $annee);
    $inscrit->niveaux()->attach($niveau->id);

    Moyenne::create([
        'inscription_id' => $inscrit->id,
        'enseignement_id' => $ens->id,
        'periode_academique_id' => $periode->id,
        'valeur' => 15.0,
    ]);

    $bulletin = Bulletin::create([
        'inscription_id' => $inscrit->id,
        'periode_academique_id' => $periode->id,
        'moyenne_generale' => 15.0,
        'statut' => 'BROUILLON',
    ]);

    // Validation
    $resValider = $this->actingAs($admin)->putJson(route('bulletins.valider', $bulletin->id));
    $resValider->assertOk()->assertJsonPath('success', true);
    expect($bulletin->fresh()->statut)->toBe('VALIDE');

    // Publication
    $resPublier = $this->actingAs($admin)->putJson(route('bulletins.publier', $bulletin->id));
    $resPublier->assertOk()->assertJsonPath('success', true);
    expect($bulletin->fresh()->statut)->toBe('PUBLIE');
});

test('Un utilisateur non autorisé se voit refuser l\'accès aux routes de génération des bulletins', function () {
    AnneeUniversitaire::factory()->create(['estActive' => true]);

    $profUser = User::factory()->create();
    $profUser->assignRole(RoleUser::PROFESSEUR->value);

    $response = $this->actingAs($profUser)->postJson(route('bulletins.generer'), [
        'classeId' => 1,
        'periodeId' => 1,
    ]);

    $response->assertForbidden();
});



