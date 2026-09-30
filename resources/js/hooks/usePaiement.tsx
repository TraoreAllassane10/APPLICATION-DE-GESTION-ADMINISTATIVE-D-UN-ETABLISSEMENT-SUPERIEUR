import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Data {
    montant: number;
    date_paiement: string;
    methode_paiement: string;
    reference: string;
}

export default function usePaiement() {
    const [loading, setLoading] = useState(false);

    // Création d'un paiement
    const createPaiement = async (inscriptionId: number, data: Data) => {
        setLoading(true);

        try {
            await axios
                .post(`/inscriptions/${inscriptionId}/paiement`, data)
                .then(() => {
                    toast.success('Paiement effectué avec succès');

                    router.visit(`/inscriptions/${inscriptionId}`);
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de l'enrgistrement du paiement",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
        finally
        {
            setLoading(false);
        }
    };

    const rechercheEtFiltrage = (periode: string) => {
        try {
            return router.get(
                `/paiements`,
                {
                    periode: periode,
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

    return { createPaiement, rechercheEtFiltrage, loading };
}
