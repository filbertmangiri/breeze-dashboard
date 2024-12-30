<?php

namespace App\Http\Controllers;

use App\Facades\DataTable;
use App\Http\Requests\QueryParamsRequest;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Models\Role;
use Illuminate\Validation\ValidationException;
use Silber\Bouncer\BouncerFacade;

class RoleController extends Controller
{
    public function index(QueryParamsRequest $request)
    {
        $sort = str_replace(
            ['name'],
            ['name'],
            request()->query('col')
        );

        $roles = DataTable::query(Role::withCount('abilities'))
            ->searchable(['title'])
            ->applySort($sort)
            ->allowedSorts(['title'])
            ->make();

        return inertia('roles/index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        return inertia('roles/create', [
            'abilities' => BouncerFacade::ability()->all(),
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        $validated = $request->validated();

        $role = BouncerFacade::role()->create($validated);

        $role->abilities()->sync($validated['abilities']);
    }

    public function show(Role $role)
    {
        return inertia('roles/show', [
            'role' => $role,
            'roles' => BouncerFacade::role()->all(),
            'roleAbilities' => $role ? $role->getAbilities() : [],
            'abilities' => $role ? BouncerFacade::ability()->all() : [],
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role)
    {
        $validated = $request->validated();

        $role->update($validated);

        $role->abilities()->sync($validated['abilities']);

        return redirect('/roles/' . $role->name);
    }

    public function destroy(Role $role)
    {
        if (!$role->deletable) {
            throw ValidationException::withMessages([
                'root' => 'This role cannot be deleted.',
            ]);
        }

        $role->delete();

        return redirect('/roles');
    }
}
