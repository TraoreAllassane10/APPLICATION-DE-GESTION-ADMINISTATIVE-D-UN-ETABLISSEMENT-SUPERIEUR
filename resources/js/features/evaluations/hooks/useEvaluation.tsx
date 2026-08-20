import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { EvaluationStoreData, EvaluationUpdateData } from '../types/evaluation.types';

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

    const filterEvaluation = (
        filtreEnseignement: string,
        filtrePeriode: string,
    ) => {
        try {
            return router.get(
                `/evaluations`,
                {
                    enseignement: filtreEnseignement,
                    periode: filtrePeriode,
                    page: 1,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        } catch (error) {
            console.log('Erreur lors du filtarge : ', error);
        }
    };


    const updateEvaluation = async (id: number, data: EvaluationUpdateData) => {
        try {
            await axios
                .put(`/evaluations/${id}/update`, data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success(response.data.message ?? 'Evaluation modifiée avec succès !');
                        router.visit('/evaluations');
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification de l'evaluation",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

   
    const deleteEvaluation = async (id: number) => {
        try {
            await axios
                .delete(`/evaluations/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success(response.data.message ?? 'Evaluation supprimée !');
                        router.reload();
                    }
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la suppression du Enseignant',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    return { createEvaluation, deleteEvaluation, updateEvaluation, filterEvaluation, loading };
}
