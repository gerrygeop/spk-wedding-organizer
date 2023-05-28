<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AlternatifKriteria extends Model
{
    use HasFactory;

    protected $table = 'alternatif_kriteria';
    protected $guarded = ['id'];

    public function alternatif()
    {
        return $this->belongsTo(Alternatif::class);
    }

    public function kriteria()
    {
        return $this->belongsTo(Kriteria::class);
    }
}
