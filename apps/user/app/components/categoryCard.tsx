import Link from 'next/link';
import Image from 'next/image';

export default function CategoryCard({ category }: { category: any }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block h-full"
      aria-label={`Browse ${category.name} category`}
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
        {/* Image container with gradient overlay */}
        <div className="relative h-48 bg-gradient-to-br from-green-50 to-emerald-50 overflow-hidden">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              unoptimized={true} // For external URLs that Next.js can't optimize
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 to-emerald-900/5" />
          {/* Category badge */}
          <span className="absolute top-3 right-3 bg-white/90 text-emerald-700 text-xs font-medium px-2.5 py-0.5 rounded-full shadow-sm">
            {category.products || 0}+
          </span>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-green-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {category.products || 0} varieties available
          </p>

          {/* CTA Button (appears on hover) */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-flex items-center text-emerald-600 text-sm font-medium">
              Explore collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
