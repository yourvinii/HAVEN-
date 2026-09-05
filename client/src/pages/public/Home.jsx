import PropertyCard from "../../components/property/PropertyCard";

function Home() {
  const featuredProperties = [
    {
      id: 1,
      title: "Spacious 2 BHK House",
      location: "Burhar, Shahdol",
      price: "8,000/month",
      type: "House",
      beds: 2,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Comfortable 1 BHK Flat",
      location: "Shahdol, Madhya Pradesh",
      price: "6,500/month",
      type: "Flat",
      beds: 1,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Affordable Rental Room",
      location: "Sohagpur, Shahdol",
      price: "4,000/month",
      type: "Room",
      beds: 1,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    },
  ];
  return (

    <>
   
    
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
            Discover rental properties, connect with property owners, and find a
            home that fits your needs.
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
    <section className="bg-white">
  <div className="mx-auto max-w-7xl px-6 py-20">

    <div className="flex items-end justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          Explore
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Featured Properties
        </h2>

        <p className="mt-3 text-gray-600">
          Explore some of the best rental properties available on KDRent.
        </p>
      </div>

      <button className="hidden text-sm font-semibold text-gray-900 md:block">
        View all →
      </button>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredProperties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>

  </div>
</section>
     </>
    
  );
}

export default Home;
