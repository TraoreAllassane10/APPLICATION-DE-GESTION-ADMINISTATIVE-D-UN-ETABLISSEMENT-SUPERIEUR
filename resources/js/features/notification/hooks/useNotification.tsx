import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { EtudiantCreeNotification } from '../types/notification.types';

export default function useNotification() {
    const [derniereNotifications, setDernieresNotifications] = useState<
        EtudiantCreeNotification[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getDernieresNotifications = async () => {
        try {
            setLoading(true);

            const response = await axios.get('notifications/dernieres');

            if (response.data.success) {
                setDernieresNotifications(response.data.data);
            }
        } catch (error) {
            console.log(
                'Erreur lors de la recuperation des dernieres notifications',
                error,
            );
        } finally {
            setLoading(false);
        }
    };

    const marquerCommeLue = async (id: string) => {
        try {
            setLoading(true);

            const response = await axios.put(
                `notifications/${id}/marquer-comme-lue`,
            );

            if (response.data.success) {
                router.reload();
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const marquerToutCommeLue = async () => {
        try {
            setLoading(true);

            const response = await axios.put(
                `notifications/marquer-tout-comme-lue`,
            );

            if (response.data.success) {
                router.reload();
            }
        } catch (error) {
        } finally {
            setLoading(true);
        }
    };

    const deleteNotification = async (id: string) => {
        try {
            setLoading(true);

            const response = await axios.delete(`notifications/${id}/delete`);

            if (response.data.success) {
                toast.success(response.data.message);
                router.reload();
            }
        } catch (error) {
        } finally {
            setLoading(true);
        }
    };

    const clearNotification = async () => {
        try {
            setLoading(true);

            const response = await axios.delete(`notifications/clear`);

            if (response.data.success) {
                toast.success(response.data.message);
                router.reload();
            }
        } catch (error) {
        } finally {
            setLoading(true);
        }
    };

    return {
        getDernieresNotifications,
        derniereNotifications,
        marquerCommeLue,
        marquerToutCommeLue,
        deleteNotification,
        clearNotification,
        loading
    };
}
