import Image from "next/image"

export default function HomeHero() {
  return (

      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50"></div>
          <div className="absolute top-20 right-0 w-2/3 h-96 bg-green-200 rounded-l-full opacity-20"></div>
          <div className="absolute top-40 left-0 w-1/3 h-64 bg-emerald-300 rounded-r-full opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight mb-4">
                Bring Nature <br />
                Into Your <span className="text-emerald-600">Home</span>
              </h1>
              <p className="text-lg text-green-700 mb-8 max-w-lg">
                Discover the perfect plants to transform your space. Our
                collection of hand-picked greenery will breathe life into your
                home.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition duration-300 shadow-lg hover:shadow-emerald-200">
                  Shop Plants
                </button>
                <button className="px-8 py-3 bg-white text-emerald-600 border border-emerald-600 rounded-full font-medium hover:bg-emerald-50 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>


            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className=" p-4 rounded-2xl shadow-lg">
                <Image
                  src="/plant.avif"
                  alt="Large Monstera plant"
                  width={256}
                  height={456}
                  className="rounded-xl w-full "
                />
              </div>
              <div className="mt-10">
                <div className=" p-4 rounded-2xl shadow-lg mb-4">
                  <Image
                    src="/more.avif"
                    alt="Small potted plant"
                    width={256}
                    height={128}
                    className="rounded-xl w-full h-28+ object-cover"
                  />
                </div>
                <div className="p-4 rounded-2xl shadow-lg">
                  <Image
                    src="/ti.jpg"
                    alt="Small succulent plant"
                    width={256}
                    height={228}
                    className="rounded-xl w-full h-34 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )

}