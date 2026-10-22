import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DataNiveau, Periode } from '@/types';
import {
    AlertCircle,
    Calendar,
    CheckCircle2,
    Filter,
    GraduationCap,
    RefreshCw,
    Search,
    Sparkles,
} from 'lucide-react';
import { AnneeUniversitaire } from '../types/bulletin.types';

interface FilterSectionProps {
    annees: AnneeUniversitaire[];
    selectedAnnee: string;
    onSelectedAnnee: (value: string) => void;
    niveaux: DataNiveau[];
    selectedClasse: string;
    onSelectedClasse: (value: string) => void;
    periodes: Periode[];
    selectedPeriode: string;
    onSelectedPeriode: (value: string) => void;
    searchTerm: string;
    onSearchTerm: (value: string) => void;
    statutFilter: string;
    onStatutFilter: (value: string) => void;
    completudeFilter: string;
    onCompletudeFilter: (value: string) => void;
    onCharger: () => void;
    onGenererMasse: () => void;
    isLoading: boolean;
    isGenerating: boolean;
    hasData: boolean;
}

export default function FilterSection({
    annees,
    selectedAnnee,
    onSelectedAnnee,
    niveaux,
    selectedClasse,
    onSelectedClasse,
    periodes,
    selectedPeriode,
    onSelectedPeriode,
    searchTerm,
    onSearchTerm,
    statutFilter,
    onStatutFilter,
    completudeFilter,
    onCompletudeFilter,
    onCharger,
    onGenererMasse,
    isLoading,
    isGenerating,
    hasData,
}: FilterSectionProps) {
    const isSelectionReady = Boolean(selectedClasse && selectedPeriode);

    // Filtrer les périodes par année si spécifiée
    const filteredPeriodes = selectedAnnee
        ? periodes.filter(
              (p) =>
                  !p.annee_universitaire_id ||
                  p.annee_universitaire_id.toString() === selectedAnnee,
          )
        : periodes;

    return (
        <Card className="border-border/60 bg-card/60 shadow-xs backdrop-blur-sm">
            <CardContent className="space-y-4 p-4">
                {/* 1ère ligne : Sélection Session académique */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-end">
                    {/* Année Académique */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            <Calendar className="size-3.5 text-primary" />
                            Année Académique
                        </label>
                        <Select
                            value={selectedAnnee}
                            onValueChange={onSelectedAnnee}
                        >
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Choisir une année..." />
                            </SelectTrigger>
                            <SelectContent>
                                {annees.map((a) => (
                                    <SelectItem key={a.id} value={a.id.toString()}>
                                        {a.libelle}{' '}
                                        {a.estActive && '(En cours)'}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sélection Classe */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            <GraduationCap className="size-3.5 text-primary" />
                            Classe / Niveau
                        </label>
                        <Select
                            value={selectedClasse}
                            onValueChange={onSelectedClasse}
                        >
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Choisir une classe..." />
                            </SelectTrigger>
                            <SelectContent>
                                {niveaux.map((c) => (
                                    <SelectItem key={c.id} value={c.id.toString()}>
                                        {c.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sélection Période */}
                    <div className="space-y-1.5">
                        <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            <Calendar className="size-3.5 text-primary" />
                            Période
                        </label>
                        <Select
                            value={selectedPeriode}
                            onValueChange={onSelectedPeriode}
                        >
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="Choisir une période..." />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredPeriodes.map((p) => (
                                    <SelectItem key={p.id} value={p.id.toString()}>
                                        {p.libelle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Boutons d'action : Consulter / Générer */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            onClick={onCharger}
                            disabled={isLoading || !isSelectionReady}
                            size="sm"
                            className="h-9 flex-1 gap-1.5 font-medium"
                        >
                            <RefreshCw
                                className={`size-3.5 ${
                                    isLoading ? 'animate-spin' : ''
                                }`}
                            />
                            {isLoading ? 'Chargement...' : 'Afficher'}
                        </Button>

                        <Button
                            onClick={onGenererMasse}
                            disabled={isGenerating || !isSelectionReady}
                            size="sm"
                            className="h-9 flex-1 gap-1.5 font-medium shadow-xs"
                        >
                            <Sparkles
                                className={`size-3.5 ${
                                    isGenerating ? 'animate-spin' : ''
                                }`}
                            />
                            {isGenerating ? 'Calcul...' : 'Générer la classe'}
                        </Button>
                    </div>
                </div>

                {/* 2ème ligne : Recherche & Filtres opérationnels (visibles dès qu'une classe est sélectionnée) */}
                {hasData && (
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                        {/* Recherche texte */}
                        <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
                            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Rechercher par nom, matricule..."
                                value={searchTerm}
                                onChange={(e) => onSearchTerm(e.target.value)}
                                className="h-8.5 pl-8 text-xs"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {/* Filtre par statut */}
                            <Select
                                value={statutFilter}
                                onValueChange={onStatutFilter}
                            >
                                <SelectTrigger className="h-8.5 w-[140px] text-xs">
                                    <SelectValue placeholder="Tous statuts" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Tous statuts</SelectItem>
                                    <SelectItem value="BROUILLON">
                                        Brouillons
                                    </SelectItem>
                                    <SelectItem value="VALIDE">
                                        Validés
                                    </SelectItem>
                                    <SelectItem value="PUBLIE">
                                        Publiés
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Filtre par complétude */}
                            <Select
                                value={completudeFilter}
                                onValueChange={onCompletudeFilter}
                            >
                                <SelectTrigger className="h-8.5 w-[150px] text-xs">
                                    <SelectValue placeholder="Complétude" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">
                                        Toutes notes
                                    </SelectItem>
                                    <SelectItem value="COMPLETE">
                                        Complets uniquement
                                    </SelectItem>
                                    <SelectItem value="INCOMPLETE">
                                        Incomplets uniquement
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}