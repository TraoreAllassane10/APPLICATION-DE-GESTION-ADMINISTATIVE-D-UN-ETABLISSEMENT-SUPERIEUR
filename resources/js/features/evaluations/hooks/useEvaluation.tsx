import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { EvaluationStoreData } from '../types/evaluation.types';

export default function useEvaluation() {
    const [loading, setLoading] = useState<boolean>(false);

    const createEvaluation = async (data: EvaluationStoreData) => {
        try {
            setLoading(true);

            const response = await axios.post('/evaluations', data);

            if (response.data.success) {
                toast.success(
                    response.data.message ?? 'Evaluation crée avec succès !',
                );
                router.visit('/evaluations');
            }
            else {
                toast.error(
                    response.data.message ?? 'La création d\'evaluation a échouée !',
                );
            }
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Modification d'un professeur
    // const updateProfesseur = async (id: string, data: DataUpdate) => {
    //     try {
    //         await axios
    //             .put(`/professeur/${id}/update`, data)
    //             .then((response) => {
    //                 if (response.data.success) {
    //                     toast.success('Enseignant modifié avec succès !');

    //                     // Redirection sur la page d'affiche
    //                     router.visit('/professeur');
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast.error(
    //                     "Erreur survenue lors de la modification d'un enseignant",
    //                 );
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         toast.error('Erreur survenue au niveau du serveur');
    //         console.log(error);
    //     }
    // };

    // Suppression d'un professeur
    // const deleteProfesseur = async (id: number) => {
    //     try {
    //         await axios
    //             .delete(`/professeur/${id}/delete`)
    //             .then((response) => {
    //                 if (response.data.success) {
    //                     toast.success('Enseignant supprimé !');
    //                     router.visit(professeur());
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast.success(
    //                     'Erreur survenue lors de la suppression du Enseignant',
    //                 );
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         toast.error('Erreur survenue au niveau du serveur');
    //         console.log(error);
    //     }
    // };

    return { createEvaluation, loading };
}
