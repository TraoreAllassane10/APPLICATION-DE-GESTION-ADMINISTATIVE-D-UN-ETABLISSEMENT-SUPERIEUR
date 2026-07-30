<?php

namespace App\Http\Controllers\Administrateur;

use App\Enums\RoleUser;
use App\Http\Controllers\Controller;
use App\Models\AnneeUniversitaire;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $utilisateurs = User::latest()->get();
        return Inertia::render('utilisateur/Index', [
            "utilisateurs" => $utilisateurs,
            "roles" => RoleUser::cases()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => ['required', 'string', 'max:255'],
            'role' => 'required',
            'string'
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            "annee_active" => AnneeUniversitaire::latest()->first()->id
        ]);

        if ($user) {

            $role = Role::where("name", $validated['role'])->get();

            $user->assignRole($role);

            return response()->json([
                "success" => true
            ]);
        }
    }

    public function delete(User $utilisateur)
    {
        try {
            $utilisateurSupprime = $utilisateur->delete();

            if ($utilisateurSupprime) {
                return response()->json([
                    "success" => true
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                "success" => false
            ]);
        }
    }
}
