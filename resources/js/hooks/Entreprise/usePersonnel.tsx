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

            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === 'proprietaire') {
                    formData.append(key, value ? '1' : '0');
                } else if (
                    (key === 'files') &&
                    Array.isArray(value)
                ) {
                    // Même traitement pour documents et files
                    value.forEach((file: File) => {
                        formData.append(`${key}[]`, file);
                    });
                } else if (key === 'formations' || key === 'experiences') {
                    formData.append(key, JSON.stringify(value));
                } else if (value !== null && value !== undefined) {
                    formData.append(key, value as string);
                }
            });

            await axios
                .post('/personnels', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
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

             const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (key === 'proprietaire') {
                    formData.append(key, value ? '1' : '0');
                } else if (
                    (key === 'files') &&
                    Array.isArray(value)
                ) {
                    // Même traitement pour documents et files
                    value.forEach((file: File) => {
                        formData.append(`${key}[]`, file);
                    });
                } else if (key === 'formations' || key === 'experiences') {
                    formData.append(key, JSON.stringify(value));
                } else if (value !== null && value !== undefined) {
                    formData.append(key, value as string);
                }
            });

            // Pour la modification 
            formData.append('_method', 'PUT');

            await axios
                .post(`/personnels/${id}/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
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
