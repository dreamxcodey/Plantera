'use client'
import Link from "next/link";
import prisma from "@repo/db";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      subcategory: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return (


    <div className=" mt-16 max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Plant Collection</h1>
        <Link
          href="/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add New Plant
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <span className="text-lg font-bold text-green-600">
                  ₹{product.price.toFixed(2)}
                </span>
              </div>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {product.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {product.category?.name}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {product.subcategory?.name}
                </span>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
                <Link
                  href={`/product/${product.slug}`}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
