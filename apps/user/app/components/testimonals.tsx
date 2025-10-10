import Image from "next/image";
export default function Testimonials() {
  return (
    <section>
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-green-700 max-w-2xl mx-auto">
              Real stories from fellow plant lovers across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Andhra Pradesh style */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-green-800 mb-6">
                "I'm from Vijayawada, and I must say the packaging was solid and
                the plants were fresh like morning market veggies. My mother
                loved the Tulsi and indoor bamboo — perfect gift!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold text-xl">KR</span>
                </div>
                <div>
                  <h4 className="font-bold text-green-900">Karthik Reddy</h4>
                  <p className="text-green-700">Vijayawada, AP</p>
                </div>
              </div>
            </div>

            {/* Karnataka style */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-green-800 mb-6">
                "I'm based in Bengaluru and ordered a couple of succulents for
                my office desk. The look and quality are top-notch. Got them
                within 2 days. Namma Bengaluru plants are now looking better!"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold text-xl">SN</span>
                </div>
                <div>
                  <h4 className="font-bold text-green-900">Shruthi N.</h4>
                  <p className="text-green-700">Bengaluru, KA</p>
                </div>
              </div>
            </div>

            {/* Generic urban plant lover */}
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
              <div className="flex items-center mb-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-green-800 mb-6">
                "These guys are serious about greenery. From eco-friendly
                packaging to detailed plant care guides, I've never felt more
                confident bringing home new plants."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <span className="text-green-800 font-bold text-xl">RM</span>
                </div>
                <div>
                  <h4 className="font-bold text-green-900">Ritika Mehta</h4>
                  <p className="text-green-700">Mumbai, MH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
