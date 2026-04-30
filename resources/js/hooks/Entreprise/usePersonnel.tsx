import { personnels } from '@/routes';
import { PersonnelFormData } from '@/types';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function usePersonnel() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createPersonnel = async (data: PersonnelFormData) => {
        try {
            setIsLoading(true);

            await axios
                .post('/personnels', data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Employés crée avec succès !');

                        // Redirection vers la page d'affichage des personnels
                        router.visit(personnels());
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

    const updatePersonnel = async (id: string, data: PersonnelFormData) => {
        try {
            setIsLoading(true);

            await axios
                .put(`/personnels/${id}/update`, data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Employés modifié avec succès !');

                        // Redirection sur la page d'affiche
                        router.visit('/personnels');
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

    const deletePersonnel = async (id: string) => {
        try {
            setIsLoading(true);

            await axios
                .delete(`/personnels/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success(
                            response.data.message ??
                                'Employés supprimé avec succès!',
                        );

                        router.visit(personnels());
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la suppression d'employés",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createPersonnel,
        updatePersonnel,
        deletePersonnel,
        isLoading,
    };
}
