<?php

use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\SessionController;
use App\Http\Controllers\Auth\Settings\AccountController;
use App\Http\Controllers\Auth\Settings\ChangePasswordController;
use App\Http\Controllers\Auth\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [SessionController::class, 'create'])->name('login');
    Route::post('/login', [SessionController::class, 'store']);

    Route::get('/forgot-password', [ForgotPasswordController::class, 'create']);
    Route::post('/forgot-password', [ForgotPasswordController::class, 'store']);
    Route::get('/reset-password', [ForgotPasswordController::class, 'edit'])->name('password.reset');
    Route::patch('/reset-password', [ForgotPasswordController::class, 'update']);
});

Route::middleware('auth')->group(function () {
    Route::delete('/logout', [SessionController::class, 'destroy']);

    Route::prefix('/settings')->group(function () {
        Route::redirect('/', '/settings/profile');
        Route::get('/profile', [ProfileController::class, 'edit']);
        Route::post('/profile', [ProfileController::class, 'update']);

        Route::get('/account', [AccountController::class, 'edit']);
        Route::put('/account', [AccountController::class, 'update']);

        Route::get('/change-password', [ChangePasswordController::class, 'edit']);
        Route::patch('/change-password', [ChangePasswordController::class, 'update']);
    });
});
