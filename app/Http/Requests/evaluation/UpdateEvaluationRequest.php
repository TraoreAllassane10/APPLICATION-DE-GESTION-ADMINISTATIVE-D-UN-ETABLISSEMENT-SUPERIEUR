<?php

namespace App\Http\Requests\evaluation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEvaluationRequest extends FormRequest
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
            'type' => ['required', 'string', 'max:255'],
            'titre' => ['required', 'string', 'max:255'],
            'date' => ['required'],
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
            'type.required' => 'Le type est obligatoire.',
            'type.string' => 'Le type doit être une chaîne de caractères.',
            'type.max' => 'Le type ne peut pas dépasser 255 caractères.',
            'titre.required' => 'Le titre est obligatoire.',
            'titre.string' => 'Le titre doit être une chaîne de caractères.',
            'titre.max' => 'Le titre ne peut pas dépasser 255 caractères.',
            'date.required' => 'La date est obligatoire.',
            'note_maximale.required' => 'La note maximale est obligatoire.',
            'note_maximale.integer' => 'La note maximale doit être un entier.',
            'note_maximale.min' => 'La note maximale doit être au moins égale à 1.',
            'coefficient.required' => 'Le coefficient est obligatoire.',
            'coefficient.integer' => 'Le coefficient doit être un entier.',
            'coefficient.min' => 'Le coefficient doit être au moins égal à 1.',
        ];
    }
}
