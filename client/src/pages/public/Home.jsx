function Home() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        
        {/* Hero Content */}
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Find a place you can call home
          </p>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Find your perfect
            <span className="block">rental home with KDRent.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover rental properties, connect with property owners,
            and find a home that fits your needs.
          </p>
        </div>

        {/* Search Box */}
        <div className="mt-10 rounded-2xl bg-white p-4 shadow-lg">
          <div className="grid gap-4 md:grid-cols-4">
            
            <input
              type="text"
              placeholder="Search location"
              className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400"
            />

            <select className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400">
              <option value="">Property Type</option>
              <option value="room">Room</option>
              <option value="flat">Flat</option>
              <option value="house">House</option>
            </select>

            <select className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-gray-400">
              <option value="">Budget</option>
              <option value="5000">Under ₹5,000</option>
              <option value="10000">Under ₹10,000</option>
              <option value="15000">Under ₹15,000</option>
            </select>

            <button className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800">
              Search Properties
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Home;