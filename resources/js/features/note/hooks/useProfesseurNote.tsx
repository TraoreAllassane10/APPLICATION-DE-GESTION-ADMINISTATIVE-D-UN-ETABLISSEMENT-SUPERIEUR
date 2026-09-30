import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { NoteUpdate } from '../types/note.types';

export default function useProfesseurNote() {
    const [loading, setLoading] = useState<boolean>(false);

    const updateNotes = async (data: NoteUpdate) => {
        try {
            setLoading(true);

            const response = await axios.put(`/professeur/evaluation/notes/update`, data);

            if (response.data.success) {
                toast.success(
                    response.data.message ?? 'Notes enregistrées avec succès !',
                );
            }
            else {
                toast.error(
                    response.data.message ?? 'L\'enregistrement des notes a échoué !',
                );
            }
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { updateNotes, loading };
}
