import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    nom: string;
}

export default function useFiliere() {
    // Création d'une nouvelle filière
    const createFiliere = async (data: Data) => {
        try {
            await axios
                .post('/filiere', data)
                .then(() => {
                    toast.success("Filière créée avec succès !");
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation de la filière",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    // Modification d'une filière
    const updateFiliere = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/filiere/${id}/update`, data)
                .then(() => {
                    toast.success("Filière modifiée avec succès !");

                    // Redirection sur la page d'affiche
                    router.visit('/filiere');
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification de la filière",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    // Suppression d'une filere
    const deleteFiliere = async (id: number) => {
        try {
            await axios
                .delete(`/filiere/${id}/delete`)
                .then(() => {
                    toast.success('Filiere supprimée !');

                    router.reload()
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression de la filière",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    return { createFiliere, updateFiliere, deleteFiliere };
}
