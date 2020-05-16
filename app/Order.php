<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = [
        'orderDate',
        'userId',
        'address',
        'phoneNumber'
    ];

    public function userId()
    {
        return $this->hasOne('App\User');
    }
}
