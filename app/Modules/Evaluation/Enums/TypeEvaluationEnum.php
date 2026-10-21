<?php

namespace App\Modules\Evaluation\Enums;

enum TypeEvaluationEnum: string
{
    case DEVOIR = "Devoir";
    case INTERROGATION = "Interrogation";
    case EXAMEN = "Examen";
    case AUTRES = "Autres";
}
