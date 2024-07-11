<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\PaymentLog;
use Illuminate\Http\Request;

class WehookController extends Controller
{
    public function midransHandler(Request $request)
    {
        $data = $request->all();

        $signatureKey = $data['signature_key'];

        $orderId = $data['order_id'];
        $statusCode = $data['status_code'];
        $grossAmount = $data['gross_amount'];
        $serverKey = env('MIDTRANS_SERVER_KEY');

        $mySignatureKey = hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);

        $transactionStatus = $data['transaction_status'];
        $type = $data['payment_type'];
        $fraudStatus = $data['fraud_status'];

        if ($mySignatureKey !== $signatureKey) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid signature key'
            ], 400);
        }

        $realOrderId = explode('-', $orderId);
        $order = Order::find($realOrderId[0]);
        
        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order ID not found'
            ], 400);
        }

        if ($order->status === 'success') {
            return response()->json([
                'status' => 'error',
                'message' => 'Operation not permitted',
            ], 405);
        }

        if ($transactionStatus == 'capture') {
            if ($fraudStatus == 'accept') {
                $order->status = 'success';
            }
        } elseif ($transactionStatus == 'settlement') {
            $order->status = 'success';
        } elseif ($transactionStatus == 'cancel' || $transactionStatus == 'deny' || $transactionStatus == 'expire') {
            $order->status = 'failure';
        } elseif ($transactionStatus == 'pending') {
            $order->status = 'pending';
        }

        $logData = [
            'status' => $transactionStatus,
            'raw_response' => json_encode($data), // Convert array to JSON string
            'order_id' => $realOrderId[0], // Store only the first part of the order ID
            'payment_type' => $type
        ];
        
        PaymentLog::create($logData);
        $order->save();

        if ($order->status === 'success') {
            createPremiumAccess([
                'user_id' => $order->user_id,
                'course_id' => $order->course_id
            ]);
        }

        return response()->json('ok');
    }
}
