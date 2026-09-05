function PropertyFilters() {
  return (
    <aside className="rounded-2xl border border-gray-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-gray-900">
        Filters
      </h2>

      {/* Location */}
      <div className="mt-6">
        <label className="text-sm font-medium text-gray-700">
          Location
        </label>

        <input
          type="text"
          placeholder="e.g. Shahdol"
          className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-gray-900"
        />
      </div>

      {/* Property Type */}
      <div className="mt-5">
        <label className="text-sm font-medium text-gray-700">
          Property Type
        </label>

        <select className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-gray-900">
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="flat">Flat</option>
          <option value="room">Room</option>
        </select>
      </div>

      {/* Max Rent */}
      <div className="mt-5">
        <label className="text-sm font-medium text-gray-700">
          Maximum Rent
        </label>

        <select className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-gray-900">
          <option value="">Any Price</option>
          <option value="5000">₹5,000</option>
          <option value="10000">₹10,000</option>
          <option value="15000">₹15,000</option>
          <option value="20000">₹20,000</option>
        </select>
      </div>

      {/* Bedrooms */}
      <div className="mt-5">
        <label className="text-sm font-medium text-gray-700">
          Bedrooms
        </label>

        <select className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-gray-900">
          <option value="">Any</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4+ Bedrooms</option>
        </select>
      </div>

      <button className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-800">
        Apply Filters
      </button>
    </aside>
  );
}

export default PropertyFilters;