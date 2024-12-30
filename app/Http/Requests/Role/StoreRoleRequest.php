<?php

namespace App\Http\Requests\Role;

use App\Models\Ability;
use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique(Role::class)],
            'title' => ['required', 'string', 'max:255'],
            'abilities' => ['nullable', 'array'],
            'abilities.*' => ['required', Rule::exists(Ability::class, 'id')],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'url name',
            'title' => 'name',
        ];
    }
}
