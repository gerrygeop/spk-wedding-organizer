<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'role' => 'admin',
        ]);

        DB::table('kriteria')->insert([
            [
                'nama' => 'Harga',
                'bobot' => floatval('0.2'),
            ],
            [
                'nama' => 'Konsep',
                'bobot' => floatval('0.2'),
            ],
            [
                'nama' => 'Fasilitas',
                'bobot' => floatval('0.2'),
            ],
            [
                'nama' => 'Reputasi',
                'bobot' => floatval('0.2'),
            ],
            [
                'nama' => 'Profesionalisme',
                'bobot' => floatval('0.2'),
            ],
        ]);
        DB::table('sub_kriteria')->insert([
            [
                'kriteria_id' => 1,
                'nama' => 'Sangat Murah',
                'bobot' => 1,
            ],
            [
                'kriteria_id' => 1,
                'nama' => 'Cukup Murah',
                'bobot' => 2,
            ],
            [
                'kriteria_id' => 1,
                'nama' => 'Sedang',
                'bobot' => 3,
            ],
            [
                'kriteria_id' => 1,
                'nama' => 'Cukup Mahal',
                'bobot' => 4,
            ],
            [
                'kriteria_id' => 1,
                'nama' => 'Sangat Mahal',
                'bobot' => 5,
            ],

            [
                'kriteria_id' => 2,
                'nama' => 'Sangat tidak menarik',
                'bobot' => 1,
            ],
            [
                'kriteria_id' => 2,
                'nama' => 'Kurang menarik',
                'bobot' => 2,
            ],
            [
                'kriteria_id' => 2,
                'nama' => 'Cukup menarik',
                'bobot' => 3,
            ],
            [
                'kriteria_id' => 2,
                'nama' => 'Lumayan menarik',
                'bobot' => 4,
            ],
            [
                'kriteria_id' => 2,
                'nama' => 'Sangat menarik',
                'bobot' => 5,
            ],

            [
                'kriteria_id' => 3,
                'nama' => 'Sangat tidak lengkap',
                'bobot' => 1,
            ],
            [
                'kriteria_id' => 3,
                'nama' => 'Kurang lengkap',
                'bobot' => 2,
            ],
            [
                'kriteria_id' => 3,
                'nama' => 'Cukup lengkap',
                'bobot' => 3,
            ],
            [
                'kriteria_id' => 3,
                'nama' => 'Lumayan lengkap',
                'bobot' => 4,
            ],
            [
                'kriteria_id' => 3,
                'nama' => 'Sangat lengkap',
                'bobot' => 5,
            ],

            [
                'kriteria_id' => 4,
                'nama' => 'Sangat tidak memuaskan',
                'bobot' => 1,
            ],
            [
                'kriteria_id' => 4,
                'nama' => 'Kurang memuaskan',
                'bobot' => 2,
            ],
            [
                'kriteria_id' => 4,
                'nama' => 'Cukup memuaskan',
                'bobot' => 3,
            ],
            [
                'kriteria_id' => 4,
                'nama' => 'Lumayan memuaskan',
                'bobot' => 4,
            ],
            [
                'kriteria_id' => 4,
                'nama' => 'Sangat memuaskan',
                'bobot' => 5,
            ],

            [
                'kriteria_id' => 5,
                'nama' => 'Sangat tidak memuaskan',
                'bobot' => 1,
            ],
            [
                'kriteria_id' => 5,
                'nama' => 'Kurang memuaskan',
                'bobot' => 2,
            ],
            [
                'kriteria_id' => 5,
                'nama' => 'Cukup memuaskan',
                'bobot' => 3,
            ],
            [
                'kriteria_id' => 5,
                'nama' => 'Lumayan memuaskan',
                'bobot' => 4,
            ],
            [
                'kriteria_id' => 5,
                'nama' => 'Sangat memuaskan',
                'bobot' => 5,
            ],
        ]);
    }
}
