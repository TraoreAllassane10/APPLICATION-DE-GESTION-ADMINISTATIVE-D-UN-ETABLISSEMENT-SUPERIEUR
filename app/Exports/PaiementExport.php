<?php

namespace App\Exports;

use App\Models\Paiement;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PaiementExport implements FromCollection, WithHeadings, WithMapping
{
    protected mixed $anneeActiveId;
    protected string $periode;

    public function __construct(mixed $anneeActiveId, string $periode)
    {
        $this->anneeActiveId = $anneeActiveId;
        $this->periode = $periode;
    }

    public function collection()
    {
        $query = Paiement::query()->whereHas('inscription', function ($inscription) {
            $inscription->where('annee_universitaire_id', $this->anneeActiveId);
        })->with('inscription');

        $query->when($this->periode, function ($q) {
            if ($this->periode == 'Hebdomadaire') {
                $q->whereBetween('date_paiement', [
                    now()->startOfWeek(),
                    now()->endOfWeek()
                ]);
            } elseif ($this->periode == 'Mensuel') {
                $q->whereMonth('date_paiement', now()->month)
                    ->whereYear('date_paiement', now()->year);
            }
        });

        return $query
            ->latest()
            ->paginate(20)
            ->withQueryString();
    }

    public function headings(): array
    {
        return ['REFERENCE', 'MONTANT', 'ETUDIANT', 'DATE', 'METHODE DE PAIEMENT', 'NOM DU RECEVEUR'];
    }

    public function map($paiement): array
    {

        return [
            $paiement->reference,
            $paiement->montant,
            $paiement->inscription->etudiant->prenom . ' ' .  $paiement->inscription->etudiant->nom,
            $paiement->date_paiement,
            $paiement->methode_paiement,
            $paiement->nom_receveur,
        ];
    }
}
