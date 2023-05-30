<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use App\Http\Requests\StoreKriteriaRequest;
use App\Http\Requests\UpdateKriteriaRequest;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class KriteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Kriteria/Index', [
            'kriteria' => Kriteria::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Kriteria/Create', [
            'kriteria' => new Kriteria()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKriteriaRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            $kriteria = Kriteria::create([
                'nama' => $validated['nama'],
                'bobot' => $validated['bobot'],
            ]);

            $kriteria->subKriteria()->createMany($validated['sub_kriteria']);
        });

        return to_route('kriteria.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Kriteria $kriteria): Response
    {
        return Inertia::render('Admin/Kriteria/Show', [
            'kriteria' => $kriteria
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Kriteria $kriteria): Response
    {
        return Inertia::render('Admin/Kriteria/Edit', [
            'kriteria' => $kriteria
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKriteriaRequest $request, Kriteria $kriteria)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $kriteria) {
            $kriteria->update([
                'nama' => $validated['nama'],
                'bobot' => $validated['bobot'],
            ]);

            $kriteria->subKriteria()->delete();

            $kriteria->subKriteria()->createMany($validated['sub_kriteria']);
        });

        return to_route('kriteria.show', $kriteria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kriteria $kriteria)
    {
        DB::transaction(function () use ($kriteria) {
            $kriteria->subKriteria()->delete();
            $kriteria->delete();
        });

        return to_route('kriteria.index');
    }
}
