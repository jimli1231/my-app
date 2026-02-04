"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">您的购物车是空的</h2>
        <p className="text-gray-500 mb-8">去挑选一些心仪的商品吧！</p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          开始购物
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">我的购物车</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl border flex gap-4">
              <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">数量: {item.quantity}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-600">¥{item.price}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:bg-red-50 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-gray-500 text-sm hover:text-red-500 transition-colors flex items-center gap-1"
          >
            清空购物车
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border h-fit shadow-sm">
          <h2 className="text-xl font-bold mb-4">订单摘要</h2>
          <div className="space-y-3 text-gray-600 mb-6">
            <div className="flex justify-between">
              <span>商品总额</span>
              <span>¥{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>运费</span>
              <span className="text-green-600">免费</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-gray-900 text-lg">
              <span>总计</span>
              <span className="text-blue-600">¥{totalPrice}</span>
            </div>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            onClick={() => alert('此功能暂未开放')}
          >
            结账
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-center text-gray-400 text-xs mt-4">
            点击结账即表示您同意我们的服务条款
          </p>
        </div>
      </div>
    </div>
  );
}
