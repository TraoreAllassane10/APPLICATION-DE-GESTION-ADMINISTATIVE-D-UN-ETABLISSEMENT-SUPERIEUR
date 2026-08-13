<?php

namespace App\Http\Requests\professeur;

use Illuminate\Foundation\Http\FormRequest;

class CreateProfesseurRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "option" => "required|numeric",
            "matricule" => ["required", "string"],
            "nom_prenom" => ["required", "string"],
            "sexe" => ["required", "string"],
            "date_naissance" => ["required", "string"],
            "pays" => ["required", "string"],
            "specialite" => ["required", "string"],
            "telephone" => ["nullable", "string"],
            "diplome" => ["required", "string"],
            "grade" => ["required", "numeric"],
            "statut" => ["required", "numeric"],
            "annee_prise_fonction" => ["required", "numeric"],
            "formation_continue" => ["nullable", "numeric"],
            "nombre_heure_cours_prevue" => ["nullable", "numeric"],
            "nombre_heure_cours_realise" => ["nullable", "numeric"],
            "cours_enseignes" => ["nullable", "array"],
            "classes" => ["nullable", "array"]
        ];
    }


    public function messages()
    {
        return [
            "option.required" => "L'option est obligatoire.",
            "option.numeric" => "L'option doit etre un nombre en entier.",
            "matricule.required" => "Le matricule est obligatoire.",
            "matricule.string" => "Le matricule doit être une chaîne de caractères.",
            "nom_prenom.required" => "Le nom et prénom sont obligatoires.",
            "nom_prenom.string" => "Le nom et prénom doivent être une chaîne de caractères.",
            "sexe.required" => "Le sexe est obligatoire.",
            "sexe.string" => "Le sexe doit être une chaîne de caractères.",
            "date_naissance.required" => "La date de naissance est obligatoire.",
            "date_naissance.string" => "La date de naissance doit être une chaîne de caractères.",
            "pays.required" => "Le pays est obligatoire.",
            "pays.string" => "Le pays doit être une chaîne de caractères.",
            "specialite.required" => "La spécialité est obligatoire.",
            "specialite.string" => "La spécialité doit être une chaîne de caractères.",
            "telephone.string" => "Le téléphone doit être une chaîne de caractères.",
            "diplome.required" => "Le diplôme est obligatoire.",
            "diplome.string" => "Le diplôme doit être une chaîne de caractères.",
            "grade.required" => "Le grade est obligatoire.",
            "grade.numeric" => "Le grade doit être un nombre.",
            "statut.required" => "Le statut est obligatoire.",
            "statut.numeric" => "Le statut doit être un nombre.",
            "annee_prise_fonction.required" => "L'année de prise de fonction est obligatoire.",
            "annee_prise_fonction.numeric" => "L'année de prise de fonction doit être un nombre.",
            "formation_continue.numeric" => "La formation continue doit être un nombre.",
            "nombre_heure_cours_prevue.numeric" => "Le nombre d'heures de cours prévues doit être un nombre.",
            "nombre_heure_cours_realise.numeric" => "Le nombre d'heures de cours réalisées doit être un nombre.",
        ];
    }
}
