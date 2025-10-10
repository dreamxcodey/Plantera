import Link from 'next/link';

export default function SubcategoryCard({ subcategory }: { subcategory: any }) {
  return (
    <Link href={`/categories/${subcategory.category.slug}/${subcategory.slug}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 border border-green-100 hover:shadow-md transition-all duration-200 hover:border-emerald-300">
        <h3 className="font-medium text-green-800">{subcategory.name}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {subcategory.products.length} plants
        </p>
      </div>
    </Link>
  );
}
