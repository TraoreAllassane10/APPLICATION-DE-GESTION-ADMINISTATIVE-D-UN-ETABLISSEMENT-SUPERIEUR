<?php

namespace App\Modules\Inscription\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateInscriptionRequest extends FormRequest
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
            'etudiant_ip'       => 'required|exists:etudiants,ip',
            'annee_id'          => 'required|exists:annee_universitaires,id',
            'niveaux'           => 'required|array',
            'type_inscription'  => 'required',

            // Les deux champs sont optionnels mais mutuellement exclusifs.
            // La règle `prohibited_if` garantit que le frontend ne peut pas bypasser.
            'taux_reduction'    => [
                'nullable',
                'numeric',
                'min:0',
                'max:100',
                'prohibited_if:montant_reduction,true',
            ],
            'montant_reduction' => [
                'nullable',
                'numeric',
                'min:0',
                'prohibited_if:taux_reduction,true',
            ],
        ];
    }

    /**
     * Prépare les données avant la validation :
     * convertit les chaînes vides en null pour les champs de réduction.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'taux_reduction'    => $this->taux_reduction === '' ? null : $this->taux_reduction,
            'montant_reduction' => $this->montant_reduction === '' ? null : $this->montant_reduction,
        ]);
    }

    public function messages(): array
    {
        return [
            'etudiant_ip.required'          => "L'adresse IP de l'étudiant est requise.",
            'etudiant_ip.exists'            => "L'adresse IP de l'étudiant n'existe pas.",
            'annee_id.required'             => "L'année universitaire est requise.",
            'annee_id.exists'               => "L'année universitaire sélectionnée n'existe pas.",
            'niveaux.required'              => 'Les niveaux sont requis.',
            'niveaux.array'                 => 'Les niveaux doivent être un tableau.',
            'type_inscription.required'     => "Le type d'inscription est requis.",
            'taux_reduction.numeric'        => 'Le taux de réduction doit être un nombre.',
            'taux_reduction.min'            => 'Le taux de réduction doit être au moins 0.',
            'taux_reduction.max'            => 'Le taux de réduction ne peut pas dépasser 100.',
            'taux_reduction.prohibited_if'  => 'Vous ne pouvez pas saisir à la fois un taux et un montant de réduction.',
            'montant_reduction.numeric'     => 'Le montant de réduction doit être un nombre.',
            'montant_reduction.min'         => 'Le montant de réduction doit être positif ou nul.',
            'montant_reduction.prohibited_if' => 'Vous ne pouvez pas saisir à la fois un taux et un montant de réduction.',
        ];
    }
}
