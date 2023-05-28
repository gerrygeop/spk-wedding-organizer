<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kriteria extends Model
{
    use HasFactory;

    protected $table = 'kriteria';
    protected $guarded = ['id'];

    public function subKriteria(): HasMany
    {
        return $this->hasMany(SubKriteria::class);
    }

    public function alternatif(): BelongsToMany
    {
        return $this->belongsToMany(Alternatif::class, 'alternatif_kriteria')->withPivot('nilai');
    }
}
