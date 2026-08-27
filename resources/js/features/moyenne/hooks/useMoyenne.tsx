import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useMoyenne() {
    const [loading, setLoading] = useState<boolean>(false);

    const getMoyennes = async (
        classeId: number,
        enseignementId: number,
        periodeId: number,
    ) => {
        try {
            setLoading(true);

            const response = await axios.get(
                `/moyennes/search?classeId=${classeId}&enseignementId=${enseignementId}&periodeId=${periodeId}`,
            );

            return response.data.data;
        } catch (error) {
            console.log(
                'Erreur survenue lors de la recuperation des moyennes : ',
                error,
            );

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { getMoyennes, loading };
}
