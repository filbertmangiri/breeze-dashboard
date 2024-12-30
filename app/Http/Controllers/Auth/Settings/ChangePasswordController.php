<?php

namespace App\Http\Controllers\Auth\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Settings\ChangePasswordRequest;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    public function edit()
    {
        return inertia('auth/settings/change-password');
    }

    public function update(ChangePasswordRequest $request)
    {
        $validated = $request->validated();

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);
    }
}
