<?php

namespace App\Http\Controllers\Auth\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Settings\UpdateAccountRequest;

class AccountController extends Controller
{
    public function edit()
    {
        return inertia('auth/settings/account');
    }

    public function update(UpdateAccountRequest $request)
    {
        $validated = $request->validated();

        $request->user()->update($validated);
    }
}
