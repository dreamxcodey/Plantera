import prisma from '@repo/db';
import { notFound } from 'next/navigation';
import ProductCard from '../../../components/ProductCard';
import Link from 'next/link';

export default async function SubcategoryPage({
  params,
  searchParams,
}: {
  params: { categorySlug: string; subcategorySlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch the current category and subcategory
  const category = await prisma.category.findUnique({
    where: { slug: params.categorySlug },
  });

  const subcategory = await prisma.subcategory.findUnique({
    where: {
      slug: params.subcategorySlug,
      category: { slug: params.categorySlug }
    },
  });

  if (!category || !subcategory) notFound();

  // Parse filter parameters
  // const categoryFilter = [category.slug];
  const brandFilter = typeof searchParams.brand === 'string'
    ? [searchParams.brand]
    : Array.isArray(searchParams.brand)
      ? searchParams.brand
      : [];
  const inStock = searchParams.inStock === 'true';
  const ratingFilter = searchParams.rating ? Number(searchParams.rating) : undefined;

  // Fetch products with filters
  const products = await prisma.product.findMany({
    where: {
      subcategory: { slug: params.subcategorySlug },
      brand: brandFilter.length > 0 ? { slug: { in: brandFilter } } : undefined,
      stock: inStock ? { gt: 0 } : undefined,
      reviews: ratingFilter ? {
        some: {
          rating: { gte: ratingFilter }
        }
      } : undefined,
    },
    include: {
      sizes: {  // Changed from 'productSizes' to 'sizes' to match your schema
        orderBy: {
          price: 'asc' // Sort sizes by price ascending to ensure smallest price first
        }
      },
      category: true,
      subcategory: true,
      brand: true,
      reviews: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Fetch brands for this subcategory
  // const brands = await prisma.brand.findMany({
  //   where: {
  //     products: {
  //       some: {
  //         subcategory: { slug: params.subcategorySlug }
  //       }
  //     }
  //   }
  // });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Link href="/categories" className="hover:text-emerald-600">Categories</Link>
          <span className="mx-2">/</span>
          <Link href={`/categories/${category.slug}`} className="hover:text-emerald-600">
            {category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-emerald-600">{subcategory.name}</span>
        </div>

        <h1 className="text-3xl font-bold text-green-800 mb-2">{subcategory.name}</h1>
        <p className="text-gray-600">
          Explore our collection of {subcategory.name} plants
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        {/* <div className="lg:col-span-1"> */}
        {/*   <FilterSidebar */}
        {/*     categories={[category]} */}
        {/*     brands={brands} */}
        {/*     minPrice={priceRange._min.price || 0} */}
        {/*     maxPrice={priceRange._max.price || 10000} */}
        {/*   /> */}
        {/* </div> */}

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Products */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-800">
                {subcategory.name} Plants
              </h2>
              <div className="text-sm text-emerald-600">
                Showing {products.length} plants
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 text-center border border-green-100">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No plants found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find what youre looking for
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
