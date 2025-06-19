import Image from "next/image";

export default function PlantSection() {
  const featuredProducts = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: "₹34.99",
      image: "/small.avif",
    },
    {
      id: 2,
      name: "Snake Plant",
      price: "₹24.99",
      image: "/small.avif",
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      price: "₹49.99",
      image: "/small.avif",
    },
    {
      id: 4,
      name: "Pothos Golden",
      price: "₹19.99",
      image: "/small.avif",
    },
  ];

  const categories = [
    {
      id: 1,
      name: "Indoor Plants",
      image:
        "https://images.unsplash.com/photo-1625582598943-2445bb7b8253?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Outdoor Plants",
      image:
        "https://images.unsplash.com/photo-1747174470273-4af6d08fd918?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuZ28lMjBwbGFudHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      name: "Succulents",
      image:
        "https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN1Y2N1bGVudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      name: "Plant Accessories",
      image: "/tools.avif",
    },
  ];

  return (
    <section>
      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Plant Categories
            </h2>
            <p className="text-green-700 max-w-lg mx-auto">
              Explore our diverse collection of plants curated for every space
              and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex items-end p-6">
                  <h3 className="text-white text-xl font-bold group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-2">
                Featured Plants
              </h2>
              <p className="text-green-700">
                Our most popular green companions
              </p>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-2 border-2 border-emerald-600 text-emerald-600 rounded-full font-medium hover:bg-emerald-600 hover:text-white transition duration-300">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-emerald-600 font-semibold mb-4">
                    {product.price}
                  </p>
                  <button className="w-full py-3 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
