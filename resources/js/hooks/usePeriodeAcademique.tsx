import { periodes } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    libelle: string;
    date_debut: Date;
    date_fin: Date;
}

export default function usePeriodeAcademique() {
    // Création d'une nouvelle periode
    const createPeriode = async (data: Data) => {
        try {
            await axios
                .post('/periodes', data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Période académique créée avec succès !');

                        //Redirection sur la page d'affiche
                        router.visit(periodes());
                    }
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la creation de la période académique',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Modification d'une période academique
    const updatePeriode = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/periodes/${id}/update`, data)
                .then((response) => {
                    toast.success('Période académique modifiée avec succès !');

                    if (response.data.success) {
                        // Redirection sur la page d'affiche
                        router.visit('/periodes');
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification d'une periode",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Suppression d'une periode
    const deletePeriode = async (id: number) => {
        try {
            await axios
                .delete(`/periodes/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Période académique supprimée !');

                        // Redirection sur la page d'affiche
                        router.visit('/periodes');
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression d'une periode",
                    );
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
            toast.error('Erreur survenue au niveau du serveur');
        }
    };

    return { createPeriode, updatePeriode, deletePeriode };
}
