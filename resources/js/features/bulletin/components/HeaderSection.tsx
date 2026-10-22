import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, FileArchive, Layers, ShieldCheck } from 'lucide-react';

interface HeaderSectionProps {
    downloadingZip: boolean;
    onDownloadZip: () => void;
    hasSelection: boolean;
    classeNom?: string;
    periodeLibelle?: string;
}

export default function HeaderSection({
    downloadingZip,
    onDownloadZip,
    hasSelection,
    classeNom,
    periodeLibelle,
}: HeaderSectionProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Gestion des Bulletins
                    </h1>
                    {hasSelection && classeNom && periodeLibelle ? (
                        <Badge
                            variant="secondary"
                            className="gap-1.5 py-0.5 text-xs font-medium"
                        >
                            <Layers className="size-3 text-primary" />
                            {classeNom} — {periodeLibelle}
                        </Badge>
                    ) : (
                        <Badge
                            variant="outline"
                            className="gap-1.5 py-0.5 text-xs font-normal text-muted-foreground"
                        >
                            Session académique
                        </Badge>
                    )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                    Générez, analysez, validez et publiez les relevés de notes et bilans officiels.
                </p>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 text-xs font-medium shadow-xs"
                    onClick={onDownloadZip}
                    disabled={downloadingZip || !hasSelection}
                >
                    <Download className={`size-3.5 ${downloadingZip ? 'animate-bounce' : ''}`} />
                    {downloadingZip
                        ? 'Génération ZIP en cours...'
                        : 'Exporter la classe (ZIP)'}
                </Button>
            </div>
        </div>
    );
}