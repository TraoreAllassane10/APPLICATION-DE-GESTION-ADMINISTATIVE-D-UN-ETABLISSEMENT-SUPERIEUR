import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useProfesseurMoyenne() {
    const [loading, setLoading] = useState<boolean>(false);

    const getMoyennes = async (
        classeId: number,
        enseignementId: number,
        periodeId: number,
    ) => {
        try {
            setLoading(true);

            const response = await axios.get(
                `/professeur/moyennes/search?classeId=${classeId}&enseignementId=${enseignementId}&periodeId=${periodeId}`,
            );

            return response.data;
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

    const udpateAppreciation = async (
        moyenneId: number,
        appreciation: string,
    ) => {
        try {
            setLoading(true);

            const response = await axios.post(
                `/professeur/moyennes/${moyenneId}/update-appreciation`,
                { appreciation },
            );

            if (response.data.success) {
                router.reload()
                toast.success('Appréciation mis à jour avec succès !');
            }

            return response.data;
        } catch (error) {
            console.log(
                "Erreur survenue lors de la mise à jour d'une appréciation : ",
                error,
            );

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { getMoyennes, udpateAppreciation, loading };
}
