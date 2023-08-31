<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Symfony\Contracts\Service\Attribute\Required;

class StoreArticleRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "libelle" => 'required',
            "prix" => 'required',
            "stock" => 'required',
            "categorie_libelle" => 'required',
            // "photo" => 'required',
            "fournisseurs" => 'required|Array'
        ];
    }

    public function messages(): array
    {
        return [
            "libelle.required" => "Le libellé est requis.",
            "prix.required" => "Le prix est requis.",
            "stock.required" => "Le stock est requis.",
            "categorie.required" => "La catégorie est requise.",
            // "photo.required" => "La photo est requise.",
            "fournisseur.required" => "Le fournisseur est requise."
        ];
    }

}
