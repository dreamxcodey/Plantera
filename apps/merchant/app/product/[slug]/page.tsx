import { Star, ShoppingCart, Package, ShieldCheck, Truck, Heart } from 'lucide-react';
import prisma from "@repo/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "./ImageGallery";
import AddToCart from "./AddCart";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RealatedProducts";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      subcategory: true,
      brand: true,
      attributes: true,
      reviews: {
        include: { user: true }
      }
    },
  });

  if (!product) return notFound();

  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  // Find related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    take: 4,
    include: { brand: true }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link>
        {' > '}
        <Link href={`/category/${product.category.slug}`} className="hover:text-green-600">
          {product.category.name}
        </Link>
        {' > '}
        <Link href={`/subcategory/${product.subcategory.slug}`} className="hover:text-green-600">
          {product.subcategory.name}
        </Link>
        {' > '}
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <ImageGallery images={product.images} />
        </div>

        {/* Product Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="border-b pb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(avgRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.reviews.length} reviews
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.brand && (
              <div className="mb-4">
                <span className="text-gray-600">Brand: </span>
                <Link
                  href={`/brand/${product.brand.slug}`}
                  className="font-medium hover:text-green-600"
                >
                  {product.brand.name}
                </Link>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-green-700">₹{product.price.toLocaleString()}</span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-gray-500 line-through">₹{product.mrp.toLocaleString()}</span>
                )}
                {product.mrp && product.mrp > product.price && (
                  <span className="text-green-600 font-medium">
                    {Math.round((1 - product.price / product.mrp) * 100)}% off
                  </span>
                )}
              </div>
              {product.taxInfo && (
                <p className="text-sm text-gray-500 mt-1">
                  + {product.taxInfo}
                </p>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.shortDescription}</p>

            {/* Key Features */}
            {product.attributes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Key Features:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.attributes.map((attr, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-600">{attr.name}: {attr.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Section */}
            <AddToCart product={product} />
          </div>

          {/* Shipping & Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center">
              <Truck className="text-green-600 mr-2" size={20} />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-xs text-gray-500">Delivery in 2-4 days</p>
              </div>
            </div>
            <div className="flex items-center">
              <Package className="text-green-600 mr-2" size={20} />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30 Day Policy</p>
              </div>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="text-green-600 mr-2" size={20} />
              <div>
                <p className="font-medium">1 Year Warranty</p>
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
