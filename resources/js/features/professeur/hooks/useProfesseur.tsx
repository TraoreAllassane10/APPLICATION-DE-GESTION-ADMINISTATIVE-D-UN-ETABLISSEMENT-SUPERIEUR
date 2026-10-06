import { professeur } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Data {
    option: number;
    matricule: string;
    nom_prenom: string;
    sexe: string;
    date_naissance: string;
    email: string;
    pays: string;
    specialite: string;
    telephone: string;
    password: string;
    diplome: string;
    grade: number;
    statut: number;
    annee_prise_fonction: number;
    formation_continue: number;
    nombre_heure_cours_prevue: number;
    nombre_heure_cours_realise: number;
    cours_enseignes: string[];
}

type DataUpdate = Omit<Data, 'option' | 'cours_enseignes'>;

interface DataAssigner {
    enseignement: string;
    classes: string[];
}

export default function useProfesseur() {
    const [loading, setLoading] = useState(false);

    const searchProfesseur = (search: string) => {
        try {
            router.get(`/professeur?search=${search}`);
        } catch (error) {
            console.log("Echec lors de la recherche de professeur : ", error);
        }
    }

    // Création d'un professeur
    const createProfesseur = async (data: Data) => {
           setLoading(true);
        try {
            await axios
                .post('/professeur', data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Enseignant crée avec succès !');

                        // Redirection vers la page d'affichage des professeur
                        router.visit(professeur());
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'un Enseignant",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Modification d'un professeur
    const updateProfesseur = async (id: string, data: DataUpdate) => {
           setLoading(true);
        try {
            await axios
                .put(`/professeur/${id}/update`, data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Enseignant modifié avec succès !');

                        // Redirection sur la page d'affiche
                        router.visit('/professeur');
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification d'un enseignant",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Suppression d'un professeur
    const deleteProfesseur = async (id: number) => {
        try {
               setLoading(true);
            await axios
                .delete(`/professeur/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Enseignant supprimé !');
                        router.reload();
                    }
                })
                .catch((error) => {
                    toast.success(
                        'Erreur survenue lors de la suppression du Enseignant',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Assigner des classes à un enseignant
    const assignerClassesProfesseur = async (
        id: number,
        data: DataAssigner,
    ) => {
        setLoading(true);
        try {
            await axios
                .post(`/professeur/${id}/assigner-classe`, data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Attribution effectée !');
                        router.visit(professeur());
                    }
                })
                .catch((error) => {
                    toast.success("Erreur survenue lors de l'attribution");
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        searchProfesseur,
        createProfesseur,
        updateProfesseur,
        deleteProfesseur,
        assignerClassesProfesseur,
        loading,
    };
}
