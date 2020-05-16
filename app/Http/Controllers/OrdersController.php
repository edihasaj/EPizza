<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\OrderDetails;
use App\PaymentCard;
Use \Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order([
          'userId' => $request->get('userId'),
          'address' => $request->get('address'),
          'phoneNumber' => $request->get('phoneNumber')
        ]);
        $order->save();
        $orderDb = Order::where('userId', $request->get('userId'))->first();
        
        $card = new PaymentCard([
            'cardNumber' => $request->get('cardNumber'),
            'cardName' => $request->get('cardName'),
            'cvv' => $request->get('cvv'),
            'expirationDate' => $request->get('expirationDate'),
            'userId' => $request->get('userId')
        ]);
        $card->save();
        $cardDb = PaymentCard::where('userId', $request->get('userId'))->first();

        foreach($request->input('cartItems') as $cartItem) {
            $orderDetails = new OrderDetails([
                'quantity' => $cartItem['product']['quantity'],
                'productId' => $cartItem['product']['id'],
                'orderId' => $orderDb->id,
                'paymentCardId' => $cardDb->id,
            ]);
            $orderDetails->save();
        }
        
        return response()->json($order);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return DB::table('orders')
            ->where('orders.userId', $id)
            ->join('order_details', 'order_details.orderId', '=', 'orders.id')
            ->join('pizzas', 'pizzas.id', '=', 'order_details.productId')
            ->select('orders.id', 'orders.orderDate', 'orders.address', 'order_details.productId', 'pizzas.name', 'pizzas.price')
            ->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
