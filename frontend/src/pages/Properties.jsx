import Navbar from "../components/Navbar";

function Properties() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Rental Properties
          </h1>

          <p className="mt-2 text-gray-600">
            Find a property that fits your needs.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-semibold">
              Property Listings
            </h2>

            <p className="mt-2 text-gray-500">
              Properties will appear here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Properties;