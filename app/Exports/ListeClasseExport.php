<?php

namespace App\Exports;

use App\Models\Etudiant;
use App\Models\Niveau;
use App\Models\AnneeUniversitaire;
use App\Modules\Etudiant\Enums\StatutEtudiant;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ListeClasseExport implements FromCollection, WithMapping, WithHeadings, WithCustomStartCell, WithStyles, ShouldAutoSize
{
    protected $anneeActiveId;
    protected $niveauId;
    protected $rowNumber = 0;

    public function __construct(string $niveauId, string $anneeActiveId)
    {
        $this->niveauId = $niveauId;
        $this->anneeActiveId = $anneeActiveId;
    }

    /**
     * Point de départ du tableau des données pour laisser de l'espace aux en-têtes personnalisés.
     */
    public function startCell(): string
    {
        return 'A11';
    }

    public function collection()
    {
        $niveau = Niveau::findOrFail($this->niveauId);

        return Etudiant::whereHas("inscriptions", function ($query) use ($niveau) {
            return $query->where("annee_universitaire_id", $this->anneeActiveId)
                         ->whereHas("niveaux", function ($query) use ($niveau) {
                             return $query->whereIn("niveau_id", [$niveau->id]);
                         });
        })
        ->orderBy("nom")
        ->orderBy("prenom")
        ->get();
    }

    public function map($etudiant): array
    {
        $this->rowNumber++;

        return [
            $this->rowNumber,                              
            strtoupper($etudiant->nom) . " " . $etudiant->prenom,
            $etudiant->statut ?? 'NAFF',                   
            $etudiant->genre === "Masculin" ? 'M' : 'F',                        
            '', '', '',                                     
            '', '', '',                                     
            '',                                             
            ''                                           
        ];
    }

    public function headings(): array
    {
        return [
            'N°', 
            'NOM ET PRÉNOMS', 
            'Statut', 
            'Genre', 
            'I1', 'I2', 'I3',        
            'D1', 'D2', 'D3',     
            'Moy', 
            'Sign'
        ];
    }

    /**
     * Permet d'ajouter les métadonnées et en-têtes du haut (Ministère, Filière, Statistiques, etc.)
     */
    public function styles(Worksheet $sheet)
    {
        $niveau = Niveau::find($this->niveauId);
        $annee = AnneeUniversitaire::find($this->anneeActiveId);
        
        // Récupération des statistiques globales de la classe
        $etudiants = $this->collection();
        $totalM = $etudiants->where('genre', 'Masculin')->count();
        $totalF = $etudiants->where('genre', 'Féminin')->count();
        $totalEtudiants = $etudiants->count();
        
        $totalAff = $etudiants->where('statut', StatutEtudiant::AFFECTE->value)->count();
        $totalNaff = $etudiants->where('statut', StatutEtudiant::NAFF->value)->count();

        // Insertion des informations textuelles d'en-tête au-dessus du tableau
        $sheet->setCellValue('A1', "MINISTÈRE DE L'ENSEIGNEMENT SUPÉRIEUR ET DE LA RECHERCHE SCIENTIFIQUE - MESRS");
        $sheet->setCellValue('A2', "INSTITUT NATIONAL D'INTELLIGENCE NUMÉRIQUE ÉCONOMIQUE ET COMMERCIALE - INEC DALOA");
        $sheet->setCellValue('A3', "ANNÉE ACADÉMIQUE : " . ($annee ? $annee->libelle : '2025-2026'));
        $sheet->setCellValue('A4', "FILIÈRE : " . ($niveau ? $niveau->libelle : 'TH 2'));
        $sheet->setCellValue('A5', "MATIÈRE : _________________________________");
        $sheet->setCellValue('A6', "ENSEIGNANT : _______________________________ | COEFFICIENT : _______");
        
        // Statistiques
        $sheet->setCellValue('A8', "M : {$totalM}   F : {$totalF}   TOTAL : {$totalEtudiants}");
        $sheet->setCellValue('A9', "AFF : {$totalAff}   NAFF : {$totalNaff}   TOTAL : {$totalEtudiants}");

        // Style pour l'en-tête du tableau principal (situé à la ligne 11)
        return [
            11 => ['font' => ['bold' => true]],
            'A11:L11' => [
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E0E0E0']
                ],
                'borders' => [
                    'allBorders' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
            ],
        ];
    }
}