import inscriptions from '@/routes/inscriptions';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CreateInscriptionData {
    etudiant_ip: string | undefined;
    annee_id: string;
    niveaux: string[];
    type_inscription: string;
    taux_reduction: number;
}

export default function useInscription() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Recherche et filtrage des données
    const rechercheEtFiltrage = (search: string, filtreStatut: string, filtreNiveau: string) => {
        try {
            return router.get(
                `/inscriptions`,
                {
                    search: search,
                    statut: filtreStatut,
                    niveau: filtreNiveau,
                    page: 1
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        } catch (error) {
            console.log('Erreur lors de la recherche ou du filtarge : ', error);
        }
    };

    // Création d'une inscription
    const createEtudiant = async (data: CreateInscriptionData) => {
        try {
            setIsLoading(true);

            await axios
                .post('/inscriptions', data)
                .then((response) => {
                    // Sucess
                    if (response.data.success) {
                        console.log(response);
                        toast.success('Inscription effectuée !');
                    }

                    // Echec
                    if (response.data.success === false) {
                        toast.error(response.data.message);
                        return;
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteEtudiant = async (id: number) => {
        try {
            setIsLoading(true);

            await axios
                .delete(`/inscriptions/${id}/delete`)
                .then((response) => {
                    // Sucess
                    if (response.data.success) {
                        toast.success('Inscription supprimée !');

                        router.visit("/inscriptions");
                    }

                    // Echec
                    if (response.data.success === false) {
                        toast.error(response.data.message);
                        return;
                    }
                })
                .catch((error) => {
                    toast.error('Erreur survenue lors de la suppression');
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { createEtudiant, deleteEtudiant, rechercheEtFiltrage, isLoading };
}
