import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';

const HeaderSection = () => {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Gestion des évaluations
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    Planifiez, modifiez et saisissez les notes de vos évaluations académiques.
                </p>
            </div>
            <Link href="/evaluations/create">
                <Button className="w-full gap-2 sm:w-auto">
                    <PlusCircle className="h-4 w-4" />
                    Nouvelle évaluation
                </Button>
            </Link>
        </div>
    );
};

export default HeaderSection;