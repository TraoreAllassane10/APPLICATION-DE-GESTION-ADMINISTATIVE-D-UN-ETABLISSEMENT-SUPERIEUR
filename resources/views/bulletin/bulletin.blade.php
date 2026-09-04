<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @page { margin: 20px 25px; }
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 11px; color: #000; }

        .header-table { width: 100%; border-collapse: collapse; margin-bottom: 6px; }
        .header-table td { vertical-align: top; border: none; }
        .republique p { margin: 0; line-height: 1.3; }
        .annee-academique { text-align: right; font-weight: bold; }

        .logo-title { text-align: center; width: 15%; }
        .logo-title img { width: 55px; }

        .titre-bulletin {
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            border: 2px solid #000;
            padding: 6px;
            margin: 6px auto 10px auto;
            width: 60%;
        }

        .infos-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; font-size: 11px; }
        .infos-table td { padding: 2px 4px; }
        .infos-table .label { font-weight: bold; width: 15%; }
        .infos-table .valeur { width: 35%; }

        table.notes { width: 100%; border-collapse: collapse; font-size: 10.5px; margin-top: 6px; }
        table.notes th, table.notes td { border: 1px solid #000; padding: 3px 5px; }
        table.notes th { background-color: #d9d9d9; font-weight: bold; text-align: left; }
        table.notes th.center, table.notes td.center { text-align: center; }
        tr.bilan td { font-weight: bold; background-color: #f2f2f2; }
        tr.total td { font-weight: bold; }

        .obs-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .obs-table td { border: 1px solid #000; vertical-align: top; padding: 6px; height: 90px; }
        .signature { text-align: center; }
    </style>
</head>
<body>

    @php
        use App\Enums\TypeEnseignement;

        $etudiant    = $bulletin->inscription->etudiant;
        $niveau      = $bulletin->inscription->niveaux[0] ?? null;
        $numSemestre = str_contains($bulletin->periodeAcademique->libelle, '1') ? 1 : 2;
        $suffixe     = $numSemestre == 1 ? 'er' : 'eme';
    @endphp

    {{-- ===== En-tête République / Année académique ===== --}}
    <table class="header-table">
        <tr>
            <td class="republique" style="width: 55%;">
                <p><strong>REPUBLIQUE DE COTE D'IVOIRE</strong></p>
                <p><em>Union - Discipline - Travail</em></p>
                <br>
                <p>Ministère de l'Enseignement Supérieur et de la</p>
                <p>Recherche Scientifique</p>
            </td>
            <td class="annee-academique" style="width: 45%;">
                Année Académique: {{ $bulletin->inscription->annee->libelle ?? '' }}
            </td>
        </tr>
    </table>

    {{-- ===== Logo + titre ===== --}}
    <table class="header-table">
        <tr>
            <td class="logo-title">
                <img src="{{ public_path('images/logo-inec.png') }}" alt="Logo INEC">
            </td>
            <td>
                <div class="titre-bulletin">
                    BULLETIN DU {{ $numSemestre }}{{ $suffixe }} SEMESTRE
                </div>
            </td>
        </tr>
    </table>

    {{-- ===== Infos étudiant ===== --}}
    <table class="infos-table">
        <tr>
            <td class="label">Nom &amp; Prénoms:</td>
            <td class="valeur"><strong>{{ strtoupper($etudiant->nom.' '.$etudiant->prenom) }}</strong></td>
            <td class="label">Date de Naissance</td>
            <td class="valeur">{{ \Carbon\Carbon::parse($etudiant->date_naissance)->format('d/m/Y') }}</td>
        </tr>
        <tr>
            <td class="label">IP</td>
            <td class="valeur">: {{ $etudiant->ip }}</td>
            <td class="label">Lieu de Naissance:</td>
            <td class="valeur">{{ $etudiant->lieu_naissance }}</td>
        </tr>
        <tr>
            <td class="label">Classe</td>
            <td class="valeur">: {{ $niveau->nom ?? '' }}</td>
            <td class="label">Sexe</td>
            <td class="valeur">{{ $etudiant->genre === 'Masculin' ? 'M' : 'F' }}</td>
        </tr>
        <tr>
            <td class="label">Statut</td>
            {{-- champ non présent dans l'objet fourni, à adapter (ex: $bulletin->inscription->status) --}}
            <td class="valeur">: {{ $etudiant->statut ?? '-' }}</td>
            <td class="label">Nationalité</td>
            <td class="valeur">{{ $etudiant->nationnalite }}</td>
        </tr>
        <tr>
            <td class="label">Redoublant</td>
            {{-- champ non présent dans l'objet fourni --}}
            <td class="valeur">: {{ $etudiant->redoublant ?? 'Non' }}</td>
            <td class="label">Effectif</td>
            <td class="valeur">{{ $bulletin->effectif_classe }}</td>
        </tr>
    </table>

    {{-- ===== Tableau des notes ===== --}}
    @php
        // Regroupement par type_enseignement (enum TypeEnseignement)
        $groupes = collect($bulletin->enseignements)->groupBy(function ($e) {
            $type = $e->cours->type_enseignement;
            return $type instanceof TypeEnseignement ? $type->value : $type;
        });

        // On force l'ordre d'affichage : Général puis Professionnel,
        // quel que soit l'ordre naturel des données groupées.
        $ordreAffichage = [
            TypeEnseignement::ENSEIGNEMENT_GENERAL->value,
            TypeEnseignement::ENSEIGNEMENT_PROFESSIONNEL->value,
        ];
        $groupes = $groupes->sortBy(function ($group, $cle) use ($ordreAffichage) {
            $position = array_search($cle, $ordreAffichage);
            return $position === false ? 99 : $position;
        });

        $totalMoyCoef = 0;
        $totalCoef    = 0;
    @endphp

    <table class="notes">
        <thead>
            <tr>
                <th style="width: 35%;">Matière</th>
                <th class="center" style="width: 10%;">Moyenne</th>
                <th class="center" style="width: 8%;">Coef</th>
                <th class="center" style="width: 10%;">Moy Coef</th>
                <th style="width: 17%;">Appréciation</th>
                <th style="width: 20%;">Enseignant</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($groupes as $cleGroupe => $enseignementsGroupe)
                @php
                    $sousTotalMoyCoef = 0;
                    $sousTotalCoef    = 0;

                    // Libellé affiché : "Bilan Enseignement Général" / "Bilan Enseignement Professionnel"
                    $libelleBilan = 'Bilan ' . \Illuminate\Support\Str::title($cleGroupe);
                @endphp

                @foreach ($enseignementsGroupe as $enseignement)
                    @php
                        $moyenne = $enseignement->pivot->moyenne_generale_matiere;

                        // Coefficient propre au niveau de l'étudiant
                        $coef = optional(
                            collect($enseignement->niveaux)->firstWhere('id', $niveau->id ?? null)
                        )->pivot->coefficient ?? 0;

                        $moyCoef = is_numeric($moyenne) ? round($moyenne * $coef, 2) : null;

                        if (is_numeric($moyCoef)) {
                            $sousTotalMoyCoef += $moyCoef;
                            $sousTotalCoef    += $coef;
                        }

                        // Appréciation statique en attendant la logique dynamique
                        $appreciation = 'Passable';
                    @endphp
                    <tr>
                        <td>{{ $enseignement->cours->nom }}</td>
                        <td class="center">{{ is_numeric($moyenne) ? $moyenne : 'NC' }}</td>
                        <td class="center">{{ $coef }}</td>
                        <td class="center">{{ $moyCoef ?? 'NC' }}</td>
                        <td>{{ $appreciation }}</td>
                        <td>{{ $enseignement->professeur->nom_prenom }}</td>
                    </tr>
                @endforeach

                <tr class="bilan">
                    <td>{{ $libelleBilan }}</td>
                    <td class="center">{{ $sousTotalCoef > 0 ? round($sousTotalMoyCoef / $sousTotalCoef, 2) : 'NC' }}</td>
                    <td class="center">{{ $sousTotalCoef }}</td>
                    <td class="center">{{ round($sousTotalMoyCoef, 2) }}</td>
                    <td></td>
                    <td>Passable</td>
                </tr>

                @php
                    $totalMoyCoef += $sousTotalMoyCoef;
                    $totalCoef    += $sousTotalCoef;
                @endphp
            @endforeach

            <tr class="total">
                <td colspan="2">TOTAL</td>
                <td class="center">{{ $totalCoef }}</td>
                <td class="center">{{ round($totalMoyCoef, 2) }}</td>
                <td colspan="2">
                    {{-- champ non présent dans l'objet fourni --}}
                    Heures d'Absence Semestrielle: {{ $bulletin->heures_absence ?? '0' }} heures
                </td>
            </tr>
        </tbody>
    </table>

    {{-- ===== Moyennes / rangs, avec S1 si on est au S2 ===== --}}
    <table class="infos-table" style="margin-top: 8px;">
        <tr>
            <td class="label">Moyenne du {{ $numSemestre }}{{ $suffixe }} Semestre:</td>
            <td class="valeur">{{ $bulletin->moyenne_generale }}</td>

            @if ($numSemestre == 2)
                <td class="label">Moyenne du 1er Semestre:</td>
                <td class="valeur">{{ $bulletinSemestre1->moyenne_generale ?? '-' }}</td>
            @endif
        </tr>
        <tr>
            <td class="label">Rang {{ $numSemestre }}{{ $suffixe }} Semestre:</td>
            <td class="valeur">{{ $bulletin->rang }}{{ $bulletin->rang == 1 ? 'er' : 'ème' }}</td>

            @if ($numSemestre == 2)
                <td class="label">Rang 1er Semestre:</td>
                <td class="valeur">{{ isset($bulletinSemestre1) ? $bulletinSemestre1->rang.'ème' : '-' }}</td>
            @endif
        </tr>
        @if ($numSemestre == 2)
            <tr>
                <td class="label">Moyenne Annuelle:</td>
                {{-- à fournir depuis le controller : (moy S1 + moy S2) / 2 par exemple --}}
                <td class="valeur">{{ $moyenneAnnuelle ?? '-' }}</td>
                <td class="label">Rang Annuel:</td>
                <td class="valeur">{{ $rangAnnuel ?? '-' }}</td>
            </tr>
        @endif
    </table>

    {{-- ===== Observations / Mention / Signature ===== --}}
    <table class="obs-table">
        <tr>
            <td style="width: 60%;">
                <strong>Observations</strong><br><br>
                {{ $bulletin->observations ?? '' }}
            </td>
            <td style="width: 15%; text-align: center;">
                <strong>{{ $bulletin->mention }}</strong>
            </td>
            <td style="width: 25%;" class="signature">
                <strong>Le Responsable Pédagogique</strong><br><br><br>
                INEC DALOA<br>
                Responsable Pédagogique<br>
                BP 2455 DALOA<br>
                Tél: 71 64 67 67
            </td>
        </tr>
    </table>

</body>
</html>