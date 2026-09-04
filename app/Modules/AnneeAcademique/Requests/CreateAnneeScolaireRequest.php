<?php

namespace App\Modules\AnneeAcademique\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateAnneeScolaireRequest extends FormRequest
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
            "libelle" => [
                "required",
            ],
            "date_debut" => [
                'required',
                "before:date_fin"
            ],
            "date_fin" => [
                'required',
                "after:date_debut"
            ]
        ];
    }

    public function messages() {
        return [
            "libelle.required" => "le libellé est requis",
            "date_debut.required" => "la date de debut est requis",
             "date_fin.required" => "la date de debut est requis",
               "before.required" => "la date de debut doit précédé la date de fin",
             "after.required" => "la date de debut doit suivre la date de debut",
        ];
    }
}
