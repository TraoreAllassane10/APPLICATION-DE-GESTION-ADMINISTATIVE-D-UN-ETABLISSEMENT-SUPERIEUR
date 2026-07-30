import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    libelle: string;
    date_debut: Date;
    date_fin: Date;
}

export default function useAnnee() {
    // Création d'une nouvelle année
    const createAnnee = async (data: Data) => {
        try {
            await axios
                .post('/annee', data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success("L'année scolaire créée avec succès !");
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation de l'annee",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Modification d'une année
    const updateAnnee = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/annee/${id}/update`, data)
                .then((response) => {
                    toast.success("L'année scolaire modifiée avec succès !");

                    if (response.data.success) {
                        // Redirection sur la page d'affiche
                        router.visit('/annee');
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification de l'annee",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Suppression d'une année
    const deleteAnnee = async (id: number) => {
        try {
            await axios
                .delete(`/annee/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Année scolaire supprimée !');

                          // Redirection sur la page d'affiche
                        router.visit('/annee');
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression de l'annee",
                    );
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
            toast.error('Erreur survenue au niveau du serveur');
        }
    };

    // Changement de l'année active
    const changeAnnee = async (id: string) => {
        try {
            await axios
                .get(`annee/${id}/change-annee`)
                .then((response) => {
                    console.log(response);

                    if (response.data.success) {
                        toast.success("L'année académique changée !");
                        // Redirection sur la page d'affiche
                        router.get('/dashboard', {fresh: true});
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors du changement de l'annee",
                    );
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
            toast.error('Erreur survenue au niveau du serveur');
        }
    };

    return { createAnnee, updateAnnee, deleteAnnee, changeAnnee };
}
