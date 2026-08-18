import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export const HeaderSection = () => {
    return (
        <div className="flex items-start justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    Gestion des evaluations
                </h1>
                <p className="mt-0.5 text-sm text-muted-foreground">
                    Gérez les evalutions en toute simplicité.
                </p>
            </div>
            <Link href={'/evaluations/create'}>
                <Button className="gap-2 transition duration-300 hover:bg-red-700">
                    <PlusCircle className="h-4 w-4" />
                    Nouvelle evaluation
                </Button>
            </Link>
        </div>
    );
};
