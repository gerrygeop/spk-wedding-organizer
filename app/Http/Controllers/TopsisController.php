<?php

namespace App\Http\Controllers;

use App\Models\Alternatif;
use App\Models\Kriteria;
use Inertia\Inertia;
use Inertia\Response;

class TopsisController extends Controller
{
    public function stepOne(): Response
    {
        $data = $this->normalisasiMatrix();
        return Inertia::render('Admin/Topsis/StepOne', [
            'kriteria' => Kriteria::all(),
            'matriks' => $data,
        ]);
    }

    public function stepTwo()
    {
        $data = $this->normalisasiMatrixTerbobot();
        return Inertia::render('Admin/Topsis/StepTwo', [
            'kriteria' => Kriteria::all(),
            'matriks' => $data,
        ]);
    }

    public function stepThree()
    {
        $data = $this->solusiIdeal();
        return Inertia::render('Admin/Topsis/StepThree', [
            'kriteria' => Kriteria::all(),
            'minmax' => $data,
        ]);
    }

    public function stepFour()
    {
        $data = $this->jarakIdeal();
        return Inertia::render('Admin/Topsis/StepFour', [
            'data' => $data,
        ]);
    }

    public function stepFive()
    {
        $data = $this->preferensi();
        return Inertia::render('Admin/Topsis/StepFive', [
            'data' => $data,
        ]);
    }

    public function ranking()
    {
        $data = $this->preferensi()->sortByDesc('hasil');

        return Inertia::render('Admin/Topsis/Ranking', [
            'data' => $data->values(),
        ]);
    }

    private function preferensi()
    {
        $data = $this->jarakIdeal();

        $hasilPerhitungan = [];

        // Perulangan untuk melakukan perhitungan pada setiap item
        foreach ($data as $item) {
            $alternatif = $item['alternatif'];
            $positif = $item['positif'];
            $negatif = $item['negatif'];

            $hasil = $negatif / ($negatif + $positif);

            $hasilPerhitungan[] = [
                'alternatif' => $alternatif,
                'hasil' => round($hasil, 3),
            ];
        }

        return collect($hasilPerhitungan);
    }

    private function jarakIdeal()
    {
        $normalisasi = $this->normalisasiMatrixTerbobot();
        $minmax = $this->solusiIdeal();

        $hasilPerhitungan = [];

        // Perulangan untuk melakukan perhitungan pada setiap normalisasi matrix bobot
        foreach ($normalisasi as $item) {
            $alternatif = $item['alternatif'];
            $kriteria = $item['kriteria'];

            $jarakPositif = 0;
            $jarakNegatif = 0;

            // Perulangan untuk menghitung jarak positif dan jarak negatif
            foreach ($kriteria as $key => $value) {
                $max = $minmax[0]['kriteria'][$key];
                $min = $minmax[1]['kriteria'][$key];

                $jarakPositif += pow(($value - $max), 2);
                $jarakNegatif += pow(($value - $min), 2);
            }

            $jarakPositif = sqrt($jarakPositif);
            $jarakNegatif = sqrt($jarakNegatif);

            $hasilPerhitungan[] = [
                'alternatif' => $alternatif,
                'positif' => round($jarakPositif, 3),
                'negatif' => round($jarakNegatif, 3),
            ];
        }

        return collect($hasilPerhitungan);
    }

    private function solusiIdeal()
    {
        $data = $this->normalisasiMatrixTerbobot();

        $minValues = [];
        $maxValues = [];

        foreach ($data as $item) {
            $kriteriaValues = $item['kriteria'];

            foreach ($kriteriaValues as $kriteria => $nilai) {
                if (!isset($minValues[$kriteria]) || $nilai < $minValues[$kriteria]) {
                    $minValues[$kriteria] = $nilai;
                }

                if (!isset($maxValues[$kriteria]) || $nilai > $maxValues[$kriteria]) {
                    $maxValues[$kriteria] = $nilai;
                }
            }
        }

        $minmax = [
            [
                'type' => 'A+',
                'kriteria' => $maxValues,
            ],
            [
                'type' => 'A-',
                'kriteria' => $minValues
            ],
        ];

        return collect($minmax);
    }

    private function normalisasiMatrixTerbobot()
    {
        $kriteria = Kriteria::all();
        $normalisasiMatrix = $this->normalisasiMatrix();

        foreach ($normalisasiMatrix as &$item) {
            $kriteriaValues = $item['kriteria'];

            foreach ($kriteria as $ktr) {
                $kriteriaNama = $ktr->nama;
                $kriteriaBobot = $ktr->bobot;

                if (isset($kriteriaValues[$kriteriaNama])) {
                    $kriteriaValues[$kriteriaNama] = round($kriteriaValues[$kriteriaNama] * $kriteriaBobot, 3);
                }
            }

            $matrix[] = [
                'alternatif' => $item['alternatif'],
                'kriteria' => $kriteriaValues
            ];
        }

        return collect($matrix);
    }

    private function normalisasiMatrix()
    {
        $listKriteria = Kriteria::with('alternatif')->get();

        foreach ($listKriteria as $ktr) {
            foreach ($ktr->alternatif as $alt) {
                $alternatifKriteria[$ktr->nama][] = $alt->pivot->nilai;
            }
        }

        $result = [];
        foreach ($alternatifKriteria as $namaKriteria => $nilai) {
            $denominator[$namaKriteria] = sqrt(
                array_sum(
                    array_map(fn ($val) => pow($val, 2), $alternatifKriteria[$namaKriteria])
                )
            );

            $result[$namaKriteria] = array_map(
                fn ($val) => round(
                    $val / $denominator[$namaKriteria],
                    3
                ),
                $alternatifKriteria[$namaKriteria]
            );
        }

        $alternatif = Alternatif::all();
        foreach ($alternatif as $key => $value) {
            foreach ($result as $namaKriteria => $nilai) {
                $arr[$namaKriteria] = $nilai[$key];
            }

            $matrix[] = [
                'alternatif' => $value->nama,
                'kriteria' => $arr
            ];
        }

        return collect($matrix);
    }
}
