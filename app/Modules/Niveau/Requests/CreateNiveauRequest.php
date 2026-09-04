<?php

namespace App\Modules\Niveau\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateNiveauRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */    
    public function rules(): array
    {
        return [
            "nom" => "required",
            "filiere_id" => ["required", "numeric"]
        ];
    }

    public function messages()
    {
        return [
            "nom.required" => "Le nom de la filiere est requis",
            "filiere_id.required" => "Veuillez choisir une filiere",
        ];
    }
}
