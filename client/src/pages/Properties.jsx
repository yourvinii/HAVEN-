import React, { useEffect, useState } from "react";
import { getAllProperties } from "../api/propertyApi";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();

        setProperties(data.properties || []);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load properties",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            KDRent
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Find your perfect property
          </h1>

          <p className="mt-3 text-gray-600">
            Browse available rooms, flats, houses, PGs and hostels.
          </p>
        </div>

        {loading && (
          <div className="mt-10 rounded-xl border bg-white p-6">
            <p className="text-gray-600">Loading properties...</p>
          </div>
        )}

        {error && (
          <div className="mt-10 rounded-xl border bg-white p-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && properties.length === 0 && (
          <div className="mt-10 rounded-xl border bg-white p-6">
            <p className="text-gray-500">
              No properties available right now.
            </p>
          </div>
        )}

        {!loading && !error && properties.length > 0 && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div
                key={property._id}
                className="overflow-hidden rounded-xl border bg-white"
              >
                <div className="flex h-48 items-center justify-center bg-gray-100">
                  <span className="text-gray-400">No Image</span>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {property.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {property.city} · {property.propertyType}
                  </p>

                  <p className="mt-4 text-lg font-bold text-gray-900">
                    ₹{property.rent}
                    <span className="text-sm font-normal text-gray-500">
                      {" "}
                      / month
                    </span>
                  </p>

                  <div className="mt-4 flex gap-4 text-sm text-gray-600">
                    <span>{property.bedrooms} Beds</span>
                    <span>{property.bathrooms} Baths</span>
                    <span>{property.area} sq.ft</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Properties;
