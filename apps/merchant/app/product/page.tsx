import Link from "next/link";
import prisma from "@repo/db";
import ProductCard from "../componets/ProductCard";
export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      subcategory: true,
    },
    orderBy: { createdAt: "desc" }
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
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
