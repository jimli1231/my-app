"use client";

import Link from 'next/link';
import { ShoppingCart, Store, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <Store className="w-6 h-6" />
          <span>极简商城</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
            首页
          </Link>
          <Link href="/login" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors font-medium">
            <User className="w-6 h-6" />
            <span>登录</span>
          </Link>
          <Link href="/cart" className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="font-medium">购物车</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
