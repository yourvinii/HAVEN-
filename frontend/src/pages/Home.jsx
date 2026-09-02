function Home() {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          Find Your Perfect Rental Home
        </h1>

        <p className="mt-4 max-w-xl text-lg text-gray-600">
          Discover rental properties that fit your needs with KDRent.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800">
            Find a Property
          </button>

          <button className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-100">
            List Your Property
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;