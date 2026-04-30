<?php

namespace Database\Seeders;

use App\Enums\RoleUser;
use App\Models\Etudiant;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // $this->call(UserRoleSeeder::class);

        // Etudiant::factory(50)->create();
        // User::factory(10)->create();

        // $roleAdmin = Role::where("name", RoleUser::ADMINISTRATEUR->value)->get();
        // $rolePedagogique = Role::where("name", RoleUser::INSPECTEUR_PEDAGOGIQUE->value)->get();
        // $roleEnseignant = Role::where("name", RoleUser::ENSEIGNANT->value)->get();
        // $roleScolarite = Role::where("name", RoleUser::SCOLARITE->value)->get();

        // $userAdmin = User::firstOrCreate(
        //     ['email' => 'admin@gmail.com'],
        //     [
        //         'name' => 'Admin',
        //         'password' => 'admin@gmail.com',
        //         'email_verified_at' => now(),
        //     ]
        // );

        // $userAdmin->assignRole([$roleAdmin, $rolePedagogique, $roleScolarite]);

        // $userInspecteurPedagogique = User::firstOrCreate(
        //     ['email' => 'peda@gmail.com'],
        //     [
        //         'name' => 'Inspecteur Pedagogique',
        //         'password' => 'peda@gmail.com',
        //         'email_verified_at' => now(),
        //     ]
        // );
        // $userInspecteurPedagogique->assignRole($rolePedagogique);

        // $userScolarite = User::firstOrCreate(
        //     ['email' => 'scolarite@gmail.com'],
        //     [
        //         'name' => 'Scolarite',
        //         'password' => 'scolarite@gmail.com',
        //         'email_verified_at' => now(),
        //     ]
        // );
        // $userScolarite->assignRole($roleScolarite);

        // $userEnseignant = User::firstOrCreate(
        //     ['email' => 'enseignant@gmail.com'],
        //     [
        //         'name' => 'Enseignant',
        //         'password' => 'enseignant@gmail.com',
        //         'email_verified_at' => now(),
        //     ]
        // );
        // $userEnseignant->assignRole($roleEnseignant);
    }
}
