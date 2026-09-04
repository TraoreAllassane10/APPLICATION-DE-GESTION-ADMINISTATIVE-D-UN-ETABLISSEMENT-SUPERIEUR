import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Etudiant } from '@/types';
import { CheckCircle2, Search } from 'lucide-react';
import { useState } from 'react';

export default function StepEtudiant({
    etudiants,
    selected,
    onSelect,
}: {
    etudiants: Etudiant[];
    selected: Etudiant | null;
    onSelect: (e: Etudiant) => void;
}) {
    // const { etudiants } = usePage().props;
    const [query, setQuery] = useState('');

    const results = etudiants.filter((e) => {
        if (!query) return false;

        const q = query.toLowerCase();
        return (
            `${e.prenom} ${e.nom}`.toLowerCase().includes(q) ||
            e.ip.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    autoFocus
                    placeholder="Rechercher par nom, identifiant permanent"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9"
                />
            </div>

            <div className="divide-y overflow-hidden rounded-lg border">
                {results.length === 0 && (
                    <div className="p-8 text-center text-sm text-muted-foreground">
                        Commencez à taper le nom ou l'identifiant permanent de
                        l'etudiant. ATTENTION, vous ne verrez l'etudiant que
                        s'il n'est pas encore incrit.
                    </div>
                )}
                {results.map((etudiant) => {
                    const isSelected = selected?.ip === etudiant.ip;
                    return (
                        <button
                            key={etudiant.ip}
                            type="button"
                            onClick={() => onSelect(etudiant)}
                            className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-muted/50 ${isSelected ? 'bg-primary/5 hover:bg-primary/5' : ''} `}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'} `}
                                >
                                    {etudiant.nom[0]}
                                    {etudiant.prenom[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">
                                        {etudiant.nom} {etudiant.prenom}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {etudiant.ip}
                                    </p>
                                </div>
                            </div>
                            {isSelected && (
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                            )}
                        </button>
                    );
                })}
            </div>

            {selected && (
                <Alert className="border-primary/30 bg-primary/5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-sm">
                        <span className="font-semibold">
                            {selected.prenom} {selected.nom}
                        </span>{' '}
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
