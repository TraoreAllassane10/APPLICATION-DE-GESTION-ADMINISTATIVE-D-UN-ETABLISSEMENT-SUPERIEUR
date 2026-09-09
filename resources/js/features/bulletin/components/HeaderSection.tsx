import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Lock, RefreshCw, Sparkles } from 'lucide-react';

interface HeaderSectionProps {
    isLocked?: boolean;
    downloadingZip: boolean;
    onDownloadZip: () => void;
}

export default function HeaderSection({ isLocked = false, downloadingZip,  onDownloadZip }: HeaderSectionProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ">
            <div>
                <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Gestion des Bulletins
                    </h1>
                    <Badge variant={isLocked ? "default" : "outline"} className="gap-1.5 py-0.5">
                        <Lock className="size-3 text-amber-500" />
                        {isLocked ? "Verrouillé" : "Brouillon"}
                    </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                    Générez, analysez et exportez les relevés de notes et bilans périodiques.
                </p>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 text-xs font-medium"
                    onClick={onDownloadZip}
                    disabled={downloadingZip}
                >
                    <Download className="size-3.5" />
                    {downloadingZip ? "Téléchargement en cours..." : "Exporter la classe (ZIP)"}
                    
                </Button>
            </div>
        </div>
    );
}