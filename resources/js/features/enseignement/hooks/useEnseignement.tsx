import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useEnseignement() {
    const [loading, setLoading] = useState<boolean>(false);

    // Recuperation d'un enseignement
    const getEnseignement = async (id: number) => {
        try {
            setLoading(true);

            const response = await axios.get(`/enseignement/${id}`);

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

    // Création d'un professeur
    const updateEnseignement = async (id: number, data: any) => {
        try {
            setLoading(true);

            const response = await axios.put(
                `/enseignement/${id}/update`,
                data,
            );

            response.data.data;
        } catch (error) {
            toast.error('Erreur survenue lors de la mise à jour');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { getEnseignement, updateEnseignement, loading };
}
