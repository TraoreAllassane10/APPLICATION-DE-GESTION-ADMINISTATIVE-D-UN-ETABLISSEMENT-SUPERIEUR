<?php

namespace App\Modules\Bulletin\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetBulletinsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'classeId' => ['required', 'integer', 'exists:niveaux,id'],
            'periodeId' => ['required', 'integer', 'exists:periode_academiques,id'],
        ];
    }

    public function messages(): array
    {
        return [
            'classeId.required' => 'La classe est obligatoire.',
            'classeId.integer' => 'L\'identifiant de la classe doit être un entier.',
            'classeId.exists' => 'La classe sélectionnée n\'existe pas.',
            'periodeId.required' => 'La période académique est obligatoire.',
            'periodeId.integer' => 'L\'identifiant de la période doit être un entier.',
            'periodeId.exists' => 'La période académique sélectionnée n\'existe pas.',
        ];
    }
}
