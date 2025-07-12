// app/products/page.tsx
import Link from "next/link";
import prisma from "@repo/db";
import ProductCard from "../componets/ProductCard"
import FilterSidebar from "../componets/FilterSideBar"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Parse filter parameters
  const selectedCategories = searchParams.category
    ? Array.isArray(searchParams.category)
      ? searchParams.category
      : [searchParams.category]
    : [];
  const selectedBrands = searchParams.brand
    ? Array.isArray(searchParams.brand)
      ? searchParams.brand
      : [searchParams.brand]
    : [];
  const minPriceParam = searchParams.minPrice
    ? parseFloat(searchParams.minPrice as string)
    : undefined;
  const maxPriceParam = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice as string)
    : undefined;
  const inStock = searchParams.inStock === "true";



  const selectedTags = searchParams.tag
    ? Array.isArray(searchParams.tag)
      ? searchParams.tag
      : [searchParams.tag]
    : [];

  const selectedSubcategories = searchParams.subcategory
    ? Array.isArray(searchParams.subcategory)
      ? searchParams.subcategory
      : [searchParams.subcategory]
    : [];

  // Build where clause for filtering
  const where: any = {};

  if (selectedCategories.length > 0) {
    where.category = { slug: { in: selectedCategories } };
  }

  if (selectedBrands.length > 0) {
    where.brand = { slug: { in: selectedBrands } };
  }

  if (selectedSubcategories.length > 0) {
    where.subcategory = { slug: { in: selectedSubcategories } };
  }

  if (selectedTags.length > 0) {
    where.tags = { hasEvery: selectedTags };
  }
  // Price filter based on product sizes
  if (minPriceParam !== undefined || maxPriceParam !== undefined) {
    where.OR = [
      // Products with sizes in the price range
      {
        sizes: {
          some: {
            price: {
              gte: minPriceParam || 0,
              lte: maxPriceParam || Number.MAX_SAFE_INTEGER,
            },
          },
        },
      },
      // Products without sizes but with defaultPrice in range
      {
        sizes: { none: {} },
        defaultPrice: {
          gte: minPriceParam || 0,
          lte: maxPriceParam || Number.MAX_SAFE_INTEGER,
        },
      },
    ];
  }

  // Stock availability filter
  if (inStock) {
    where.OR = [
      { sizes: { some: { stock: { gt: 0 } } } },
      { sizes: { none: {} }, stock: { gt: 0 } },
    ];
  }

  // Fetch products with filtering
  const products = await prisma.product.findMany({
    where,
    include: {
      sizes: { orderBy: { price: "asc" } },
      category: true,
      subcategory: true,
      brand: true,
      _count: { select: { reviews: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Get categories and brands for sidebar
  const [categories, brands, allTags] = await Promise.all([
    prisma.category.findMany({
      include: { _count: { select: { products: true } } },
    }),
    prisma.brand.findMany(),
    prisma.product.findMany({
      distinct: ['tags'],
      select: { tags: true }
    })
  ]);
  // Calculate global price range
  const sizePrices = await prisma.productSize.aggregate({
    _min: { price: true },
    _max: { price: true },
  });

  const defaultPrices = await prisma.product.aggregate({
    _min: { defaultPrice: true },
    _max: { defaultPrice: true },
    where: { sizes: { none: {} }, defaultPrice: { not: null } },
  });

  const uniqueTags = Array.from(
    new Set(allTags.flatMap(p => p.tags).filter(Boolean)
    ));
  const minPrice = Math.min(
    sizePrices._min.price || Infinity,
    defaultPrices._min.defaultPrice || Infinity
  );
  const maxPrice = Math.max(
    sizePrices._max.price || 0,
    defaultPrices._max.defaultPrice || 0
  );

  return (
    <div className="mt-16 max-w-6xl mx-20 ">

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-64">
          <FilterSidebar
            categories={categories}
            brands={brands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            tags={uniqueTags}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
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

              // Calculate total stock
              const totalStock = hasSizes
                ? product.sizes.reduce((sum, size) => sum + size.stock, 0)
                : product.stock;

              return (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    priceDisplay,
                    totalStock,
                    brandName: product.brand?.name || "",
                    reviewCount: product._count.reviews,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
