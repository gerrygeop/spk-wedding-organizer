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
        Schema::create('alternatif', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->timestamps();
        });

        Schema::create('alternatif_kriteria', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alternatif_id')->constrained('alternatif')->cascadeOnDelete();
            $table->foreignId('kriteria_id')->constrained('kriteria')->cascadeOnDelete();
            $table->foreignId('sub_kriteria_id')->constrained('sub_kriteria')->cascadeOnDelete();
            $table->integer('nilai');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alternatif_kriteria');
        Schema::dropIfExists('alternatif');
    }
};
