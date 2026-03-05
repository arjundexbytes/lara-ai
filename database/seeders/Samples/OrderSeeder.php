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
        $users = User::query()->get();
        $products = Product::query()->get();

        foreach ($users as $index => $user) {
            $subset = $products->slice(0, 2 + ($index % 2));
            $order = Order::query()->create([
                'user_id' => $user->id,
                'total' => $subset->sum('price'),
                'status' => $index % 2 === 0 ? 'completed' : 'processing',
            ]);

            foreach ($subset as $product) {
                OrderItem::query()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => 1,
                    'price' => $product->price,
                ]);
            }
        }
    }
}
