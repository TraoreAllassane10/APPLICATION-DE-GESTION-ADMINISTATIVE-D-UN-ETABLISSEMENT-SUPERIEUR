<?php

namespace App\Providers;

use App\Enums\RoleUser;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\Filiere;
use App\Models\Inscription;
use App\Models\Niveau;
use App\Models\Paiement;
use App\Models\Scolarite;
use App\Modules\AnneeAcademique\Observers\AnneeUniversitaireObserver;
use App\Modules\Etudiant\Observes\EtudiantObserver;
use App\Modules\Evaluation\Events\EvaluationNoteUpdated;
use App\Modules\Evaluation\Events\EvaluationUpdated;
use App\Modules\Filiere\Observers\FiliereObserver;
use App\Modules\Inscription\Observers\InscriptionObserver;
use App\Modules\Moyenne\Listeners\UpdateMoyenneEnseignement;
use App\Modules\Niveau\Observers\NiveauObserver;
use App\Modules\Paiement\Observers\PaiementObserver;
use App\Modules\Scolarite\Observers\ScolariteObserver;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole(RoleUser::ADMINISTRATEUR->value) ? true : null;
        });

        Etudiant::observe(EtudiantObserver::class);
        Inscription::observe(InscriptionObserver::class);
        Paiement::observe(PaiementObserver::class);
        AnneeUniversitaire::observe(AnneeUniversitaireObserver::class);
        Scolarite::observe(ScolariteObserver::class);
        Filiere::observe(FiliereObserver::class);
        Niveau::observe(NiveauObserver::class);

        Event::listen(
            EvaluationNoteUpdated::class,
            UpdateMoyenneEnseignement::class
        );

         Event::listen(
            EvaluationUpdated::class,
            UpdateMoyenneEnseignement::class
        );
    }
}
