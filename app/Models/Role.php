<?php

namespace App\Models;

use Silber\Bouncer\Database\Role as BouncerRole;

class Role extends BouncerRole
{
    protected function casts(): array
    {
        return [
            'deletable' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'name';
    }
}
