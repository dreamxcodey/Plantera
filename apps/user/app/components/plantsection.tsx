'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { useRouter } from 'next/navigation';
export default function PlantSection() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/products/featured');
        const data = await res.json();
        setFeaturedProducts(data.products);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
      }
    }

    fetchFeatured();
  }, []);

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
          <button onClick={()=>router.push('/categories')} className="mt-4 md:mt-0 px-6 py-2 border-2 border-emerald-600 text-emerald-600 rounded-full font-medium hover:bg-emerald-600 hover:text-white transition duration-300">
            View All
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
