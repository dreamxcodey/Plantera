
// app/products/[slug]/page.tsx
import prisma from "@repo/db";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      subcategory: true,
    },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      {product.image && (
        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded mb-4" />
      )}
      <p className="text-xl font-semibold text-green-600 mb-2">₹{product.price}</p>
      <div className="mb-2">
        <span className="text-sm text-gray-700 mr-4">Category: {product.category?.name}</span>
        <span className="text-sm text-gray-700">Subcategory: {product.subcategory?.name}</span>
      </div>
      <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </p>
    </div>
  );
}
