<?php

namespace App\Enums;

enum RoleUser: string
{
    case ADMINISTRATEUR = "Administrateur";
    case INSPECTEUR_PEDAGOGIQUE = "Inspecteur pedagogique";
    case SCOLARITE = "Secrétaire de scolarité";
    case PROFESSEUR = "Professeur";
}
