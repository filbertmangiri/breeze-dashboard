<?php

namespace App\Http\Requests\Auth\Settings;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAccountRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', Rule::unique(User::class)->ignore($this->user()->id)],
            'username' => ['required', 'string', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }
}
