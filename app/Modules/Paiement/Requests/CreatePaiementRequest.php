<?php

namespace App\Modules\Paiement\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreatePaiementRequest extends FormRequest
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
            "reference" => ["required"],
            "date_paiement" => ["required"],
            "methode_paiement" => ['required', 'string'],
            "montant" => "required|numeric"
        ];
    }
}
