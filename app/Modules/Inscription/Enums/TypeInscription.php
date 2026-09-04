<?php

namespace App\Modules\Inscription\Enums;

enum TypeInscription: string
{
    case NOUVELLE = "Nouvelle";
    case REDOUBLEMENT = "Redoublement";
    case TRANSFERT = "Transfert";
}
