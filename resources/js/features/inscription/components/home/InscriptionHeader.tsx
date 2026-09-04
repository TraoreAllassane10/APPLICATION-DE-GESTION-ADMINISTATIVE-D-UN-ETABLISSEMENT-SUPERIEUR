import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react'
import React from 'react'

const InscriptionHeader = ({total_inscription_annee}: {total_inscription_annee: number}) => {
  return (
     <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Gestion des inscriptions
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez les inscriptions des étudiants. ({total_inscription_annee} inscrits)
                        </p>
                    </div>
                    <Link href="/inscriptions/create">
                        <Button className="gap-2 hover:bg-red-700 transition duration-300">
                            <PlusCircle className="h-4 w-4" />
                            Nouvelle inscription
                        </Button>
                    </Link>
                </div>
  )
}

export default InscriptionHeader
