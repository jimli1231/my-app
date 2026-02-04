import { products } from "@/constants/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div>
      <section className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          发现优选好物
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          探索我们精心挑选的电子产品和配件，为您提升生活品质。
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
