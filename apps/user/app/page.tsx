"use client";

import Footer from "./components/footer";
import HomeHero from "./components/homehero";
// import Navbar from "./components/navbar";
import PlantSection from "./components/plantsection";
import ProductCard from "./components/ProductCard";
import Testimonials from "./components/testimonals";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FBF7]">
      {/* <Navbar /> */}

      <HomeHero />
      <PlantSection />

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Why Choose Plantera
            </h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Were passionate about helping you create a greener, healthier
              living space with our premium plants and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-green-700">
                Each plant is carefully selected and nurtured to ensure it
                arrives at your doorstep in perfect condition.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Nationwide Delivery
              </h3>
              <p className="text-green-700">
                We ship our plants with care to anywhere in the country,
                ensuring they arrive fresh and healthy.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-900 mb-3">
                Expert Advice
              </h3>
              <p className="text-green-700">
                Our plant specialists are available to help you choose the
                perfect plants and care for them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      {/* Newsletter */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Our Green Community
            </h2>
            <p className="text-emerald-100 mb-8 text-lg">
              Subscribe for plant care tips, exclusive offers, and new arrivals
              — straight to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:flex-1 px-6 py-3 rounded-full text-sm focus:outline-none focus:ring-2 ring-emerald-300 placeholder:text-emerald-400"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-green-800 text-white rounded-full font-semibold hover:bg-green-900 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
