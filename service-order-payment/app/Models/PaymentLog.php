<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentLog extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $table = 'payment_logs';

    protected $casts = [
        'created_at' =>'datetime:Y-m-d H:m:s',
        'updated_at' =>'datetime:Y-m-d H:m:s',
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }
}
