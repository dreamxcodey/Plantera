'use client';

import ProductCard from '../../components/ProductCard';

export default function RelatedProducts({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 px-2 sm:px-0">
        Related Products
      </h2>

      {/* Mobile: horizontal scroll, Large: grid */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 px-2 snap-x snap-mandatory">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start min-w-[250px] sm:min-w-[280px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Grid layout for large screens */}
      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
