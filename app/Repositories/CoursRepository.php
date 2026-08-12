<?php

namespace App\Repositories;

use App\Models\Cours;

class CoursRepository
{
    public function all()
    {
        return Cours::latest()->paginate();
    }

    public function create(array $data)
    {
        return Cours::create($data);
    }

    public function update(Cours $cours, array $data)
    {
        return $cours->update($data);
    }

    public function delete(Cours $cours)
    {
        return $cours->delete();
    }
}
