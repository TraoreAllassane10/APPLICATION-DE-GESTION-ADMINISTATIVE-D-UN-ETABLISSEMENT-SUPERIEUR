
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    nom: string;
}

export default function useCours() {
    // Création d'un cours
    const createCours = async (data: Data) => {
        try {
            await axios
                .post('/cours', data)
                .then(() => {
                    toast.success('Cours crée avec succès !');
                    // Redirection vers la page d'affichage des cours
                    router.visit("/cours");
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'un cours",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.error('Erreur survenue au cours du serveur');
            console.log(error)
        }
    };

    // Modification d'un cours
    const updateCours = async (id: string, data: Data) => {
        try {
            await axios
                .put(`/cours/${id}/update`, data)
                .then(() => {
                    toast.success('Cours modifié avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit('/cours');
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification d'un cours",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.error('Erreur survenue au cours du serveur');
            console.log(error)
        }
    };

    // Suppression d'un cours
    const deleteCours = async (id: number) => {
        try {
            await axios
                .delete(`/cours/${id}/delete`)
                .then(() => {
                    toast.success('Cours supprimé !');
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la suppression du cours',
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.error('Erreur survenue au cours du serveur');
            console.log(error)
        }
    };

    return { createCours, updateCours, deleteCours };
}
