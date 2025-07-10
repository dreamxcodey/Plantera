import prisma from '@repo/db'
import { notFound } from 'next/navigation';
import ProductCard from '../../componets/ProductCard';
import FilterSidebar from '../../componets/FilterSideBar';
import SubcategoryCard from '../../componets/subCategoryCard';

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { categorySlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch the current category
  const category = await prisma.category.findUnique({
    where: { slug: params.categorySlug },
    include: {
      subcategories: {
        include: {
          _count: {
            select: { products: true }
          }
        }
      }
    }
  });

  if (!category) notFound();

  // Parse filter parameters
  const categoryFilter = [category.slug];
  const brandFilter = typeof searchParams.brand === 'string'
    ? [searchParams.brand]
    : Array.isArray(searchParams.brand)
      ? searchParams.brand
      : [];
  const minPrice = searchParams.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined;
  const inStock = searchParams.inStock === 'true';
  const ratingFilter = searchParams.rating ? Number(searchParams.rating) : undefined;

  // Fetch products with filters
  const products = await prisma.product.findMany({
    where: {
      category: { slug: params.categorySlug },
      brand: brandFilter.length > 0 ? { slug: { in: brandFilter } } : undefined,
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
      stock: inStock ? { gt: 0 } : undefined,
      reviews: ratingFilter ? {
        some: {
          rating: { gte: ratingFilter }
        }
      } : undefined,
    },
    include: {
      category: true,
      subcategory: true,
      brand: true,
      reviews: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Get min and max prices for filters
  const priceRange = await prisma.product.aggregate({
    where: { category: { slug: params.categorySlug } },
    _min: { price: true },
    _max: { price: true },
  });

  // Fetch brands for this category
  const brands = await prisma.brand.findMany({
    where: {
      products: {
        some: {
          category: { slug: params.categorySlug }
        }
      }
    }
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">{category.name}</h1>
        <p className="text-gray-600">
          Explore our collection of {category.name} plants
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            categories={[category]}
            brands={brands}
            minPrice={priceRange._min.price || 0}
            maxPrice={priceRange._max.price || 10000}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Subcategories */}
          {category.subcategories.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Subcategories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.subcategories.map(subcategory => (
                  <SubcategoryCard
                    key={subcategory.id}
                    subcategory={{
                      ...subcategory,
                      category: category,
                      products: subcategory._count.products
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Products */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-800">
                {category.name} Plants
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
                  Try adjusting your filters to find what you're looking for
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
