'use client';
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';

export default function AddToCart({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    // Implement cart logic
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {product.stock} available
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors ${product.stock === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className={`px-6 py-3 rounded-md font-medium transition-colors ${product.stock === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
            }`}
        >
          Buy Now
        </button>

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-3 border rounded-md transition-colors ${isWishlisted
              ? 'bg-red-50 border-red-200 text-red-500'
              : 'hover:bg-gray-100'
            }`}
        >
          <Heart
            size={24}
            className={isWishlisted ? 'fill-red-500' : ''}
          />
        </button>
      </div>
    </div>
  );
}
