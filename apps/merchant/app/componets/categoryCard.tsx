import Link from 'next/link';
import Image from 'next/image';

export default function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 group">
        <div className="relative h-48 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-green-800 group-hover:text-emerald-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {category.products.length} plants
          </p>
        </div>
      </div>
    </Link>
  );
}
