<?php

use App\Http\Controllers\Administrateur\ActivityLogController;
use App\Http\Controllers\Administrateur\AnneeAcademiqueController;
use App\Http\Controllers\Administrateur\InscriptionController;
use App\Http\Controllers\Administrateur\PaiementController;
use App\Http\Controllers\Administrateur\ScolariteController;
use App\Http\Controllers\Administrateur\UserController;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Entreprise\PersonnelController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\Pedagogie\FiliereController;
use App\Http\Controllers\Pedagogie\HoraireController;
use App\Http\Controllers\Pedagogie\NiveauController;
use App\Http\Controllers\Pedagogie\SalleController;
use App\Http\Controllers\Pedagogie\SeanceController;
use App\Http\Controllers\Pedagogie\SemaineController;
use App\Http\Controllers\Pedagogie\SiteController;
use App\Http\Controllers\ProfesseurController;
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

    // Utilisateur
    Route::middleware("administrateur")->controller(UserController::class)->group(function () {
        Route::get("utilisateurs", "index")->name("utilisateur");
        Route::post("utilisateurs", "store")->name("utilisateurs.store");
        Route::delete("utilisateurs/{utilisateur}/delete", "delete")->name("utilisateurs.delete");
    });

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
    });

    //Routes Site
    Route::controller(SiteController::class)->group(function () {
        Route::get("site", "index")->name("site");
        Route::post("site", "store")->name("site.store");
        Route::get("site/{site}/edit", "edit")->name("site.edit");
        Route::put("site/{site}/update", "update")->name("site.update");
        Route::delete("site/{site}/delete", "delete")->name("site.delete");
    });


    //Routes salle
    Route::controller(SalleController::class)->group(function () {
        Route::get("salle", "index")->name("salle");
        Route::post("salle", "store")->name("salle.store");
        Route::get("salle/{salle}/edit", "edit")->name("salle.edit");
        Route::put("salle/{salle}/update", "update")->name("salle.update");
        Route::delete("salle/{salle}/delete", "delete")->name("salle.delete");
    });

    //Routes cours
    Route::controller(CoursController::class)->group(function () {
        Route::get("cours", "index")->name("cours");
        Route::post("cours", "store")->name("cours.store");
        Route::get("cours/{cours}/edit", "edit")->name("cours.edit");
        Route::put("cours/{cours}/update", "update")->name("cours.update");
        Route::delete("cours/{cours}/delete", "delete")->name("cours.delete");
    });

    //Routes seance
    Route::controller(SeanceController::class)->group(function () {
        Route::get("seance", "index")->name("seance");
        Route::get("seance/create", "create")->name("seance.create");
        Route::post("seance", "store")->name("seance.store");
        Route::get("seance/{seance}/edit", "edit")->name("seance.edit");
        Route::put("seance/{seance}/update", "update")->name("seance.update");
        Route::delete("seance/{seance}/delete", "delete")->name("seance.delete");
        Route::get("seance/export", "exportPDF")->name("seance.pdf");
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

    //Routes Horaires
    Route::controller(HoraireController::class)->group(function () {
        Route::get("horaire", "index")->name("horaire");
        Route::post("horaire", "store")->name("horaire.store");
        Route::get("horaire/{horaire}/edit", "edit")->name("horaire.edit");
        Route::put("horaire/{horaire}/update", "update")->name("horaire.update");
        Route::delete("horaire/{horaire}/delete", "delete")->name("horaire.delete");
    });

    //Routes Semaine
    Route::controller(SemaineController::class)->group(function () {
        Route::get("semaine", "index")->name("semaine");
        Route::post("semaine", "store")->name("semaine.store");
        Route::get("semaine/{semaine}/edit", "edit")->name("semaine.edit");
        Route::put("semaine/{semaine}/update", "update")->name("semaine.update");
        Route::delete("semaine/{semaine}/delete", "delete")->name("semaine.delete");
    });

    // Routes Inscription
    Route::controller(InscriptionController::class)->group(function () {
        Route::get("/inscriptions", "index")->name("inscriptions.index");
        Route::get("/inscriptions/create",  "create")->name("inscriptions.create");
        Route::post("/inscriptions", "store")->name("inscriptions.store");

        Route::get("/inscriptions/{inscription}", "show")->name("inscriptions.show");
        Route::delete("/inscriptions/{inscription}/delete", "delete")->name("inscriptions.delete");
    });

    // Routes Paiement
    Route::middleware("administrateur")->controller(PaiementController::class)->group(function () {
        Route::post("/inscriptions/{inscription}/paiement", "store")->name("paiements.store");
        Route::get('/paiements/{paiement}/recu', "recu")->name('paiements.recu');
        Route::get('/inscriptions/{inscription}/recap-paiements', "recapitulatifPaiement")->name('paiements.recap');
    });

    // Routes Scolarite
    Route::controller(ScolariteController::class)->group(function () {
        Route::get("scolarite", "index")->name("scolarite");
        Route::post("scolarite", "store")->name("scolarite.store");
        Route::get("scolarite/{scolarite}/edit", "edit")->name("scolarite.edit");
        Route::put("scolarite/{scolarite}/update", "update")->name("scolarite.update");
        Route::delete("scolarite/{scolarite}/delete", "delete")->name("scolarite.delete");
    });

    // Routes Historiques des actions
    Route::middleware("administrateur")->controller(ActivityLogController::class)->group(function () {
        Route::get("historiques", "index")->name("historique");
        Route::get("historiques/{activite}", "show")->name("historique.show");
    });


    // ----------------------------GESTION DU PERSONNEL-------------------------------
    Route::middleware("administrateur")->controller(PersonnelController::class)->group(function () {
        Route::get("personnels", "index")->name("personnels");
        Route::get("personnels/create", "create")->name("personnels.create");
        Route::post("personnels", "store")->name("personnels.store");
        Route::get("personnels/{personnel}/show", "show")->name("personnels.show");
        Route::get("personnels/{personnel}/edit", "edit")->name("personnels.edit");
        Route::put("personnels/{personnel}/update", "update")->name("personnels.update");
        Route::delete("/personnels/{personnel}/delete", "delete")->name("personnels.delete");
    });
});

require __DIR__ . '/settings.php';
