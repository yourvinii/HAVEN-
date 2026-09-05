function PropertyCard({ property }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="h-52 bg-gray-200">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {property.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {property.location}
            </p>
          </div>

          <p className="font-semibold text-gray-900">
            ₹{property.price}
          </p>
        </div>

        <div className="mt-4 flex gap-4 text-sm text-gray-500">
          <span>{property.type}</span>
          <span>•</span>
          <span>{property.beds} Beds</span>
        </div>
      </div>
    </article>
  );
}

export default PropertyCard;