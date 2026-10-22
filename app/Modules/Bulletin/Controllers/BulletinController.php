<?php

namespace App\Modules\Bulletin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bulletin;
use App\Models\Niveau;
use App\Models\PeriodeAcademique;
use App\Modules\Bulletin\Requests\GenererBulletinsRequest;
use App\Modules\Bulletin\Requests\GetBulletinsRequest;
use App\Modules\Bulletin\Services\BulletinService;
use App\Modules\Bulletin\Services\BulletinZipService;
use App\Modules\PeriodeAcademique\Services\PeriodeAcademiqueService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BulletinController extends Controller
{
    public function __construct(
        protected BulletinService $bulletinService,
        protected PeriodeAcademiqueService $periodeAcademiqueService,
        protected BulletinZipService $bulletinZipService
    ) {}

    /**
     * Affiche la page de consultation et de gestion des bulletins.
     */
    public function index(): Response
    {
        Gate::authorize('viewAny', Bulletin::class);

        $niveaux = Niveau::latest()->get();
        $periodes = $this->periodeAcademiqueService->all();
        $annees = \App\Models\AnneeUniversitaire::latest()->get();

        return Inertia::render("bulletin/Index", [
            "niveaux" => $niveaux,
            "periodes" => $periodes,
            "annees" => $annees,
        ]);
    }
    

    /**
     * Récupère la liste des bulletins et statistiques d'une classe pour une période (lecture seule).
     */
    public function getBulletins(GetBulletinsRequest $request): JsonResponse
    {
        Gate::authorize('viewAny', Bulletin::class);

        $classeId = (int) $request->validated('classeId');
        $periodeId = (int) $request->validated('periodeId');

        $data = $this->bulletinService->getBulletinsData($classeId, $periodeId);

        return response()->json([
            "success" => true,
            "sucess" => true, // Conservé pour compatibilité avec le frontend existant
            "data" => $data,
        ]);
    }

    /**
     * Génère ou recalcule les bulletins d'une classe ou d'une inscription spécifique.
     */
    public function generer(GenererBulletinsRequest $request): JsonResponse
    {
        Gate::authorize('generate', Bulletin::class);

        $classeId = (int) $request->validated('classeId');
        $periodeId = (int) $request->validated('periodeId');
        $inscriptionId = $request->validated('inscriptionId');

        try {
            if ($inscriptionId) {
                $bulletin = $this->bulletinService->genererBulletinPourInscription((int) $inscriptionId, $periodeId);
                return response()->json([
                    "success" => true,
                    "message" => "Le bulletin de l'étudiant a été généré avec succès.",
                    "bulletin" => $bulletin,
                ]);
            }

            $data = $this->bulletinService->genererBulletinsPourClasse($classeId, $periodeId);

            return response()->json([
                "success" => true,
                "message" => "Les bulletins de la classe ont été générés avec succès.",
                "data" => $data,
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Valide officiellement un bulletin.
     */
    public function valider(Bulletin $bulletin): JsonResponse
    {
        Gate::authorize('validate', $bulletin);

        try {
            $updated = $this->bulletinService->validerBulletin($bulletin->id);

            return response()->json([
                "success" => true,
                "message" => "Le bulletin a été validé avec succès.",
                "bulletin" => $updated,
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Publie officiellement un bulletin.
     */
    public function publier(Bulletin $bulletin): JsonResponse
    {
        Gate::authorize('publish', $bulletin);

        try {
            $updated = $this->bulletinService->publierBulletin($bulletin->id);

            return response()->json([
                "success" => true,
                "message" => "Le bulletin a été publié avec succès.",
                "bulletin" => $updated,
            ]);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Télécharge le PDF d'un bulletin.
     */
    public function telechargerBulletin(Bulletin $bulletin)
    {
        Gate::authorize('downloadPdf', $bulletin);

        return $this->bulletinService->telechargerBulletinPdf($bulletin->id);
    }

    /**
     * Télécharge l'archive ZIP de tous les bulletins d'une classe pour une période.
     */
    public function telechargerZip(Niveau $classe, PeriodeAcademique $periode)
    {
        Gate::authorize('viewAny', Bulletin::class);

        set_time_limit(300);

        $cheminRelativeZip = $this->bulletinZipService->GenererZipBulletinDuneClasse($classe, $periode);
        $cheminAbsoluZip = Storage::disk('public')->path($cheminRelativeZip);

        return response()->download($cheminAbsoluZip)->deleteFileAfterSend(true);
    }
}
