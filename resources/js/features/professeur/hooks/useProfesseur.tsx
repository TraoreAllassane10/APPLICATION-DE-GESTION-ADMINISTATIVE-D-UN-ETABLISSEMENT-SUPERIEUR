import { professeur } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    option: number;
    matricule: string;
    nom_prenom: string;
    sexe: string;
    date_naissance: string;
    pays: string;
    specialite: string;
    telephone: string;
    diplome: string;
    grade: number;
    statut: number;
    annee_prise_fonction: number;
    formation_continue: number;
    nombre_heure_cours_prevue: number;
    nombre_heure_cours_realise: number;
    cours_enseignes: string[];
    classes: string[];
}

export default function useProfesseur() {
    // Création d'un professeur
    const createProfesseur = async (data: Data) => {
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
        }
    };

    // Modification d'un professeur
    const updateProfesseur = async (id: string, data: Data) => {
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
                        "Erreur survenue lors de la modification d'un Enseignant",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Suppression d'un professeur
    const deleteProfesseur = async (id: number) => {
        try {
            await axios
                .delete(`/professeur/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Enseignant supprimé !');
                        router.visit(professeur());
                    }
                })
                .catch((error) => {
                    toast.success(
                        'Erreur survenue lors de la suppression du Enseignant',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    return { createProfesseur, updateProfesseur, deleteProfesseur };
}
