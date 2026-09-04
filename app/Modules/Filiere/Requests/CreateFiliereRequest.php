<?php

namespace App\Modules\Filiere\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFiliereRequest extends FormRequest
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
            "nom" => "required"
        ];
    }

    public function messages()
    {
        return [
            "nom.required" => "Le nom de la filiere est requis"
        ];
    }
}
