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
            "etudiant_ip" => "required|exists:etudiants,ip",
            "annee_id" => "required|exists:annee_universitaires,id",
            "niveaux" => "required|array",
            "taux_reduction" => "required|numeric",
            "type_inscription" => "required"
        ];
    }

    public function messages(): array
    {
        return [
            'etudiant_ip.required' => 'L\'adresse IP de l\'étudiant est requise.',
            'etudiant_ip.exists' => 'L\'adresse IP de l\'étudiant n\'existe pas.',
            'annee_id.required' => 'L\'année universitaire est requise.',
            'annee_id.exists' => 'L\'année universitaire sélectionnée n\'existe pas.',
            'niveaux.required' => 'Les niveaux sont requis.',
            'niveaux.array' => 'Les niveaux doivent être un tableau.',
            'taux_reduction.required' => 'Le taux de réduction est requis.',
            'taux_reduction.number' => 'Le taux de réduction doit être un nombre.',
            'type_inscription.required' => 'Le type d\'inscription est requis.',
        ];
    }
}
