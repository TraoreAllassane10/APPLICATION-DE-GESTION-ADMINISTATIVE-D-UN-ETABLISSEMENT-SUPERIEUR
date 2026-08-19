<?php

namespace App\Http\Requests\evaluation;

use Illuminate\Foundation\Http\FormRequest;

class CreateEvaluationRequest extends FormRequest
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
            'enseignement_id' => ['required', 'integer', 'exists:enseignements,id'],
            'periode_academique_id' => ['required', 'integer', 'exists:periode_academiques,id'],
            'type' => ['required', 'string', 'max:255'],
            'titre' => ['required', 'string', 'max:255'],
            'date' => ['required', ],
            'note_maximale' => ['required', 'integer', 'min:1'],
            'coefficient' => ['required', 'integer', 'min:1'],
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     */
    public function messages(): array
    {
        return [
            'enseignement_id.required' => "L'enseignement est obligatoire.",
            'enseignement_id.integer' => "L'enseignement doit être un entier.",
            'enseignement_id.exists' => "L'enseignement sélectionné n'existe pas.",
            'periode_academique_id.required' => 'La période académique est obligatoire.',
            'periode_academique_id.integer' => 'La période académique doit être un entier.',
            'periode_academique_id.exists' => "La période académique sélectionnée n'existe pas.",
            'type.required' => "Le type d'évaluation est obligatoire.",
            'type.string' => "Le type d'évaluation doit être une chaîne de caractères.",
            'type.max' => "Le type d'évaluation ne doit pas dépasser 255 caractères.",
            'titre.required' => "Le titre de l'évaluation est obligatoire.",
            'titre.string' => "Le titre de l'évaluation doit être une chaîne de caractères.",
            'titre.max' => "Le titre de l'évaluation ne doit pas dépasser 255 caractères.",
            'date.required' => "La date de l'évaluation est obligatoire.",
            'date.date' => "La date de l'évaluation doit être une date valide.",
            'note_maximale.required' => 'La note maximale est obligatoire.',
            'note_maximale.integer' => 'La note maximale doit être un entier.',
            'note_maximale.min' => 'La note maximale doit être au moins égale à 1.',
            'coefficient.required' => 'Le coefficient est obligatoire.',
            'coefficient.integer' => 'Le coefficient doit être un entier.',
            'coefficient.min' => 'Le coefficient doit être au moins égal à 1.',
        ];
    }
}
