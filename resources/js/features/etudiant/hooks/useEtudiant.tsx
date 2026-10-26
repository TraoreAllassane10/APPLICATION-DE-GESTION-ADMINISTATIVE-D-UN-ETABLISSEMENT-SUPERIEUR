import { etudiants } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { EtudiantFormData } from '../types/etudiant.types';

export default function useEtudiant() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getEtudiantFormData = (data: EtudiantFormData) => {
        const formData = new FormData();

        Object.entries(data).map(([key, value]) => {
            if (value === null || value === undefined) return;

            // Lors de la mise à jour , Laravel attend une image pour le champs photo
            // Donc on ne l'envoie pas photo lorsque c'est un string
            if (key === 'photo' && typeof value === 'string') return;

            if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value as any);
            }
        });

        return formData;
    };

    const rechercheEtFiltrage = (
        search: string,
        filtreStatut: string,
        filtreGenre: string,
    ) => {
        try {
            return router.get(
                `/etudiants`,
                {
                    search: search,
                    statut: filtreStatut,
                    genre: filtreGenre,
                    page: 1,
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

    // Création d'un etudiant
    const createEtudiant = async (data: EtudiantFormData) => {
        setIsLoading(true);
        const formData = getEtudiantFormData(data);

        try {
            const response = await axios.post('/etudiants', formData);

            if (response.data.success) {
                toast.success(
                    response.data.message ?? 'Etudiant crée avec succès !',
                );
                router.visit(etudiants());
            } else {
                toast.error(
                    response.data.message ??
                        "Une erreur est survenue lors d'enregistrement de l'etudiant",
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error(
                    "Une erreur est survenue lors d'enregistrement de l'etudiant",
                );
            }
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Modification d'un etudiant
    const updateEtudiant = async (id: string, data: EtudiantFormData) => {
        try {
            setIsLoading(true);

            const formData = getEtudiantFormData(data);
            formData.append('_method', 'PUT');

            await axios
                .post(`/etudiants/${id}/update`, formData)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Etudiant modifié avec succès !');

                        // Redirection sur la page d'affiche
                        router.visit('/etudiants');
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('Erreur survenue lors de la modification');
            }

            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Suppression d'un etudiant
    const deleteEtudiant = async (id: string) => {
        try {
            setIsLoading(true);

            await axios
                .delete(`/etudiants/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Etudiant supprimé !');
                        router.visit('/etudiants');
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression de l'etudiant",
                    );
                    console.log(error);
                });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error('Erreur survenue au lors de la suppression');
            }

            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createEtudiant,
        updateEtudiant,
        deleteEtudiant,
        rechercheEtFiltrage,
        isLoading,
    };
}
