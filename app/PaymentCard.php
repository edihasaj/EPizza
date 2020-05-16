<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentCard extends Model
{
    protected $table = 'payment_cards';
    protected $fillable = [
        'cardNumber',
        'cardName',
        'cvv',
        'expirationDate',
        'userId'
    ];
}
