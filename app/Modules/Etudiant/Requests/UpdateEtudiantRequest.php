<?php

namespace App\Modules\Etudiant\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEtudiantRequest extends FormRequest
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
            "ip" => "required|string|min:10",
            "civilite" => "required|string",
            "photo" => "nullable|image|max:2048",
            "genre" => "required|string",
            "nom" => "required|string",
            "prenom" => "required|string",
            "date_naissance" => "required|date",
            "lieu_naissance" => "required|string",
            "nationnalite" => "required|string",
            "statut" => "required|in:Affecté,Naff,Réaffecté,Transfert",
            "email" => "nullable|email",
            "pays_residence" => "nullable|string",
            "etablissement_origine" => "nullable|string",
            "annee_obtention_bac" => "nullable|string",
            "serie_bac" => "nullable|string",
            "numero_table_bac" => "nullable|string",
            "contacts" => "nullable|string",
            "nature_piece" => "nullable|string",
            "numero_piece" => "nullable|string",
            "adresse_geographique" => "nullable|string",
            "matricule_secondaire" => "nullable|string",
            "type_responsable" => "nullable|string",
            "nom_responsable" => "nullable|string",
            "numero_responsable" => "nullable|string",
            "profession_responsable" => "nullable|string"
        ];
    }

    public function messages(): array
    {
        return [
            'ip.required' => "L'identifiant (IP) est obligatoire.",
            'ip.string' => "L'identifiant (IP) doit être une chaîne de caractères.",
            'ip.min' => "L'identifiant (IP) doit contenir au moins :min caractères.",


            'civilite.required' => "La civilité est obligatoire.",
            'civilite.string' => "La civilité doit être une chaîne de caractères.",

            'genre.required' => "Le genre est obligatoire.",
            'genre.string' => "Le genre doit être une chaîne de caractères.",

            'nom.required' => "Le nom de l'étudiant est obligatoire.",
            'nom.string' => "Le nom doit être une chaîne de caractères.",

            'prenom.required' => "Le prénom de l'étudiant est obligatoire.",
            'prenom.string' => "Le prénom doit être une chaîne de caractères.",

            'date_naissance.required' => "La date de naissance est obligatoire.",
            'date_naissance.date' => "La date de naissance doit être une date valide.",

            'lieu_naissance.required' => "Le lieu de naissance est obligatoire.",
            'lieu_naissance.string' => "Le lieu de naissance doit être une chaîne de caractères.",

            'nationnalite.required' => "La nationalité est obligatoire.",
            'nationnalite.string' => "La nationalité doit être une chaîne de caractères.",

            'statut.required' => "Le statut est obligatoire.",
            'statut.in' => "Le statut doit être Affecté, Naff, Réaffecté ou Transfert.",

            'email.email' => "L'email doit être une adresse email valide.",
            'pays_residence.string' => "Le pays de résidence doit être une chaîne de caractères.",

            'etablissement_origine.string' => "L'établissement d'origine doit être une chaîne de caractères.",

            'annee_obtention_bac.string' => "L'année d'obtention du bac doit être une chaîne de caractères.",

            'serie_bac.string' => "La série du bac doit être une chaîne de caractères.",

            'numero_table_bac.string' => "Le numéro de table du bac doit être une chaîne de caractères.",

            'contacts.string' => "Les contacts doivent être une chaîne de caractères.",

            'nature_piece.string' => "La nature de la pièce doit être une chaîne de caractères.",

            'numero_piece.string' => "Le numéro de pièce doit être une chaîne de caractères.",

            'adresse_geographique.string' => "L'adresse géographique doit être une chaîne de caractères.",

            'matricule_secondaire.string' => "Le matricule secondaire doit être une chaîne de caractères.",

            'type_responsable.string' => "Le type de responsable doit être une chaîne de caractères.",

            'nom_responsable.string' => "Le nom du responsable doit être une chaîne de caractères.",

            'numero_responsable.string' => "Le numéro du responsable doit être une chaîne de caractères.",

            'profession_responsable.string' => "La profession du responsable doit être une chaîne de caractères.",
        ];
    }
}
