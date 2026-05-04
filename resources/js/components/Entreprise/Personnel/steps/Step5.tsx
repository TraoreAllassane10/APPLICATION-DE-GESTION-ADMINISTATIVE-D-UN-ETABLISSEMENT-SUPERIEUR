import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Document, PersonnelFormData } from '@/types';
import { Trash } from 'lucide-react';
import Field from '../Field';
import React from 'react';

export function Step5({
    data,
    setData,
}: {
    data: PersonnelFormData;
    setData: (d: PersonnelFormData) => void;
}) {
    const documents: Document[] = data.documents ?? [];
    const files: File[] = data.files ?? [];

    const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (!selectedFiles || selectedFiles.length === 0) {
            return;
        }

        const newFiles = Array.from(selectedFiles);

        const nextDocuments = newFiles.map((file, index) => ({
            id: Date.now() + index,
            nom: file.name,
            chemin: file.name,
        }));

        setData({
            ...data,
            documents: [...documents, ...nextDocuments],
            files: [...files, ...newFiles],
        });

        event.target.value = '';
    };

  
//   Supperession d'un document de la liste des documents du personnel
    const handleDeleteDocument = (index: number) => {
        const nextDocuments = documents.filter(
            (_, idx: number) => idx !== index,
        );
        const nextFiles = files.filter((_, idx: number) => idx !== index);
        setData({ ...data, documents: nextDocuments, files: nextFiles });
    };

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Pièces jointes">
                    <Input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFilesChange}
                    />
                    <p className="mt-2 text-sm text-muted-foreground">
                        Sélectionnez plusieurs fichiers pour l'employé.
                    </p>
                </Field>
            </div>

            <Table className="mb-4 w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Nom du fichier</TableHead>
                        {/* <TableHead>Chemin</TableHead> */}
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {documents.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                Aucune pièce jointe ajoutée
                            </TableCell>
                        </TableRow>
                    ) : (
                        documents.map((document: Document, index: number) => (
                            <TableRow key={`${document.nom}-${index}`}>
                                <TableCell>{document.nom}</TableCell>
                                {/* <TableCell>{document.chemin}</TableCell> */}
                                {/* <TableCell>
                                    <Button
                                        variant="outline"
                                        className="text-sm"
                                        onClick={() =>
                                            handleDeleteDocument(index)
                                        }
                                    >
                                        <Trash />
                                    </Button>
                                </TableCell> */}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
