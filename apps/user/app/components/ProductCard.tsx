'use client';

import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const [hovered, setHovered] = useState(false);
  const allImages = product.sizes?.flatMap((size: any) => size.images || []) ?? [];
  const hasMultipleSizes = product.sizes && product.sizes.length > 1;
  const minPrice = Math.min(...product.sizes.map((s: any) => s.price));
  const maxPrice = Math.max(...product.sizes.map((s: any) => s.price));
  const totalStock = product.sizes?.reduce((sum: number, size: any) => sum + (size.stock || 0), 0) ?? product.stock;

  return (
    <Link
      className="w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-green-50 flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      href={`/product/${product.slug}`}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative overflow-hidden aspect-square">
        {allImages.length > 0 && (
          <img
            src={hovered && allImages[1] ? allImages[1] : allImages[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        )}

        {/* Stock indicator badge - responsive size */}
        <div className={`absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${totalStock > 0 ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800'
          }`}>
          {totalStock > 0 ? `${totalStock} in stock` : 'Sold out'}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Category tags - responsive spacing */}
        <div className="flex gap-1 sm:gap-2 mb-1 sm:mb-2">
          {product.category?.name && (
            <span className="bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {product.category.name}
            </span>
          )}
        </div>

        {/* Title and price - responsive text sizes */}
        <div className="mb-1 sm:mb-2">
          <h2 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
            {product.name}
          </h2>
          <div className="mt-1 flex items-center flex-wrap">
            <span className="text-base sm:text-lg font-bold text-emerald-700">
              {hasMultipleSizes
                ? `₹${minPrice.toFixed(2)} - ₹${maxPrice.toFixed(2)}`
                : `₹${product.sizes[0]?.price.toFixed(2)}`
              }
            </span>
            {hasMultipleSizes && (
              <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs text-gray-500 bg-gray-100 px-1 sm:px-1.5 py-0.5 rounded">
                {product.sizes.length} sizes
              </span>
            )}
          </div>
        </div>

        {/* Short description - responsive text size */}
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3 mt-auto">
          {product.shortDescription}
        </p>

        {/* Size chips - responsive spacing and size */}
        <div className="mt-1 mb-2 sm:mt-2 sm:mb-3">
          <div className="flex flex-wrap gap-1">
            {product.sizes?.slice(0, 4).map((size: any, index: number) => (
              <div
                key={index}
                className="text-[10px] sm:text-xs bg-emerald-50 text-emerald-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border border-emerald-100"
              >
                {size.label === "S"
                  ? "small"
                  : size.label === "M"
                    ? "medium"
                    : size.label === "L"
                      ? "large"
                      : size.label}
              </div>
            ))}
            {product.sizes?.length > 4 && (
              <div className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                +{product.sizes.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* View button - responsive padding and text size */}
        <Link
          href={`/product/${product.slug}`}
          className="mt-auto w-full py-1.5 sm:py-2 text-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:font-medium transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </Link>
  );
}
