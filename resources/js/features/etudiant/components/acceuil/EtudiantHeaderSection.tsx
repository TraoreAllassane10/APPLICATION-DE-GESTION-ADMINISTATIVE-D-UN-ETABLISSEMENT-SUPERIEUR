import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { PlusCircle } from 'lucide-react'
import React from 'react'

function EtudiantHeaderSection() {
  return (
     <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Gestion des étudiants
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez le fichier des étudiants enregistrés.
                        </p>
                    </div>
                    <Link href="/etudiants/create">
                        <Button className="gap-2 hover:bg-red-700 transition duration-300">
                            <PlusCircle className="h-4 w-4" />
                            Nouvel étudiant
                        </Button>
                    </Link>
                </div>
  )
}

export default EtudiantHeaderSection