<?php

namespace App\Providers;

use App\Enums\RoleUser;
use App\Events\EvaluationNoteUpdated;
use App\Events\EvaluationUpdated;
use App\Listeners\UpdateMoyenneEnseignement;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\Filiere;
use App\Models\Inscription;
use App\Models\Niveau;
use App\Models\Paiement;
use App\Models\Scolarite;
use App\Observers\AnneeUniversitaireObserver;
use App\Observers\EtudiantObserver;
use App\Observers\FiliereObserver;
use App\Observers\InscriptionObserver;
use App\Observers\NiveauObserver;
use App\Observers\PaiementObserver;
use App\Observers\ScolariteObserver;
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
