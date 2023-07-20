<?php

namespace App\Http\Controllers;

use App\Models\Alternatif;
use App\Http\Requests\StoreAlternatifRequest;
use App\Models\Kriteria;
use App\Models\SubKriteria;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AlternatifController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:admin')->except('index');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Alternatif/Index', [
            'alternatif' => Alternatif::with('kriteria')->get(),
            'kriteria' => Kriteria::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Alternatif/Create', [
            'alternatif' => new Alternatif(),
            'kriteria' => Kriteria::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAlternatifRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $alternatif = Alternatif::create([
                'nama' => $validated['nama'],
            ]);

            collect($validated['kriteria'])->each(function ($subKriteriaId, $kriteriaId) use ($alternatif) {
                $nilai = SubKriteria::findOrFail($subKriteriaId);

                $alternatif->kriteria()->attach($kriteriaId, [
                    'sub_kriteria_id' => $subKriteriaId,
                    'nilai' => $nilai->bobot,
                ]);
            });
        });

        return to_route('alternatif.index')->with('success', 'Alternatif berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Alternatif $alternatif)
    {
        return Inertia::render('Admin/Alternatif/Edit', [
            'alternatif' => $alternatif->load('kriteria'),
            'kriteria' => Kriteria::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreAlternatifRequest $request, Alternatif $alternatif)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $alternatif) {
            $alternatif->update([
                'nama' => $validated['nama'],
            ]);

            $alternatif->kriteria()->detach();

            collect($validated['kriteria'])->each(function ($subKriteriaId, $kriteriaId) use ($alternatif) {
                $subKriteria = SubKriteria::findOrFail($subKriteriaId);

                $alternatif->kriteria()->attach($kriteriaId, [
                    'sub_kriteria_id' => $subKriteriaId,
                    'nilai' => $subKriteria->bobot,
                ]);
            });
        });

        return to_route('alternatif.index')->with('success', 'Alternatif berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alternatif $alternatif)
    {
        $alternatif->delete();
        return to_route('alternatif.index')->with('success', 'Alternatif berhasil dihapus.');
    }
}
