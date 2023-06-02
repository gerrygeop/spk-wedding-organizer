<?php

namespace App\Http\Controllers;

use App\Models\Alternatif;
use App\Http\Requests\StoreAlternatifRequest;
use App\Http\Requests\UpdateAlternatifRequest;
use App\Models\Kriteria;
use App\Models\SubKriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AlternatifController extends Controller
{
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

            foreach ($validated['kriteria'] as $kriteriaId => $bobot) {
                $alternatif->kriteria()->attach($kriteriaId, ['nilai' => $bobot]);
            }
        });

        return to_route('alternatif.index')->with('success', 'Alternatif berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Alternatif $alternatif): Response
    {
        return Inertia::render('Admin/Alternatif/Show', [
            'alternatif' => $alternatif->load('kriteria')
        ]);
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

            foreach ($validated['kriteria'] as $kriteriaId => $bobot) {
                $alternatif->kriteria()->attach($kriteriaId, ['nilai' => $bobot]);
            }
        });

        return to_route('alternatif.show', $alternatif)->with('success', 'Alternatif berhasil diperbarui.');
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
