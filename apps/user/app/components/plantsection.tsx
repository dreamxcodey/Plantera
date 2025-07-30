'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'next/navigation';

export default function PlantSection() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/products/featured');
        const data = await res.json();
        setFeaturedProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, []);

  const skeletons = Array(4).fill(0);

  return (
    <section className="py-16 bg-emerald-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-green-900 mb-2">
              Featured Plants
            </h2>
            <p className="text-green-700">
              Some randomly selected green beauties
            </p>
          </div>
          <button
            onClick={() => router.push('/categories')}
            className="mt-4 md:mt-0 px-6 py-2 border-2 border-emerald-600 text-emerald-600 rounded-full font-medium hover:bg-emerald-600 hover:text-white transition duration-300"
          >
            View All
          </button>
        </div>

        {/* Cards or Skeletons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="w-full max-w-xs bg-white rounded-xl border border-green-100 p-4 shadow animate-pulse"
                >
                  <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-100 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-100 rounded w-5/6 mb-3"></div>
                  <div className="h-8 bg-emerald-100 rounded w-full"></div>
                </div>
              ))
            : featuredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </section>
  );
}
