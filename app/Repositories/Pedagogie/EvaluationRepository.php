<?php

namespace App\Repositories\Pedagogie;

use App\Models\Evaluation;

class EvaluationRepository
{
    public function all() {
        return Evaluation::latest()->get();
    }

    public function paginate() {
        return Evaluation::latest()->paginate(10);
    }

    public function create(array $data)
    {
        return Evaluation::create($data);
    }
}
