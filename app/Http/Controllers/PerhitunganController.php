<?php

namespace App\Http\Controllers;

use App\Models\Alternatif;
use App\Models\Kriteria;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PerhitunganController extends Controller
{
    public function topsis(): Response
    {
        $isTrue = false;
        $requestValues = [];

        if (request()->all()) {
            $values = request()->all();
            $filterRequest = array_filter($values);
            $isTrue = $filterRequest ? true : false;
            $requestValues = array_values($filterRequest);
        };

        $alternatif = Alternatif::query()
            ->when(
                $isTrue,
                function (Builder $builder) use ($requestValues) {
                    $builder->whereRelation('subKriteria', function ($query) use ($requestValues) {
                        $query->whereIn('sub_kriteria_id', $requestValues);
                    });
                }
            )
            ->with('kriteria')
            ->get();

        $kriteria = Kriteria::query()
            ->with(['alternatif' => function (Builder $query) use ($requestValues, $isTrue) {
                $query->when(
                    $isTrue,
                    function (Builder $builder) use ($requestValues) {
                        $builder->whereRelation('subKriteria', function ($query) use ($requestValues) {
                            $query->whereIn('sub_kriteria_id', $requestValues);
                        });
                    }
                );
            }])
            ->get();

        if (Alternatif::exists()) {
            if ($alternatif->count() < 2) {
                $notNull = false;
            } else {
                $notNull = true;
            }
        } else {
            $notNull = false;
        }

        $normalisasi = $notNull ? $this->normalisasiMatrix($kriteria) : collect([]);
        $normalisasiTerbobot = $notNull ? $this->normalisasiMatrixTerbobot($kriteria, $normalisasi) : collect([]);
        $solusiIdeal = $notNull ? $this->solusiIdeal($normalisasiTerbobot) : collect([]);
        $jarakIdeal = $notNull ? $this->jarakIdeal($normalisasiTerbobot, $solusiIdeal) : collect([]);
        $preferensi = $notNull ? $this->preferensi($jarakIdeal) : collect([]);
        $ranking = $notNull ? $this->preferensi($jarakIdeal)->sortByDesc('hasil')->values() : collect([]);

        $data = [
            'normalisasi' => $normalisasi,
            'normalisasiTerbobot' => $normalisasiTerbobot,
            'solusiIdeal' => $solusiIdeal,
            'jarakIdeal' => $jarakIdeal,
            'preferensi' => $preferensi,
            'ranking' => $ranking,
        ];

        return Inertia::render('Admin/Topsis/Topsis', [
            'alternatif' => $alternatif,
            'kriteria' => $kriteria,
            'topsis' => $data,
        ]);
    }

    private function preferensi($jarakIdeal)
    {
        $hasilPerhitungan = [];

        // Perulangan untuk melakukan perhitungan pada setiap item
        foreach ($jarakIdeal as $item) {
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

    private function jarakIdeal($normalisasiTerbobot, $minmax)
    {
        $hasilPerhitungan = [];

        // Perulangan untuk melakukan perhitungan pada setiap normalisasi matrix bobot
        foreach ($normalisasiTerbobot as $item) {
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

    private function solusiIdeal($normalisasiTerbobot)
    {
        $minValues = [];
        $maxValues = [];

        foreach ($normalisasiTerbobot as $item) {
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

    private function normalisasiMatrixTerbobot($kriteria, $normalisasiMatrix)
    {
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

    private function normalisasiMatrix($listKriteria)
    {
        $alternatif = [];
        foreach ($listKriteria as $ktr) {
            $alternatif = $ktr->alternatif;
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
