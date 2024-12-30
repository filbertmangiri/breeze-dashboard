<?php

namespace App\Http\Controllers\Auth\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\Settings\UpdateProfileRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function edit()
    {
        return inertia('auth/settings/profile');
    }

    public function update(UpdateProfileRequest $request)
    {
        $validated = $request->validated();

        $user = $request->user();

        if (isset($validated['profile_picture'])) {
            $file = str_replace('blob:', '', $validated['profile_picture']);
            $extension = explode('/', mime_content_type($file))[1];

            $content = file_get_contents($file);
            $filename = Str::uuid() . '.' . $extension;

            Storage::disk('public')->put('profile-pictures/' . $filename, $content);

            $current = $user->getRawOriginal('profile_picture');

            if ($current && Storage::disk('public')->exists('profile-pictures/' . $current)) {
                Storage::disk('public')->delete('profile-pictures/' . $current);
            }

            $validated['profile_picture'] = $filename;
        }

        $user->update($validated);
    }
}
