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

    public function find(string $id) {
        return Evaluation::find($id);
    }

    public function create(array $data)
    {
        return Evaluation::create($data);
    }

    public function delete(Evaluation $evaluation) {
        return $evaluation->delete();
    }
}
