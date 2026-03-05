<?php

namespace Database\Seeders\Samples;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->first();
        $products = Product::query()->take(2)->get();

        $order = Order::query()->create([
            'user_id' => $user->id,
            'total' => $products->sum('price'),
            'status' => 'completed',
        ]);

        foreach ($products as $product) {
            OrderItem::query()->create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => 1,
                'price' => $product->price,
            ]);
        }
    }
}
