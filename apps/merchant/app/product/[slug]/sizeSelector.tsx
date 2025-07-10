// components/SizeSelector.tsx
import Link from "next/link";

export default function SizeSelector({
  sizes,
  selectedSize,
  productSlug
}: {
  sizes: any[];
  selectedSize: any;
  productSlug: string;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {sizes.map((size) => (
        <Link
          key={size.id}
          href={`/product/${productSlug}?size=${size.id}`}
          scroll={false}
          className={`border rounded-lg p-3 transition-colors ${selectedSize.id === size.id
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-green-300'
            }`}
        >
          <div className="font-medium">{size.label}</div>
          <div className="text-gray-600 text-sm">{size.dimension}</div>
          <div className="font-bold text-green-700 mt-1">₹{size.price.toFixed(2)}</div>
          <div className={`text-xs mt-1 ${size.stock > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
            {size.stock > 0 ? `${size.stock} available` : 'Out of stock'}
          </div>
        </Link>
      ))}
    </div>
  );
}
