"use client"
import { useState } from 'react';
import { Star } from 'lucide-react';

export default function ProductTabs({
  fullDescription,
  specifications,
  reviews
}: {
  fullDescription: string;
  specifications: any;
  reviews: any[];
}) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className=" p-6 rounded-xl shadow-sm mt-8">
      <div className="border-b">
        <div className="flex space-x-8">
          <button
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${activeTab === 'description'
              ? 'border-green-600 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${activeTab === 'specifications'
              ? 'border-green-600 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('specifications')}
          >
            Specifications
          </button>
          <button
            className={`py-3 px-1 font-medium border-b-2 transition-colors ${activeTab === 'reviews'
              ? 'border-green-600 text-gray-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </div>
      </div>

      <div className="py-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            {fullDescription.split('\n').map((para, idx) => (
              <p key={idx} className="mb-4 text-gray-700">
                {para}
              </p>
            ))}
          </div>
        )}

        {activeTab === 'specifications' && specifications && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specifications).map(([key, value], idx) => (
              <div key={idx} className="flex border-b pb-2">
                <span className="text-gray-600 font-medium w-1/3 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="text-gray-800 w-2/3">{value as string}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            {reviews.length > 0 ? (
              <div>
                <div className="flex items-center mb-6">
                  <div className="text-4xl font-bold mr-4">
                    {reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length}
                  </div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < Math.floor(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">Based on {reviews.length} reviews</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review, idx) => (
                    <div key={idx} className="border-b pb-6 last:border-0">
                      <div className="flex items-center mb-2">
                        <div className="flex mr-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <h4 className="font-bold">{review.title}</h4>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <p className="text-sm text-gray-500">
                        by {review.user?.name || 'Anonymous'} • {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <button key={i} type="button" className="text-gray-300 hover:text-yellow-400">
                        <Star size={24} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Summary of your experience"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Review</label>
                  <textarea
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    placeholder="Share your experience with this product"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
