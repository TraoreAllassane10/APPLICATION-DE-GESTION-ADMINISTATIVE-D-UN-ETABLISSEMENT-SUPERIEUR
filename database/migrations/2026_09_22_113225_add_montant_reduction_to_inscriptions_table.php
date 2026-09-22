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
        Schema::table('inscriptions', function (Blueprint $table) {
            // Nullable : les inscriptions existantes utilisent taux_reduction,
            // elles n'ont pas de montant fixe de réduction.
            $table->integer('montant_reduction')->nullable()->default(null)->after('taux_reduction');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inscriptions', function (Blueprint $table) {
            $table->dropColumn('montant_reduction');
        });
    }
};
