'use client';

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  const [hovered, setHovered] = useState(false);
  const images = product.images ?? [];

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {images.length > 0 && (
        <img
          src={hovered && images[1] ? images[1] : images[0]}
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
          <span className="text-lg font-bold text-emerald-600">
            ₹{product.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">
          {product.description}
        </p>

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
          <span className={`text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
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
