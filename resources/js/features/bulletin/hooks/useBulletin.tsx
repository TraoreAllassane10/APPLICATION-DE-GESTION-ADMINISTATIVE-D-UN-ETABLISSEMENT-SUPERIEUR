import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Bulletin, BulletinStats } from '../types/bulletin.types';

export default function useBulletin() {
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
    const [bulletins, setBulletins] = useState<Bulletin[]>([]);
    const [stats, setStats] = useState<BulletinStats | null>(null);

    /**
     * Récupère la liste des bulletins en lecture seule.
     */
    const getBulletins = async (classeId: number, periodeId: number) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `/bulletins/search?classeId=${classeId}&periodeId=${periodeId}`,
            );

            const payload = response.data?.data;
            if (payload) {
                setStats(payload.stats ?? null);
                setBulletins(payload.data ?? []);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ??
                        'Erreur lors du chargement des bulletins.',
                );
            } else {
                toast.error('Erreur inattendue.');
            }
        } finally {
            setLoading(false);
        }
    };

    /**
     * Génère ou recalcule les bulletins d'une classe (ou d'un étudiant spécifique).
     */
    const genererBulletins = async (
        classeId: number,
        periodeId: number,
        inscriptionId?: number,
    ) => {
        try {
            setGenerating(true);
            const response = await axios.post('/bulletins/generer', {
                classeId,
                periodeId,
                inscriptionId,
            });

            if (response.data?.success) {
                toast.success(
                    response.data.message ?? 'Bulletins générés avec succès.',
                );

                // Si génération de classe, on met à jour les données
                if (response.data.data) {
                    setStats(response.data.data.stats ?? null);
                    setBulletins(response.data.data.data ?? []);
                } else {
                    // Si génération d'un seul étudiant, on recharge
                    await getBulletins(classeId, periodeId);
                }
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ??
                        'Erreur lors de la génération des bulletins.',
                );
            } else {
                toast.error('Erreur lors de la génération.');
            }
            throw error;
        } finally {
            setGenerating(false);
        }
    };

    /**
     * Valide officiellement un bulletin.
     */
    const validerBulletin = async (
        bulletinId: number,
        classeId?: number,
        periodeId?: number,
    ) => {
        try {
            setActionLoadingId(bulletinId);
            const response = await axios.put(`/bulletins/${bulletinId}/valider`);

            if (response.data?.success) {
                toast.success(
                    response.data.message ?? 'Bulletin validé avec succès.',
                );

                // Mise à jour locale du statut
                setBulletins((prev) =>
                    prev.map((b) =>
                        b.id === bulletinId
                            ? { ...b, statut: 'VALIDE' as const }
                            : b,
                    ),
                );

                if (classeId && periodeId) {
                    await getBulletins(classeId, periodeId);
                }
                return response.data?.bulletin;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ??
                        'Impossible de valider ce bulletin.',
                );
            } else {
                toast.error('Erreur lors de la validation.');
            }
            throw error;
        } finally {
            setActionLoadingId(null);
        }
    };

    /**
     * Publie officiellement un bulletin.
     */
    const publierBulletin = async (
        bulletinId: number,
        classeId?: number,
        periodeId?: number,
    ) => {
        try {
            setActionLoadingId(bulletinId);
            const response = await axios.put(`/bulletins/${bulletinId}/publier`);

            if (response.data?.success) {
                toast.success(
                    response.data.message ?? 'Bulletin publié avec succès.',
                );

                setBulletins((prev) =>
                    prev.map((b) =>
                        b.id === bulletinId
                            ? { ...b, statut: 'PUBLIE' as const }
                            : b,
                    ),
                );

                if (classeId && periodeId) {
                    await getBulletins(classeId, periodeId);
                }
                return response.data?.bulletin;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ??
                        'Impossible de publier ce bulletin.',
                );
            } else {
                toast.error('Erreur lors de la publication.');
            }
            throw error;
        } finally {
            setActionLoadingId(null);
        }
    };

    return {
        getBulletins,
        genererBulletins,
        validerBulletin,
        publierBulletin,
        bulletins,
        stats,
        loading,
        generating,
        actionLoadingId,
    };
}
