// app/components/FilterSidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function FilterSidebar({
  categories,
  brands,
  minPrice,
  tags,
  maxPrice
}: {
  categories: any[],
  brands: any[],
  minPrice: number,
  tags: string[],
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
    tags: [] as string[],
    inStock: false,
    // Removed rating filter as it's not implemented in backend
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setFilters({
      categories: params.getAll('category') || [],
      brands: params.getAll('brand') || [],
      minPrice: Number(params.get('minPrice')) || minPrice,
      tags: params.getAll('tag') || [],
      maxPrice: Number(params.get('maxPrice')) || maxPrice,
      inStock: params.get('inStock') === 'true',
    });
  }, [searchParams, minPrice, maxPrice]);

  const applyFilters = () => {
    const params = new URLSearchParams();

    filters.categories.forEach(cat => params.append('category', cat));
    filters.brands.forEach(brand => params.append('brand', brand));
    filters.tags.forEach(tag => params.append('tag', tag));
    if (filters.minPrice !== minPrice) {
      params.set('minPrice', filters.minPrice.toString());
    }

    if (filters.maxPrice !== maxPrice) {
      params.set('maxPrice', filters.maxPrice.toString());
    }

    if (filters.inStock) {
      params.set('inStock', 'true');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  // ... handleCategoryChange and handleBrandChange remain the same ...
  const handleTagChange = (tag: string) => {
    setFilters(prev => {
      const newTags = prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag];
      return {
        ...prev,
        tags: newTags
      };
    });
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-green-100">
      {/* ... Header and reset button ... */}

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
                {category.name} ({category._count?.products || 0})
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
      {tags.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${filters.tags.includes(tag)
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-700'
                  : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Price Filter - Updated for size-based pricing */}
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

      {/* Stock Filter - Updated for size-based inventory */}
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

      <button
        onClick={applyFilters}
        className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
}
