import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog';

interface ModalConfirmationSuppressionProps {
    selectedId: number | null;
    setSelectedId: (value: React.SetStateAction<number | null>) => void;
    title: string;
    content: string;
    handleDelete: () => Promise<void>;
}
 const ModalConfirmationSuppression = ({
    title,
    content,
    selectedId,
    setSelectedId,
    handleDelete,
}: ModalConfirmationSuppressionProps) => {
    return (
        <AlertDialog
            open={!!selectedId}
            onOpenChange={(open) => {
                if (!open) setSelectedId(null);
            }}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{content}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Supprimer
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalConfirmationSuppression;
