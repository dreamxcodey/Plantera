'use client';

import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const [hovered, setHovered] = useState(false);

  // Extract all images from all sizes
  const allImages = product.sizes?.flatMap((size: any) => size.images || []) ?? [];

  // Calculate price range display
  const hasMultipleSizes = product.sizes && product.sizes.length > 1;
  const minPrice = Math.min(...product.sizes.map((s: any) => s.price));
  const maxPrice = Math.max(...product.sizes.map((s: any) => s.price));

  // Calculate total stock across all sizes
  const totalStock = product.sizes?.reduce((sum: number, size: any) => sum + (size.stock || 0), 0) ?? product.stock;

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      {allImages.length > 0 && (
        <img
          src={hovered && allImages[1] ? allImages[1] : allImages[0]}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-56 object-cover transition duration-300"
        />
      )}

      <div className="p-4">
        {/* Title & Price */}
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-green-800">
            {product.name}
          </h2>

          <div className="text-right">
            {hasMultipleSizes ? (
              <span className="text-lg font-bold text-emerald-600">
                ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)}
              </span>
            ) : (
              <span className="text-lg font-bold text-emerald-600">
                ₹{product.sizes[0]?.price.toFixed(2) || product.defaultPrice?.toFixed(2) || "N/A"}
              </span>
            )}
            {hasMultipleSizes && (
              <p className="text-xs text-gray-500 mt-1">{product.sizes.length} sizes available</p>
            )}
          </div>
        </div>

        {/* {/* Brand */}
        {/* {product.brand?.name && ( */}
        {/*   <p className="text-sm text-gray-500 mb-2"> */}
        {/*     Brand: <span className="font-medium">{product.brand.name}</span> */}
        {/*   </p> */}
        {/* )} */}

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {product.shortDescription}
        </p>

        {/* Size Details */}
        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Available Sizes:</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes?.map((size: any, index: number) => (
              <div
                key={index}
                className="text-xs bg-gray-100 px-2 py-1 rounded border border-gray-200"
              >
                <span className="font-medium">{size.label}</span>
                <span className="text-emerald-600 ml-1">(₹{size.price.toFixed(2)})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category & Subcategory Tags */}
        <div className="flex flex-wrap gap-2 text-xs mb-4">
          {product.category?.name && (
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {product.category.name}
            </span>
          )}
          {product.subcategory?.name && (
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
              {product.subcategory.name}
            </span>
          )}
        </div>

        {/* Stock & CTA */}
        <div className="flex justify-between items-center">
          <span
            className={`text-sm font-medium ${totalStock > 0 ? "text-green-600" : "text-red-500"
              }`}
          >
            {totalStock > 0 ? `${totalStock} in stock` : "Out of stock"}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="text-sm px-3 py-1.5 rounded bg-green-600 hover:bg-green-700 text-white shadow transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
