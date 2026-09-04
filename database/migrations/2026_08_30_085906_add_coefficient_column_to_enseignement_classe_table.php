<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('enseignement_classe', function (Blueprint $table) {
            $table->decimal("coefficient", 5, 2)->default(1)->after('niveau_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enseignement_classe', function (Blueprint $table) {
            $table->dropColumn('coefficient');
        });
    }
};
