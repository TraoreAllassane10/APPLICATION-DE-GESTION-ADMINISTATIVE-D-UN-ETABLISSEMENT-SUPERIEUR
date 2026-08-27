import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Bulletin } from '../types/bulletin.types';

export default function useBulletin() {
    const [loading, setLoading] = useState(false);
    const [bulletins, setBulletins] = useState<Bulletin[] | []>([]);

    const getBulletins = async (classeId: number, periodeId: number) => {
        try {
            setLoading(true);
            setBulletins([]);

            const response = await axios.get(
                `/bulletins/search?classeId=${classeId}&periodeId=${periodeId}`,
            );
            console.log(response.data.data);

            setBulletins(response.data.data);
        } catch (error) {
            console.log(
                'Erreur survenue lors de la recuperation du bulletin',
                error,
            );

            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { getBulletins, bulletins, loading };
}
