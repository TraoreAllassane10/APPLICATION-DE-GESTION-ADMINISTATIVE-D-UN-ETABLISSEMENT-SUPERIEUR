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

    // Creation d'un enseignement
    const createEnseignement = async (data: {cours: number, professeurId: number}) => {
        try {
            setLoading(true);

            const response = await axios.post(`/enseignements`, data);

            return response.data.data;
        } catch (error) {
            toast.error(
                "Erreur survenue lors de la l'attribution d'un cours",
            );
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Création d'un professeur
    const updateEnseignement = async (id: number, data: any) => {
        try {
            setLoading(true);

            const response = await axios.put(
                `/enseignements/${id}/update`,
                data,
            );

           return response.data.data;
        } catch (error) {
            toast.error('Erreur survenue lors de la mise à jour');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Suppression d'un enseignement
    const deleteEnseignement = async (id: number) => {
        try {
            setLoading(true);

            const response = await axios.delete(`/enseignements/${id}/delete`);

            return response.data.data;
        } catch (error) {
            toast.error(
                "Erreur survenue lors de la suppression de l'enseignement",
            );

            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Mettre à jour le coefficient d'un enseignement dans une classe donnée
    const updateCoefficientEnseignementInclasse = async (enseignementId: number, classeId: number, coefficient: number) => {
        try {
            const response = await axios.put(`/enseignement/${enseignementId}/update-coefficient-in-classe`, {classeId, coefficient});
            
            if (response.data.success) {
                toast.success('Coefficient mis à jour avec succès');
            }
        } catch (error) {
            toast.error('Erreur survenue lors de la mise à jour du coefficient');
            console.log(error);
        }
    }

    return {createEnseignement, getEnseignement, updateEnseignement, deleteEnseignement, updateCoefficientEnseignementInclasse, loading };
}
