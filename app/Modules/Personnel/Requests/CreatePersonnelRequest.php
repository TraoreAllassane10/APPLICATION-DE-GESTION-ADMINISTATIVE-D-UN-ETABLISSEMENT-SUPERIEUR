<?php

namespace App\Modules\Personnel\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePersonnelRequest extends FormRequest
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
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'date_naissance' => ['required', 'date', 'before:today'],
            'lieu_naissance' => ['required', 'string', 'max:255'],
            'genre' => ['required', 'string', 'max:255'],
            'nationalite' => ['nullable', 'string', 'max:255'],
            'matricule' => ['nullable', 'string', 'max:255'],
            'fonction' => ['nullable', 'string', 'max:255'],
            'situation_matrimoniale' => ['nullable', 'string', 'max:255'],
            'nombre_enfant' => ['nullable', 'integer', 'min:0'],
            'nombre_enfant_charge' => ['nullable', 'integer', 'min:0'],
            'telephone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:255'],
            'bp' => ['nullable', 'string', 'max:255'],
            'rib' => ['nullable', 'string', 'max:255'],
            'nom_entreprise' => ['nullable', 'string', 'max:255'],
            'proprietaire' => ['nullable'],
            'numero_registre_commerce' => ['nullable', 'string', 'max:255'],

            'formations' => ['nullable', ],
            'experiences' => ['nullable',],
            'documents' => ['nullable', ],
            'files' => ['nullable', ],
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire.',
            'nom.string' => 'Le nom doit être une chaîne de caractères.',
            'nom.max' => 'Le nom ne doit pas dépasser 255 caractères.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'prenom.string' => 'Le prénom doit être une chaîne de caractères.',
            'prenom.max' => 'Le prénom ne doit pas dépasser 255 caractères.',
            'date_naissance.required' => 'La date de naissance est obligatoire.',
            'date_naissance.date' => 'La date de naissance doit être une date valide.',
            'date_naissance.before' => 'La date de naissance doit être antérieure à aujourd\'hui.',
            'lieu_naissance.required' => 'Le lieu de naissance est obligatoire.',
            'lieu_naissance.string' => 'Le lieu de naissance doit être une chaîne de caractères.',
            'lieu_naissance.max' => 'Le lieu de naissance ne doit pas dépasser 255 caractères.',
            'genre.required' => 'Le genre est obligatoire.',
            'genre.string' => 'Le genre doit être une chaîne de caractères.',
            'genre.max' => 'Le genre ne doit pas dépasser 255 caractères.',
            'nationalite.string' => 'La nationalité doit être une chaîne de caractères.',
            'nationalite.max' => 'La nationalité ne doit pas dépasser 255 caractères.',
            'matricule.string' => 'Le matricule doit être une chaîne de caractères.',
            'matricule.max' => 'Le matricule ne doit pas dépasser 255 caractères.',
            'fonction.string' => 'La fonction doit être une chaîne de caractères.',
            'fonction.max' => 'La fonction ne doit pas dépasser 255 caractères.',
            'situation_matrimoniale.string' => 'La situation matrimoniale doit être une chaîne de caractères.',
            'situation_matrimoniale.max' => 'La situation matrimoniale ne doit pas dépasser 255 caractères.',
            'nombre_enfant.integer' => 'Le nombre d\'enfants doit être un entier.',
            'nombre_enfant.min' => 'Le nombre d\'enfants doit être supérieur ou égal à 0.',
            'nombre_enfant_charge.integer' => 'Le nombre d\'enfants à charge doit être un entier.',
            'nombre_enfant_charge.min' => 'Le nombre d\'enfants à charge doit être supérieur ou égal à 0.',
            'telephone.string' => 'Le téléphone doit être une chaîne de caractères.',
            'telephone.max' => 'Le téléphone ne doit pas dépasser 20 caractères.',
            'email.email' => 'L\'adresse e-mail doit être une adresse valide.',
            'email.max' => 'L\'adresse e-mail ne doit pas dépasser 255 caractères.',
            'bp.string' => 'Le BP doit être une chaîne de caractères.',
            'bp.max' => 'Le BP ne doit pas dépasser 255 caractères.',
            'rib.string' => 'Le RIB doit être une chaîne de caractères.',
            'rib.max' => 'Le RIB ne doit pas dépasser 255 caractères.',
            'nom_entreprise.string' => 'Le nom de l\'entreprise doit être une chaîne de caractères.',
            'nom_entreprise.max' => 'Le nom de l\'entreprise ne doit pas dépasser 255 caractères.',
            'proprietaire.boolean' => 'Le champ propriétaire doit être vrai ou faux.',
            'numero_registre_commerce.string' => 'Le numéro de registre de commerce doit être une chaîne de caractères.',
            'numero_registre_commerce.max' => 'Le numéro de registre de commerce ne doit pas dépasser 255 caractères.',
            'formations.array' => 'Le champs formations doit etre un tableau',
            'experiences.array' => 'Le champs experiences doit etre un tableau',
            'documents.array' => 'Le champs documents doit etre un tableau',
        ];
    }
}
