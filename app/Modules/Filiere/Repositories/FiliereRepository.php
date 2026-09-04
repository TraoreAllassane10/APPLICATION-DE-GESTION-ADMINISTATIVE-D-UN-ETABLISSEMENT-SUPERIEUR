<?php

namespace App\Modules\Filiere\Repositories;

use App\Models\Filiere;

class FiliereRepository
{
    public function all()
    {
        return Filiere::latest()->get();
    }

    public function create(array $data)
    {
        return Filiere::create($data);
    }

    public function update(Filiere $filiere, array $data)
    {
        return $filiere->update($data);
    }

    public function delete(Filiere $filiere)
    {
        return $filiere->delete();
    }
}
