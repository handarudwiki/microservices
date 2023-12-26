<?php

namespace App\Models;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chapter extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'created_at' => "datetime:Y-m-d H:m:s",
        'updated_at' => "datetime:Y-m-d H:m:s",
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'chapter_id', 'id');
    }
}
