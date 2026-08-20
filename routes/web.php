<?php

use App\Http\Controllers\Administrateur\ActivityLogController;
use App\Http\Controllers\Administrateur\AnneeAcademiqueController;
use App\Http\Controllers\Administrateur\InscriptionController;
use App\Http\Controllers\Administrateur\PaiementController;
use App\Http\Controllers\Administrateur\ScolariteController;
use App\Http\Controllers\Administrateur\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnseignementController;
use App\Http\Controllers\Entreprise\PersonnelController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\Pedagogie\CoursController;
use App\Http\Controllers\Pedagogie\EvaluationController;
use App\Http\Controllers\Pedagogie\FiliereController;
use App\Http\Controllers\Pedagogie\NiveauController;
use App\Http\Controllers\Pedagogie\NoteController;
use App\Http\Controllers\Pedagogie\PeriodeAcdemiqueController;
use App\Http\Controllers\Pedagogie\ProfesseurController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('auth/login', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    // Configurations
    Route::get('/configurations', [AnneeAcademiqueController::class, "editAnneeActive"])->name('edit.anneeActive');

    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    //Routes annnée academique
    Route::controller(AnneeAcademiqueController::class)->group(function () {
        Route::get("annee", "index")->name("annee");
        Route::post("annee", "store")->name("annee.store");
        Route::get("annee/{annee}/edit", "edit")->name("annee.edit");
        Route::put("annee/{annee}/update", "update")->name("annee.update");
        Route::delete("annee/{annee}/delete", "delete")->name("annee.delete");

        Route::get("annee/{annee}/change-annee", "changeAnneeActive")->name("annee.change");
    });

    //Routes Etudiant
    Route::controller(EtudiantController::class)->group(function () {
        Route::get("etudiants", "index")->name("etudiants");
        Route::get("etudiants/{etudiant}/show", "show")->name("etudiants.show");
        Route::get("etudiants/create", "create")->name("etudiants.create");
        Route::post("etudiants", "store")->name("etudiants.store");
        Route::get("etudiants/{etudiant}/edit", "edit")->name("etudiants.edit");
        Route::put("etudiants/{etudiant}/update", "update")->name("etudiants.update");
        Route::delete("etudiants/{etudiant}/delete", "delete")->name("etudiants.delete");

        Route::get('/etudiants/{etudiant}/fiche', "getFicheIndentification")->name('etudiants.fiche');
        Route::get('/etudiants/{etudiant}/certificat-scolarite', "certificatDeScolarite")->name('etudiants.certificatDeScolarite');
    });

    // Routes Inscription
    Route::controller(InscriptionController::class)->group(function () {
        Route::get("/inscriptions", "index")->name("inscriptions.index");
        Route::get("/inscriptions/create",  "create")->name("inscriptions.create");
        Route::post("/inscriptions", "store")->name("inscriptions.store");

        Route::get("/inscriptions/{inscription}", "show")->name("inscriptions.show");
        Route::delete("/inscriptions/{inscription}/delete", "delete")->name("inscriptions.delete");
    });

    // ADMINISTRATEUR
    Route::middleware("administrateur")->group(function () {
        // Routes Paiement
        Route::controller(PaiementController::class)->group(function () {
            Route::get('/paiements', 'index')->name('paiements');
            Route::post("/inscriptions/{inscription}/paiement", "store")->name("paiements.store");
            Route::get('/paiements/{paiement}/recu', "recu")->name('paiements.recu');
            Route::get('/inscriptions/{inscription}/recap-paiements', "recapitulatifPaiement")->name('paiements.recap');
            Route::get('/paiements/export', "exportPaiements")->name('paiements.exportPaiements');
        });

        // Routes Scolarite
        Route::controller(ScolariteController::class)->group(function () {
            Route::get("scolarite", "index")->name("scolarite");
            Route::post("scolarite", "store")->name("scolarite.store");
            Route::get("scolarite/{scolarite}/edit", "edit")->name("scolarite.edit");
            Route::put("scolarite/{scolarite}/update", "update")->name("scolarite.update");
            Route::delete("scolarite/{scolarite}/delete", "delete")->name("scolarite.delete");
        });

        // Utilisateur
        Route::controller(UserController::class)->group(function () {
            Route::get("utilisateurs", "index")->name("utilisateur");
            Route::post("utilisateurs", "store")->name("utilisateurs.store");
            Route::delete("utilisateurs/{utilisateur}/delete", "delete")->name("utilisateurs.delete");
        });

        // Routes Historiques des actions
        Route::controller(ActivityLogController::class)->group(function () {
            Route::get("historiques", "index")->name("historique");
            Route::get("historiques/{activite}", "show")->name("historique.show");
        });


        // ----------------------------GESTION DU PERSONNEL-------------------------------
        Route::controller(PersonnelController::class)->group(function () {
            Route::get("personnels", "index")->name("personnels");
            Route::get("personnels/create", "create")->name("personnels.create");
            Route::post("personnels", "store")->name("personnels.store");
            Route::get("personnels/{personnel}/show", "show")->name("personnels.show");
            Route::get("personnels/{personnel}/edit", "edit")->name("personnels.edit");

            // Post, parce que j'utilise formData coté frontent. FormData ne supporte pas PUT
            Route::put("personnels/{personnel}/update", "update")->name("personnels.update");
            Route::delete("/personnels/{personnel}/delete", "delete")->name("personnels.delete");
        });
    });

    // INSPECTEUR PEDAGOGIQUE
    Route::middleware('inspecteur_pedagogique')->group(function () {
        // Routes Periode académique
        Route::controller(PeriodeAcdemiqueController::class)->group(function () {
            Route::get("periodes", "index")->name("periodes");
            Route::get("periodes/create", "create")->name("periodes.create");
            Route::post("periodes", "store")->name("periodes.store");
            Route::get("periodes/{periode}/show", "show")->name("periodes.show");
            Route::get("periodes/{periode}/edit", "edit")->name("periodes.edit");
            Route::put("periodes/{periode}/update", "update")->name("periodes.update");
            Route::delete("periodes/{periode}/delete", "delete")->name("periodes.delete");
        });

        //Routes filiere
        Route::controller(FiliereController::class)->group(function () {
            Route::get("filiere", "index")->name("filiere");
            Route::post("filiere", "store")->name("filiere.store");
            Route::get("filiere/{filiere}/edit", "edit")->name("filiere.edit");
            Route::put("filiere/{filiere}/update", "update")->name("filiere.update");
            Route::delete("filiere/{filiere}/delete", "delete")->name("filiere.delete");
        });

        // Routes Niveau
        Route::controller(NiveauController::class)->group(function () {
            Route::get("niveau", "index")->name("niveau");
            Route::post("niveau", "store")->name("niveau.store");
            Route::get("niveau/{niveau}/edit", "edit")->name("niveau.edit");
            Route::put("niveau/{niveau}/update", "update")->name("niveau.update");
            Route::delete("niveau/{niveau}/delete", "delete")->name("niveau.delete");

            Route::get("/niveau/{niveau}/emploi-du-temps", "emploiParNiveau")->name("niveau.emploi");
            Route::get("/niveau/{niveau}/liste-de-classe", "listeDeClasse")->name("niveau.liste");
            Route::get("/niveau/{niveau}/liste-de-classe/imprimer", "downloadListeDeClase")->name("niveau.liste.download");
        });

        //Routes Cours
        Route::controller(CoursController::class)->group(function () {
            Route::get("cours", "index")->name("cours");
            Route::get('cours/liste', "getCours")->name('cours.liste');
            Route::post("cours", "store")->name("cours.store");
            Route::get("cours/{cours}/edit", "edit")->name("cours.edit");
            Route::put("cours/{cours}/update", "update")->name("cours.update");
            Route::delete("cours/{cours}/delete", "delete")->name("cours.delete");
        });

        // Routes Professeur
        Route::controller(ProfesseurController::class)->group(function () {
            Route::get("professeur", "index")->name("professeur");
            Route::get("professeur/create", "create")->name("professeur.create");
            Route::post("professeur", "store")->name("professeur.store");
            Route::get("professeur/{professeur}/show", "show")->name("professeur.show");
            Route::get("professeur/{professeur}/edit", "edit")->name("professeur.edit");
            Route::put("professeur/{professeur}/update", "update")->name("professeur.update");
            Route::delete("professeur/{professeur}/delete", "delete")->name("professeur.delete");
            Route::get("professeur/export", "export")->name("professeur.export");
            Route::get("professeur/{professeur}/assigner-classe", "createAssigner")->name("professeur.assigner.create");
            Route::post("professeur/{professeur}/assigner-classe", "assigner")->name("professeur.assigner.store");
        });

        // Routes Enseignement
        Route::controller(EnseignementController::class)->group(function () {
            Route::post("/enseignements", "store")->name("enseigenement.store");
            Route::get("/enseignements/{enseignement}", "findEnseignement")->name("enseigenement.findEnseignement");
            Route::put("/enseignements/{enseignement}/update", "update")->name("enseigenement.update");
            Route::delete("/enseignements/{enseignement}/delete", "destroy")->name("enseigenement.delete");
        });

        // Routes Evaluations
        Route::controller(EvaluationController::class)->group(function () {
            Route::get('evaluations', 'index')->name('evaluations');
            Route::post('evaluations', 'store')->name('evaluations.store');
            Route::get("evaluations/create", "create")->name("evaluations.create");
            Route::get("evaluations/{evaluation}/edit", "edit")->name("evaluations.edit");
            Route::put("evaluations/{evaluation}/update", "update")->name("evaluations.update");
            Route::delete('evaluations/{evaluation}/delete', "destroy")->name('evaluations.destroy');
        });

        // Routes Note
        Route::controller(NoteController::class)->group(function () {
            Route::get("notes/{evaluation}/create-note", "create")->name("notes.create");
            Route::put('notes/update', "update")->name('notes.update');
        });
    });
});

require __DIR__ . '/settings.php';
