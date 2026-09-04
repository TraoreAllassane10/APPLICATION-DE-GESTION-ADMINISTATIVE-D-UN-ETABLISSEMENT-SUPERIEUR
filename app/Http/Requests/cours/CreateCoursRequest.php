<?php

namespace App\Http\Requests\cours;

use Illuminate\Foundation\Http\FormRequest;

class CreateCoursRequest extends FormRequest
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
            "nom" => "required",
            "type_enseignement" => "required"
        ];
    }

    public function messages()
    {
        return [
            "nom.required" => "Le nom du cours est requis",
            "type_enseignement.required" => "Le type de l'enseignement est requis"
        ];
    }
}
