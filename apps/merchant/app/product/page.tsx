import Link from "next/link";
import prisma from "@repo/db";
import ProductCard from "../componets/ProductCard";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      sizes: {
        orderBy: {
          price: "asc",
        },
      },
      category: true,
      subcategory: true,
      brand: true, // Include brand information
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mt-16 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Plant Collection</h1>
        <Link
          href="/product/add"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Add New Plant
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          // Calculate price display
          const hasSizes = product.sizes.length > 0;
          const minPrice = hasSizes
            ? Math.min(...product.sizes.map((size) => size.price))
            : product.defaultPrice || 0;
          const maxPrice = hasSizes
            ? Math.max(...product.sizes.map((size) => size.price))
            : product.defaultPrice || 0;
          const priceDisplay = hasSizes
            ? minPrice === maxPrice
              ? `₹${minPrice}`
              : `₹${minPrice} - ₹${maxPrice}`
            : product.defaultPrice
              ? `₹${product.defaultPrice}`
              : "Price not available";

          // Prepare size details
          const sizeDetails = product.sizes.map((size) => ({
            dimension: size.dimension,
            label: size.label,
            price: size.price,
            stock: size.stock,
          }));

          return (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                priceDisplay,
                sizeDetails,
                brandName: product.brand?.name || "",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
