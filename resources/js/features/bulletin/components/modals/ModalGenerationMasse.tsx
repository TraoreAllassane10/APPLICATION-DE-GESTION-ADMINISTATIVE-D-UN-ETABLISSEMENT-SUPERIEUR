import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertCircle,
    AlertTriangle,
    Award,
    CheckCircle2,
    Clock,
    FileCheck,
    GraduationCap,
    RefreshCw,
    Sparkles,
    Users,
    XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Bulletin, BulletinStats } from '../../types/bulletin.types';

interface ModalGenerationMasseProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    classeNom?: string;
    periodeLibelle?: string;
    bulletins: Bulletin[];
    stats: BulletinStats | null;
    isGenerating: boolean;
    onLancerGeneration: () => Promise<void>;
}

export default function ModalGenerationMasse({
    isOpen,
    onOpenChange,
    classeNom,
    periodeLibelle,
    bulletins,
    stats,
    isGenerating,
    onLancerGeneration,
}: ModalGenerationMasseProps) {
    const totalEtudiants = bulletins.length;
    const complets = bulletins.filter((b) => b.is_complet);
    const incomplets = bulletins.filter((b) => !b.is_complet);

    const [hasGeneratedInModal, setHasGeneratedInModal] = useState(false);

    const handleGenerate = async () => {
        await onLancerGeneration();
        setHasGeneratedInModal(true);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-4 border-b bg-card">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Sparkles className="size-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold">
                                Génération collective des bulletins
                            </DialogTitle>
                            <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                                Classe : <strong>{classeNom}</strong> — Période :{' '}
                                <strong>{periodeLibelle}</strong>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
                    {/* Explications & Règles */}
                    <div className="rounded-lg border bg-muted/30 p-3.5 space-y-1.5 leading-relaxed text-muted-foreground">
                        <p className="font-semibold text-foreground flex items-center gap-1.5">
                            <GraduationCap className="size-4 text-primary" />
                            Règles académiques de traitement :
                        </p>
                        <p>
                            • Les moyennes d'enseignement sont calculées selon les
                            coefficients officiels de la classe.
                        </p>
                        <p>
                            • Les rangs sont actualisés pour toute la promotion avec
                            la règle de compétition pour les ex æquo.
                        </p>
                        <p>
                            • Les bulletins déjà <strong>publiés</strong> sont
                            protégés et conservent leur état officiel certifié.
                        </p>
                    </div>

                    {/* Récapitulatif Statistique Réel */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="border rounded-lg p-3 bg-card space-y-1">
                            <span className="text-[10px] text-muted-foreground uppercase font-medium">
                                Inscriptions
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold">
                                    {totalEtudiants}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    étudiants
                                </span>
                            </div>
                        </div>

                        <div className="border rounded-lg p-3 bg-card space-y-1">
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-medium">
                                Complets
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {complets.length}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    prêts
                                </span>
                            </div>
                        </div>

                        <div className="border rounded-lg p-3 bg-card space-y-1">
                            <span className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-medium">
                                Incomplets
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                                    {incomplets.length}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    à corriger
                                </span>
                            </div>
                        </div>

                        <div className="border rounded-lg p-3 bg-card space-y-1">
                            <span className="text-[10px] text-primary uppercase font-medium">
                                Moyenne promo
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-bold">
                                    {stats?.moyenne_classe?.toFixed(2) ?? '0.00'}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    / 20
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Liste des étudiants nécessitant une correction */}
                    {incomplets.length > 0 ? (
                        <div className="space-y-2 border rounded-lg p-4 bg-amber-500/5 border-amber-300 dark:border-amber-900/60">
                            <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                                    <AlertTriangle className="size-4 text-amber-600" />
                                    Étudiants avec résultats incomplets ({incomplets.length})
                                </h4>
                                <Badge variant="outline" className="text-[10px]">
                                    Action requise
                                </Badge>
                            </div>
                            <p className="text-[11px] text-amber-800 dark:text-amber-400">
                                Ces étudiants ont des matières non évaluées. Leurs
                                bulletins restent au statut brouillon et ne pourront
                                pas être validés tant que les notes ne sont pas
                                saisies.
                            </p>

                            <div className="max-h-48 overflow-y-auto space-y-2 pt-1 divide-y divide-amber-200/50 dark:divide-amber-900/40">
                                {incomplets.map((b) => (
                                    <div
                                        key={b.inscription_id}
                                        className="pt-2 first:pt-0 flex items-start justify-between gap-2"
                                    >
                                        <div>
                                            <p className="font-medium text-foreground">
                                                {b.nom} {b.prenom}{' '}
                                                <span className="font-mono text-muted-foreground text-[10px]">
                                                    ({b.etudiant_ip})
                                                </span>
                                            </p>
                                            <p className="text-[11px] text-rose-500">
                                                Matières manquantes :{' '}
                                                {b.matieres_manquantes
                                                    ?.map((m) => m.cours_nom)
                                                    .join(', ') || 'Plusieurs'}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="text-[10px] shrink-0"
                                        >
                                            Brouillon
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-300 bg-emerald-50/80 p-3.5 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-300">
                            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                            <p className="font-medium">
                                Tous les étudiants ont l'ensemble de leurs notes
                                saisies. Les bulletins peuvent être validés et
                                publiés.
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter className="p-4 border-t bg-card flex items-center justify-between sm:justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                        className="text-xs"
                    >
                        Fermer
                    </Button>

                    <Button
                        size="sm"
                        onClick={handleGenerate}
                        disabled={isGenerating || totalEtudiants === 0}
                        className="gap-2 text-xs font-semibold shadow-xs"
                    >
                        <RefreshCw
                            className={`size-3.5 ${
                                isGenerating ? 'animate-spin' : ''
                            }`}
                        />
                        {isGenerating
                            ? 'Calcul des bulletins en cours...'
                            : hasGeneratedInModal
                            ? 'Recalculer à nouveau'
                            : 'Lancer le calcul général'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
