<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Alternatif extends Model
{
    use HasFactory;

    protected $table = 'alternatif';
    protected $guarded = ['id'];

    public function kriteria(): BelongsToMany
    {
        return $this->belongsToMany(Kriteria::class, 'alternatif_kriteria')->withPivot('sub_kriteria_id', 'nilai');
    }

    public function subKriteria(): BelongsToMany
    {
        return $this->belongsToMany(SubKriteria::class, 'alternatif_kriteria');
    }
}
