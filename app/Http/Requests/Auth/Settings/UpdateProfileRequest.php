<?php

namespace App\Http\Requests\Auth\Settings;

use App\Enums\Gender;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateProfileRequest extends FormRequest
{
    public function prepareForValidation(): void
    {
        if ($this->has('profile_picture') && gettype($this->profile_picture) == 'string') {
            $this->offsetUnset('profile_picture');
        }
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', Rule::unique(User::class)->ignore($this->user()->id)],
            'gender' => ['required', 'string', Rule::in(Gender::getValues())],
            'description' => ['nullable', 'string', 'min:5', 'max:200'],
            'profile_picture' => ['nullable', File::image()->types(['image/jpeg', 'image/png'])->max('2mb')],
        ];
    }
}
