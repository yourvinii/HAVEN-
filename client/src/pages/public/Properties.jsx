function Properties() {
  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Explore Rentals
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Find Your Perfect Rental
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Browse rental properties and find a place that fits your needs
            and budget.
          </p>

          {/* Search */}
          <div className="mt-8 flex max-w-3xl flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Search by location, property name..."
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900"
            />

            <button className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition hover:bg-gray-800">
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Properties;