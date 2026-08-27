import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Find your next place
          </p>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Find a place you can call home.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Discover rooms, flats, houses, PGs and hostels that fit your
            budget and lifestyle.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/properties"
              className="rounded-lg bg-black px-6 py-3 text-center font-medium text-white hover:bg-gray-800"
            >
              Explore Properties
            </Link>

            <Link
              to="/sign-up"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-900 hover:bg-gray-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

