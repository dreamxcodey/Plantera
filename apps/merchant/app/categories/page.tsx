import prisma from '@repo/db';
import CategoryCard from '../componets/categoryCard';
import ProductCard from '../componets/ProductCard';
import FilterSidebar from '../componets/FilterSideBar';

export default async function CategoriesPage() {
  // Fetch all categories with products count
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      },
      products: {
        take: 4,
        include: {
          sizes: {  // Changed from 'productSizes' to 'sizes' to match your schema
            orderBy: {
              price: 'asc' // Sort sizes by price ascending to ensure smallest price first
            }
          },
          category: true,
          subcategory: true,
          reviews: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });

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

  // // Get min and max prices for filters
  // const priceRange = await prisma.product.aggregate({
  //   _min: { price: true },
  //   _max: { price: true },
  // });

  // Fetch brands for filters
  const brands = await prisma.brand.findMany();

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
          {/* <FilterSidebar */}
          {/*   categories={categories} */}
          {/*   brands={brands} */}
          {/*   minPrice={priceRange._min.price || 0} */}
          {/*   maxPrice={priceRange._max.price || 10000} */}
          {/* /> */}
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
