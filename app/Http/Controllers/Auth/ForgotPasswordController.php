<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPassword\StoreForgotPasswordRequest;
use App\Http\Requests\Auth\ForgotPassword\UpdateForgotPasswordRequest;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    public function create()
    {
        return inertia('auth/forgot-password', [
            'status' => session('status'),
        ]);
    }

    public function store(StoreForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink($request->only('email'));

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }

        throw ValidationException::withMessages([
            'root' => [__($status)],
        ]);
    }

    public function edit(Request $request)
    {
        return inertia('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->token,
        ]);
    }

    public function update(UpdateForgotPasswordRequest $request)
    {
        $validated = $request->validated();

        $loggedUser = null;

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($validated, &$loggedUser) {
                $user->forceFill([
                    'password' => Hash::make($validated['password']),
                    'remember_token' => Str::random(60),
                ])->save();

                $loggedUser = $user;

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET && $loggedUser) {
            Auth::login($loggedUser);

            return;
        }

        throw ValidationException::withMessages([
            'root' => [__($status)],
        ]);
    }
}
