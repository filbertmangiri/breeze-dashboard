<?php

namespace App\Providers;

use App\DataTable\DataTable;
use Illuminate\Support\ServiceProvider;

class DataTableServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(DataTable::class, function () {
            return new DataTable();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
