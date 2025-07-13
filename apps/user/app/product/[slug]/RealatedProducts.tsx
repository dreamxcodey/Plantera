import Link from "next/link";
import Image from "next/image";

export default function RelatedProducts({ products  }: {
  products: any[];
}) {
  if (products.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="aspect-square relative">
              <Image
                src={product.sizes.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.mrp && product.mrp > product.price && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {Math.round((1 - product.price / product.mrp) * 100)}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
              {product.brand && (
                <p className="text-sm text-gray-500 mb-2">{product.brand.name}</p>
              )}
              <div className="flex items-center">
                <span className="text-green-700 font-bold">₹{product.price.toLocaleString()}</span>
                {product.mrp && product.mrp > product.price && (
                  <span className="text-gray-500 text-sm line-through ml-2">
                    ₹{product.mrp.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
