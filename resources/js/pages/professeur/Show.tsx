import ModalConfirmationSuppression from '@/components/modals/ModalConfirmationSuppression';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useEnseignement from '@/features/enseignement/hooks/useEnseignement';
import EditEnseignementModal from '@/features/professeur/components/EditEnseignementModal';
import { Professeur } from '@/features/professeur/types/professeur.types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Book,
    Calendar,
    Edit,
    Globe,
    GraduationCap,
    Hash,
    Phone,
    Presentation,
    Timer,
    Trash2,
    User,
    User2,
} from 'lucide-react';
import { useState } from 'react';

const InfoLigne = ({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | null | undefined;
}) => {
    if (!value) return null;

    return (
        <div className="flex items-start gap-3 border-b py-2.5 last:border-0">
            <div className="mt-0.5 shrink-0 rounded-md bg-muted p-1.5">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="mt-0.5 text-sm font-medium break-words">
                    {value}
                </p>
            </div>
        </div>
    );
};

function Show() {
    const { professeur } = usePage<{ professeur: Professeur }>().props;
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [enseignementId, setEnseignementId] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { deleteEnseignement, loading } = useEnseignement();

    const handleModal = (id: number) => {
        setOpenEdit(true);
        setEnseignementId(id);
    };

    const handleDelete = async () => {
        if (selectedId) {
            await deleteEnseignement(selectedId);
            setSelectedId(null);
        }

        router.reload();
    };

    return (
        <AppLayout>
            <Head title="Enseignant" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/professeur"
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                        enseignants
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Profil de l'enseignant
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Visualisez les informations de l'enseignant.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="font-semibold text-muted-foreground">
                            Identité
                        </CardHeader>
                        <CardContent>
                            <InfoLigne
                                icon={Hash}
                                label="Matricule"
                                value={professeur.matricule}
                            />
                            <InfoLigne
                                icon={User}
                                label="Nom et Prenom"
                                value={professeur.nom_prenom}
                            />
                            <InfoLigne
                                icon={User2}
                                label="Sexe"
                                value={professeur.sexe}
                            />
                            <InfoLigne
                                icon={Calendar}
                                label="Date de naissance"
                                value={new Date(
                                    professeur.date_naissance,
                                ).toLocaleDateString('fr-FR')}
                            />
                            <InfoLigne
                                icon={Globe}
                                label="Pays"
                                value={professeur.pays}
                            />
                            <InfoLigne
                                icon={GraduationCap}
                                label="Spécialité"
                                value={professeur.specialite}
                            />
                            <InfoLigne
                                icon={Phone}
                                label="Telephone"
                                value={professeur.telephone}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="font-semibold text-muted-foreground">
                            Fonction
                        </CardHeader>
                        <CardContent>
                            <InfoLigne
                                icon={GraduationCap}
                                label="Dernier diplôme"
                                value={
                                    professeur.annee_academiques[0].pivot
                                        .diplome
                                }
                            />
                            <InfoLigne
                                icon={GraduationCap}
                                label="Grade"
                                value={
                                    professeur.annee_academiques[0].pivot.grade
                                }
                            />
                            <InfoLigne
                                icon={Hash}
                                label="Statut"
                                value={
                                    professeur.annee_academiques[0].pivot.statut
                                }
                            />
                            <InfoLigne
                                icon={Calendar}
                                label="Année de prise de fonction"
                                value={
                                    professeur.annee_academiques[0].pivot
                                        .annee_prise_fonction
                                }
                            />
                            <InfoLigne
                                icon={Book}
                                label="Formation continue"
                                value={
                                    professeur.annee_academiques[0].pivot
                                        .formation_continue
                                }
                            />
                            <InfoLigne
                                icon={Timer}
                                label="Nombre d'heure de cours prévues"
                                value={
                                    professeur.annee_academiques[0].pivot
                                        .nombre_heure_cours_prevue
                                }
                            />
                            <InfoLigne
                                icon={Timer}
                                label="Nombre d'heure de cours réalisées"
                                value={
                                    professeur.annee_academiques[0].pivot
                                        .nombre_heure_cours_realise
                                }
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="font-semibold text-muted-foreground">
                            Pedagogie
                        </CardHeader>
                        <CardContent>
                            {professeur.enseignements.length > 0 ? (
                                professeur.enseignements?.map((ens, index) => {
                                    const classes = ens.niveaux.map(
                                        (classe) => classe.nom,
                                    );

                                    let stringNiveauxEnseignes = '';

                                    classes.forEach((value) => {
                                        stringNiveauxEnseignes += value + ' ';
                                    });

                                    return (
                                        <div className="flex items-start gap-3 border-b py-2.5 last:border-0">
                                            <div className="mt-0.5 shrink-0 rounded-md bg-muted p-1.5">
                                                <Presentation className="h-3.5 w-3.5 text-muted-foreground" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                                                    Enseignement N°{index + 1}
                                                </p>
                                                <p className="mt-0.5 text-sm font-medium break-words">
                                                    {ens.cours.nom} :{' '}
                                                    {stringNiveauxEnseignes}
                                                </p>
                                            </div>

                                            <div className="space-x-2">
                                                <Button
                                                    variant={'outline'}
                                                    size={'sm'}
                                                    onClick={() =>
                                                        handleModal(ens.id)
                                                    }
                                                >
                                                    <Edit />
                                                </Button>

                                                <Button
                                                    variant={'outline'}
                                                    size={'sm'}
                                                    disabled={loading}
                                                    onClick={() =>
                                                        setSelectedId(ens.id)
                                                    }
                                                >
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-sm text-muted-foreground">
                                    <p>
                                        Aucun cours n'est attributé à cet
                                        enseignant
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {openEdit && (
                        <EditEnseignementModal
                            enseignementId={enseignementId}
                            onClose={() => setOpenEdit(false)}
                        />
                    )}

                    <ModalConfirmationSuppression
                        title="Supprimer un enseignement ?"
                        content=" Cette action est irréversible. Les données liées à
                            cet enseignements (evaluations, notes, assiduités.) pourraient
                            également être affectées."
                        selectedId={selectedId}
                        handleDelete={handleDelete}
                        setSelectedId={setSelectedId}
                    />
                </div>
            </div>
        </AppLayout>
    );
}

export default Show;
