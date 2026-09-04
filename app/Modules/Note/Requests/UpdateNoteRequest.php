<?php

namespace App\Modules\Note\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNoteRequest extends FormRequest
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
            'evaluation_id' => ['required', 'integer', 'exists:evaluations,id'],
            'notes' => ['required', 'array', 'min:1'],
            'notes.*' => ['required', 'array'],
            'notes.*.inscription_id' => ['required', 'integer', 'exists:inscriptions,id'],
            'notes.*.valeur' => ['nullable', 'numeric', 'min:0', 'max:20'],
            'notes.*.est_absent' => ['required', 'boolean'],
        ];
    }

    /**
     * Get the validation error messages.
     */
    public function messages(): array
    {
        return [
            'evaluation_id.required' => "L'évaluation est obligatoire.",
            'evaluation_id.integer' => "L'évaluation doit être un entier.",
            'evaluation_id.exists' => "L'évaluation sélectionnée n'existe pas.",

            'notes.required' => 'Les notes sont obligatoires.',
            'notes.array' => 'Les notes doivent être un tableau.',
            'notes.min' => 'Au moins une note doit être renseignée.',
            'notes.*.required' => 'Chaque note est obligatoire.',
            'notes.*.array' => 'Chaque note doit être un tableau.',

            'notes.*.inscription_id.required' => "L'inscription est obligatoire.",
            'notes.*.inscription_id.integer' => "L'inscription doit être un entier.",
            'notes.*.inscription_id.exists' => "L'inscription sélectionnée n'existe pas.",

            // 'notes.*.valeur.required' => 'La valeur de la note est obligatoire.',
            'notes.*.valeur.numeric' => 'La valeur de la note doit être numérique.',
            'notes.*.valeur.min' => 'La valeur de la note doit être au moins égale à 0.',
            'notes.*.valeur.max' => 'La valeur de la note ne peut pas dépasser 20.',

            'notes.*.est_absent.required' => "Le statut d'absence est obligatoire.",
            'notes.*.est_absent.boolean' => "Le statut d'absence doit être un booléen.",
        ];
    }
}
