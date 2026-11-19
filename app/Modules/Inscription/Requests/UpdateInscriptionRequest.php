<?php

namespace App\Modules\Inscription\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInscriptionRequest extends FormRequest
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
}
