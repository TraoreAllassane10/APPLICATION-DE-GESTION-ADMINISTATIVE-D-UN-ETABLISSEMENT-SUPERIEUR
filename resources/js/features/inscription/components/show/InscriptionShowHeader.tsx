import { Card, CardContent } from '@/components/ui/card'
import Avatar from '@/features/etudiant/components/Avatar'
import StatutInscriptionBadge from '../StatutInscriptionBadge'
import { Inscription } from '../../types/inscription.types'
import { Badge } from '@/components/ui/badge'

const InscriptionShowHeader = ({inscription} : {inscription: Inscription}) => {
  return (
    <Card className="overflow-hidden shadow-sm">
                    <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40" />
                    <CardContent className="p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Avatar
                                photo={inscription.etudiant.photo as string}
                                nom={inscription.etudiant?.nom}
                                prenom={inscription.etudiant?.prenom}
                                genre="ee"
                            />

                            {/* Infos */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                                    <h1 className="text-xl font-bold tracking-tight">
                                        {inscription.etudiant?.nom}{' '}
                                        {inscription.etudiant?.prenom}
                                    </h1>
                                    {inscription.status && (
                                        <StatutInscriptionBadge
                                            statut={
                                                inscription.status === 'Bon'
                                                    ? 'En cours'
                                                    : inscription.status
                                            }
                                        />
                                    )}

                                    {inscription.niveaux?.map((niveau) => (
                                        <Badge
                                            variant="secondary"
                                            className="font-bold"
                                        >
                                            {niveau.nom}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {inscription.etudiant?.ip} ·{' '}
                                    {inscription.niveaux &&
                                        inscription.niveaux[0].filiere.nom}{' '}
                                    · {inscription.annee?.libelle}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
  )
}

export default InscriptionShowHeader
