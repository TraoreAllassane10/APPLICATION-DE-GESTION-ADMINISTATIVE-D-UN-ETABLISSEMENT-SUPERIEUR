import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TypeInscription } from '@/types';
import { usePage } from '@inertiajs/react';
import { ArrowRightLeft, GraduationCap, RefreshCw } from 'lucide-react';

export default function StepAcademique({
    annee,
    niveau,
    typeInscription,
    setAnnee,
    setNiveau,
    setTypeInscription,
}: {
    annee: string;
    niveau: string[];
    typeInscription: TypeInscription;
    setAnnee: (v: string) => void;
    setNiveau: any;
    setTypeInscription: (v: TypeInscription) => void;
}) {
    const { niveaux, annees } = usePage().props;

    const TYPE_OPTIONS: {
        value: TypeInscription;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
    }[] = [
        {
            value: 'Nouvelle',
            label: 'Nouvelle inscription',
            icon: GraduationCap,
        },
        { value: 'Redoublement', label: 'Redoublement', icon: RefreshCw },
        { value: 'Transfert', label: 'Transfert', icon: ArrowRightLeft },
    ];

    // Ajouter un niveau
    const handleNiveauChange = (niveauId: string) => {
        setNiveau(
            niveau.includes(niveauId)
                ? niveau.filter((n) => n !== niveauId)
                : [...niveau, niveauId],
        );
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label>
                        Année universitaire{' '}
                        <span className="text-destructive">*</span>
                    </Label>
                    <Select value={annee} onValueChange={setAnnee}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une année" />
                        </SelectTrigger>
                        <SelectContent>
                            {(
                                annees as Array<{ id: string; libelle: string }>
                            ).map((anne) => (
                                <SelectItem key={anne.id} value={anne.id}>
                                    {anne.libelle}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>
                        Niveaux <span className="text-destructive">*</span>
                    </Label>
                    <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border bg-muted/30 p-3">
                        {(niveaux as Array<{ id: string; nom: string }>).map(
                            (niv) => (
                                <label
                                    key={niv.id}
                                    className="flex cursor-pointer items-center gap-2 rounded p-2 transition-colors hover:bg-muted/50"
                                >
                                    <input
                                        type="checkbox"
                                        checked={niveau.includes(niv.id)}
                                        onChange={() =>
                                            handleNiveauChange(niv.id)
                                        }
                                        className="h-4 w-4"
                                    />
                                    <span className="text-sm">{niv.nom}</span>
                                </label>
                            ),
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label>
                    Type d'inscription{' '}
                    <span className="text-destructive">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                    {TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setTypeInscription(value)}
                            className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${
                                typeInscription === value
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border text-muted-foreground hover:border-muted-foreground/50'
                            } `}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-center text-xs leading-tight font-semibold">
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
