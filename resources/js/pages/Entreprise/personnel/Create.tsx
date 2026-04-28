import { PersonnelForm } from '@/components/Entreprise/Personnel/PersonnelForm';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const Create = () => {

    const handleSubmit = () => {

    }

    return (
        <AppLayout>
            <Head title="Personnel" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/personnels"
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                        personnels
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Nouveau personnel
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Remplissez les informations pour enregistrer un nouveau
                        personnel.
                    </p>
                </div>

                <PersonnelForm onSubmit={handleSubmit} onCancel={() => router.visit('/personnels')} isLoading />
            </div>
        </AppLayout>
    );
};

export default Create;
