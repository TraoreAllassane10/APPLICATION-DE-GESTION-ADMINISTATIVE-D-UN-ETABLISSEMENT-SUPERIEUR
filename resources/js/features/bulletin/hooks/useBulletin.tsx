import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Bulletin, BulletinStats } from '../types/bulletin.types';

export default function useBulletin() {
    const [loading, setLoading] = useState(false);
    const [bulletins, setBulletins] = useState<Bulletin[] | []>([]);
    const [stats, setStats] = useState<BulletinStats | null>(null);

    const getBulletins = async (classeId: number, periodeId: number) => {
        try {
            setLoading(true);
            setBulletins([]);
            setStats(null);

            const response = await axios.get(
                `/bulletins/search?classeId=${classeId}&periodeId=${periodeId}`,
            );
            setStats(response.data.data.stats)
            setBulletins(response.data.data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { getBulletins, bulletins, stats, loading };
}
