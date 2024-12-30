<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Silber\Bouncer\BouncerFacade;

class BouncerServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        BouncerFacade::useRoleModel(\App\Models\Role::class);
        BouncerFacade::useAbilityModel(\App\Models\Ability::class);
    }
}
