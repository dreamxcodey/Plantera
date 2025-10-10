import prisma from '@repo/db';
import CategoryCard from '../components/categoryCard';
import ProductCard from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSideBar';

export default async function CategoriesPage(
  {
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
  // Fetch all categories with products count
  // const products = await prisma.product.findMany({
  //   include: {
  //     sizes: { orderBy: { price: "asc" } },
  //     category: true,
  //     subcategory: true,
  //     brand: true,
  //     _count: { select: { reviews: true } },
  //   },
  //   orderBy: { createdAt: "desc" },
  // });
  const [categories, brands, allTags] = await Promise.all([
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    }),
    prisma.brand.findMany(),
    prisma.product.findMany({
      select: { tags: true },
    }),
  ]);

  // Get price range
  const priceRange = {
    min: 99, // Calculate this from your data
    max: 1000, // Calculate this from your data
  };

  const uniqueTags = Array.from(
    new Set(allTags.flatMap(p => p.tags).filter(Boolean))
  );
  const allProducts = await prisma.product.findMany({
    take: 12,
    include: {

      sizes: {  // Changed from 'productSizes' to 'sizes' to match your schema
        orderBy: {
          price: 'asc' // Sort sizes by price ascending to ensure smallest price first
        }
      },
      category: true,
      subcategory: true,
      reviews: true,
      brand: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  // console.log("All products:", allProducts);


  return (
    <div className="max-w-7xl pt-10 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Plant Categories</h1>
        <p className="text-gray-600">
          Explore our wide variety of plant categories and find the perfect plants for your home
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <FilterSidebar
            filterOptions={{
              categories: categories.map(c => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                count: c._count.products,
              })),
              brands: brands.map(b => ({
                id: b.id,
                name: b.name,
                slug: b.slug,
              })),
              tags: uniqueTags,
              priceRange,
            }}
            searchParams={searchParams}
          />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Categories Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-green-800 mb-6">Browse Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={{
                    ...category,
                    products: category._count.products
                  }}
                />
              ))}
            </div>
          </section>

          {/* All Plants Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-green-800">All Plants</h2>
              <div className="text-sm text-emerald-600">
                Showing {allProducts.length} plants
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
