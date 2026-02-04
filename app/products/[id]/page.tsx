"use client";

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import { products, Product } from '@/constants/products';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">未找到商品</h2>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 mb-6 transition-colors w-fit">
        <ChevronLeft className="w-4 h-4" />
        <span>返回商品列表</span>
      </Link>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden md:flex">
        <div className="md:w-1/2 relative h-80 md:h-auto bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">¥{product.price}</p>

          <div className="border-t border-b py-6 mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">商品详情</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            加入购物车
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            全场包邮 · 7天无理由退货
          </p>
        </div>
      </div>
    </div>
  );
}
