<?php

namespace App\Modules\Scolarite\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateScolariteRequest extends FormRequest
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
            "annee_id" => ["required","exists:annee_universitaires,id"],
            "niveau_id" => ["required","exists:niveaux,id"],
            "type" => ["required"],
            "montant" => ["required", "numeric"]
        ];
    }

    public function messages(): array
    {
        return [
            "annee_id.required" => "L'année universitaire est obligatoire.",
            "annee_id.exists" => "L'année universitaire sélectionnée n'existe pas.",
            "niveau_id.required" => "Le niveau est obligatoire.",
            "niveau_id.exists" => "Le niveau sélectionné n'existe pas.",
            "type.required" => "Le type de scolarité est obligatoire.",
            "type.in" => "Le type de scolarité sélectionné est invalide.",
            "montant.required" => "Le montant est obligatoire.",
            "montant.numeric" => "Le montant doit être un nombre.",
        ];
    }
}
