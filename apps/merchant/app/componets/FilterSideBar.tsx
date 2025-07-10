'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterSidebar({
  categories,
  brands,
  minPrice,
  maxPrice
}: {
  categories: any[],
  brands: any[],
  minPrice: number,
  maxPrice: number
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    minPrice: minPrice,
    maxPrice: maxPrice,
    inStock: false,
    rating: 0,
  });

  useEffect(() => {
    // Initialize filters from URL
    const params = new URLSearchParams(searchParams.toString());

    setFilters({
      categories: params.getAll('category') || [],
      brands: params.getAll('brand') || [],
      minPrice: Number(params.get('minPrice')) || minPrice,
      maxPrice: Number(params.get('maxPrice')) || maxPrice,
      inStock: params.get('inStock') === 'true',
      rating: Number(params.get('rating')) || 0,
    });
  }, [searchParams, minPrice, maxPrice]);

  const applyFilters = () => {
    const params = new URLSearchParams();

    // Add filters to URL
    filters.categories.forEach(cat => params.append('category', cat));
    filters.brands.forEach(brand => params.append('brand', brand));

    if (filters.minPrice !== minPrice) {
      params.set('minPrice', filters.minPrice.toString());
    }

    if (filters.maxPrice !== maxPrice) {
      params.set('maxPrice', filters.maxPrice.toString());
    }

    if (filters.inStock) {
      params.set('inStock', 'true');
    }

    if (filters.rating > 0) {
      params.set('rating', filters.rating.toString());
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (slug: string) => {
    setFilters(prev => {
      const newCategories = prev.categories.includes(slug)
        ? prev.categories.filter(c => c !== slug)
        : [...prev.categories, slug];

      return { ...prev, categories: newCategories };
    });
  };

  const handleBrandChange = (slug: string) => {
    setFilters(prev => {
      const newBrands = prev.brands.includes(slug)
        ? prev.brands.filter(b => b !== slug)
        : [...prev.brands, slug];

      return { ...prev, brands: newBrands };
    });
  };

  const resetFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      minPrice: minPrice,
      maxPrice: maxPrice,
      inStock: false,
      rating: 0,
    });
    router.push(pathname);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-green-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-green-800">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-emerald-600 hover:text-emerald-800"
        >
          Reset
        </button>
      </div>

      {/* Categories Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center">
              <input
                type="checkbox"
                id={`cat-${category.id}`}
                checked={filters.categories.includes(category.slug)}
                onChange={() => handleCategoryChange(category.slug)}
                className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label
                htmlFor={`cat-${category.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {category.name} ({category.products?.length ?? 0})
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Brands</h4>
        <div className="space-y-2">
          {brands.map(brand => (
            <div key={brand.id} className="flex items-center">
              <input
                type="checkbox"
                id={`brand-${brand.id}`}
                checked={filters.brands.includes(brand.slug)}
                onChange={() => handleBrandChange(brand.slug)}
                className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="ml-2 text-sm text-gray-700"
              >
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">₹{minPrice}</span>
            <span className="text-sm text-gray-600">₹{maxPrice}</span>
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                minPrice: Number(e.target.value)
              }))}
              min={minPrice}
              max={maxPrice}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                maxPrice: Number(e.target.value)
              }))}
              min={minPrice}
              max={maxPrice}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Stock Filter */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="inStock"
            checked={filters.inStock}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              inStock: e.target.checked
            }))}
            className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <label
            htmlFor="inStock"
            className="ml-2 text-sm text-gray-700"
          >
            In Stock Only
          </label>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-2">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center">
              <input
                type="radio"
                id={`rating-${rating}`}
                name="rating"
                checked={filters.rating === rating}
                onChange={() => setFilters(prev => ({ ...prev, rating }))}
                className="h-4 w-4 text-emerald-600 border-gray-300 rounded-full focus:ring-emerald-500"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-2 text-sm text-gray-700"
              >
                {rating} Stars & Up
              </label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={applyFilters}
        className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
