import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useEnseignement() {
    const [loading, setLoading] = useState<boolean>(false);

    // Recuperation d'un enseignement
    const getEnseignement = async (id: number) => {
        try {
            setLoading(true);

            const response = await axios.get(`/enseignements/${id}`);

            return response.data.data;
        } catch (error) {
            toast.error(
                "Erreur survenue lors de la recuperation de l'enseignement",
            );
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrage d'enseignements
    const filtrageEnseignement = (
        filtreProfesseur: string,
        filtreCours: string,
        filtreNiveau: string,
    ) => {
        try {
            return router.get(
                `/enseignements`,
                {
                    professeur: filtreProfesseur,
                    cours: filtreCours,
                    niveau: filtreNiveau,
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

    // Creation d'un enseignement
    const createEnseignement = async (data: {
        cours: number;
        professeurId: number;
    }) => {
        try {
            setLoading(true);

            const response = await axios.post(`/enseignements`, data);

            return response.data.data;
        } catch (error) {
            toast.error("Erreur survenue lors de la l'attribution d'un cours");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const updateEnseignement = async (
        id: number,
        payloadOrNiveau: { classes: Array<{ niveauId: number; coefficient: number }> } | any,
        coefficient?: number,
    ) => {
        try {
            setLoading(true);

            let body: any;
            if (typeof payloadOrNiveau === 'object' && payloadOrNiveau !== null) {
                body = payloadOrNiveau;
            } else {
                body = {
                    niveau: payloadOrNiveau,
                    coefficient: coefficient,
                };
            }

            const response = await axios.put(`/enseignements/${id}/update`, body);

            if (response.data?.success) {
                toast.success(response.data?.message || 'Mise à jour effectuée avec succès');
            }

            return response.data;
        } catch (error: any) {
            const message = error?.response?.data?.message || 'Erreur survenue lors de la mise à jour';
            toast.error(message);
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Suppression d'un enseignement
    const deleteEnseignement = async (id: number) => {
        try {
            setLoading(true);

            const response = await axios.delete(`/enseignements/${id}/delete`);

            if (response.data?.success) {
                toast.success(
                    response.data?.message ||
                        'Enseignement supprimé avec succès',
                );
            }

            return response.data;
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                "Erreur survenue lors de la suppression de l'enseignement";
            toast.error(message);
            console.log(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Mettre à jour le coefficient d'un enseignement dans une classe donnée
    const updateCoefficientEnseignementInclasse = async (
        enseignementId: number,
        classeId: number,
        coefficient: number,
    ) => {
        try {
            const response = await axios.put(
                `/enseignement/${enseignementId}/update-coefficient-in-classe`,
                { classeId, coefficient },
            );

            if (response.data.success) {
                toast.success('Coefficient mis à jour avec succès');
            }
        } catch (error) {
            toast.error(
                'Erreur survenue lors de la mise à jour du coefficient',
            );
            console.log(error);
        }
    };

    return {
        createEnseignement,
        getEnseignement,
        updateEnseignement,
        deleteEnseignement,
        updateCoefficientEnseignementInclasse,
        filtrageEnseignement,
        loading,
    };
}
