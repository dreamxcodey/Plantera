import {
  Star,
  ShoppingCart,
  Package,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";
import prisma from "@repo/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "./ImageGallery";
import Image from "next/image";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RealatedProducts";
import AddToCart from "./AddCart";
import SizeSelector from "./sizeSelector"; // New component

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { size?: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      sizes: {
        orderBy: {
          price: 'asc'
        }
      },
      category: true,
      subcategory: true,
      brand: true,
      attributes: true,
      reviews: {
        include: { user: true },
      },
    },
  });

  if (!product) return notFound();

  // Get selected size from URL or default to first size
  const selectedSizeId = searchParams.size
    ? parseInt(searchParams.size)
    : product.sizes[0]?.id;

  const selectedSize = product.sizes.find(size => size.id === selectedSizeId) || product.sizes[0];

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length
      : 0;

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 4,
    include: {
      sizes: true,
      brand: true
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gradient-to-r from-green-50 to-emerald-50">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6 flex items-center">
        <Link href="/" className="hover:text-green-600 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/categories/${product.category.slug}`}
          className="hover:text-green-600 transition-colors"
        >
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/categories/${product.category.slug}/${product.subcategory.slug}`}
          className="hover:text-green-600 transition-colors"
        >
          {product.subcategory.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium truncate max-w-xs">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="p-4 rounded-xl border border-gray-100">
          <div className="p-4 rounded-xl shadow border border-green-100">
            <ImageGallery images={selectedSize?.images} />
          </div>
        </div>

        {/* Product Details */}
        <div className="p-2">
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < Math.floor(avgRating)
                        ? "text-yellow-500 fill-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.reviews.length} reviews
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span
                className={`text-sm font-medium ${selectedSize?.stock > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {selectedSize?.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {product.brand && (
              <div className="mb-4">
                <span className="text-gray-600">Brand: </span>
                <Link
                  href={`/brand/${product.brand.slug}`}
                  className="font-medium text-green-700 hover:underline"
                >
                  {product.brand.name}
                </Link>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{selectedSize?.price.toFixed(2)}
                </span>
                {product.mrp && product.mrp > selectedSize.price && (
                  <>
                    <span className="text-gray-500 line-through">
                      ₹{product.mrp.toFixed(2)}
                    </span>
                    <span className="text-green-600 font-medium">
                      {Math.round(
                        (1 - selectedSize.price / product.mrp) * 100
                      )}% off
                    </span>
                  </>
                )}
              </div>
              {product.taxInfo && (
                <p className="text-sm text-gray-500 mt-1">
                  + {product.taxInfo}
                </p>
              )}
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                Available Sizes:
              </h3>
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                productSlug={product.slug}
              />
            </div>

            {/* Key Features */}
            {product.attributes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  Key Features:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.attributes.map((attr, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700">
                        <span className="font-medium">{attr.name}:</span>{" "}
                        {attr.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCart product={product} selectedSize={selectedSize} />
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center p-3 rounded-lg border border-gray-100">
              <div className="bg-green-50 p-2 rounded-full mr-3">
                <Truck className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-500">Delivery in 2-4 days</p>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg border border-gray-100">
              <div className="bg-green-50 p-2 rounded-full mr-3">
                <Package className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">10 Day Policy</p>
              </div>
            </div>
            <div className="flex items-center p-3 rounded-lg border border-gray-100">
              <div className="bg-green-50 p-2 rounded-full mr-3">
                <ShieldCheck className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900"> Warranty</p>
                <p className="text-xs text-gray-500">Genuine Parts</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <ProductTabs
        fullDescription={product.fullDescription || product.description}
        specifications={product.specifications}
        reviews={product.reviews}
      />

      {/* Related Products */}
      <RelatedProducts products={relatedProducts} currentProduct={product} />
    </div>
  );
}
