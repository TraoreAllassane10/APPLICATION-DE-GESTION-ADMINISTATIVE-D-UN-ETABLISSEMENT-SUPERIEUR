import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { NoteUpdate } from '../types/note.types';

export default function useNote() {
    const [loading, setLoading] = useState<boolean>(false);

    const updateNotes = async (data: NoteUpdate) => {
        try {
            setLoading(true);

            const response = await axios.put(`/notes/update`, data);

            if (response.data.success) {
                toast.success(
                    response.data.message ?? 'Notes enregistrées avec succès !',
                );
                // router.visit('/evaluations');
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




    // const updateEvaluation = async (id: number, data: EvaluationUpdateData) => {
    //     try {
    //         await axios
    //             .put(`/evaluations/${id}/update`, data)
    //             .then((response) => {
    //                 if (response.data.success) {
    //                     toast.success(response.data.message ?? 'Evaluation modifiée avec succès !');
    //                     router.visit('/evaluations');
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast.error(
    //                     "Erreur survenue lors de la modification de l'evaluation",
    //                 );
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         toast.error('Erreur survenue au niveau du serveur');
    //         console.log(error);
    //     }
    // };

   
    // const deleteEvaluation = async (id: number) => {
    //     try {
    //         await axios
    //             .delete(`/evaluations/${id}/delete`)
    //             .then((response) => {
    //                 if (response.data.success) {
    //                     toast.success(response.data.message ?? 'Evaluation supprimée !');
    //                     router.reload();
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast.error(
    //                     'Erreur survenue lors de la suppression du Enseignant',
    //                 );
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         toast.error('Erreur survenue au niveau du serveur');
    //         console.log(error);
    //     }
    // };

    return { updateNotes, loading };
}
