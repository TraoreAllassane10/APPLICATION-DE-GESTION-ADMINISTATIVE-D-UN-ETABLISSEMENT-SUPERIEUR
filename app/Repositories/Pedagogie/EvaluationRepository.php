<?php

namespace App\Repositories\Pedagogie;

use App\Models\Evaluation;

class EvaluationRepository
{

    public function create(array $data)
    {
        return Evaluation::create($data);
    }
}
