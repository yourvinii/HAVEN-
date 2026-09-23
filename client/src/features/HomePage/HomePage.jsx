import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">

      {/* ================= NAVBAR ================= */}
      <nav className="w-full border-b border-gray-200 bg-[#faf9f6]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 text-lg font-bold text-white">
              K
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                KDRent
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                Find your space
              </p>
            </div>
          </Link>

          {/* NAV LINKS */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#explore"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              Explore
            </a>

            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              How it works
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              About
            </a>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:block"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-700"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">

          {/* LEFT */}
          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Rentals made simpler
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Find a place that
              <span className="block text-gray-400">
                feels like home.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Discover rooms, flats and rental properties around you.
              KDRent makes finding and managing your next home simple.
            </p>

            {/* SEARCH BOX */}
            <div className="mt-9 flex max-w-2xl flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg sm:flex-row">

              <div className="flex flex-1 items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-lg">⌕</span>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Location
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    Where do you want to live?
                  </p>
                </div>
              </div>

              <Link
                to="/properties"
                className="flex items-center justify-center rounded-xl bg-gray-900 px-7 py-3 font-semibold text-white transition hover:bg-gray-700"
              >
                Search Homes
              </Link>

            </div>

            {/* SMALL INFO */}
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
              <span>✓ Verified properties</span>
              <span>✓ Direct owner contact</span>
              <span>✓ Easy inquiries</span>
            </div>

          </div>


          {/* RIGHT VISUAL */}
          <div className="relative hidden md:block">

            <div className="relative ml-auto max-w-md">

              {/* BACK CARD */}
              <div className="absolute -right-8 -top-8 h-72 w-72 rounded-[40px] bg-[#e8e3d8]"></div>

              {/* MAIN CARD */}
              <div className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl">

                <div className="flex h-80 items-center justify-center bg-gradient-to-br from-[#d9d2c4] via-[#eeeae2] to-[#c9c1b4]">

                  <div className="text-center">
                    <div className="text-6xl">🏠</div>

                    <p className="mt-4 text-sm font-medium text-gray-600">
                      Your next home
                    </p>
                  </div>

                </div>

                <div className="p-6">

                  <div className="flex items-start justify-between">

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                        Featured Property
                      </p>

                      <h3 className="mt-1 text-xl font-bold">
                        Comfortable Living Space
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Shahdol, Madhya Pradesh
                      </p>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Available
                    </span>

                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">

                    <div>
                      <span className="text-xl font-bold">
                        ₹8,000
                      </span>

                      <span className="text-sm text-gray-500">
                        /month
                      </span>
                    </div>

                    <button className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-100">
                      View
                    </button>

                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= QUICK CATEGORIES ================= */}
      <section id="explore" className="border-y border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Find what fits your life.
              </h2>
            </div>

            <Link
              to="/properties"
              className="text-sm font-semibold underline underline-offset-4"
            >
              View all properties →
            </Link>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* CARD 1 */}
            <Link
              to="/properties"
              className="group rounded-3xl bg-[#f4f1eb] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">🏠</div>

              <h3 className="mt-12 text-xl font-bold">
                Houses
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Comfortable spaces for families and long-term living.
              </p>

              <span className="mt-6 inline-block text-sm font-semibold">
                Explore →
              </span>
            </Link>


            {/* CARD 2 */}
            <Link
              to="/properties"
              className="group rounded-3xl bg-[#edf1f0] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">🏢</div>

              <h3 className="mt-12 text-xl font-bold">
                Flats
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Practical apartments in convenient locations.
              </p>

              <span className="mt-6 inline-block text-sm font-semibold">
                Explore →
              </span>
            </Link>


            {/* CARD 3 */}
            <Link
              to="/properties"
              className="group rounded-3xl bg-[#f1eee8] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">🛏️</div>

              <h3 className="mt-12 text-xl font-bold">
                Rooms
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Affordable rooms for students and working professionals.
              </p>

              <span className="mt-6 inline-block text-sm font-semibold">
                Explore →
              </span>
            </Link>


            {/* CARD 4 */}
            <Link
              to="/properties"
              className="group rounded-3xl bg-[#eeecef] p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">📍</div>

              <h3 className="mt-12 text-xl font-bold">
                Near You
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Discover rental options based on your preferred location.
              </p>

              <span className="mt-6 inline-block text-sm font-semibold">
                Explore →
              </span>
            </Link>

          </div>

        </div>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="bg-[#faf9f6]">

        <div className="mx-auto max-w-7xl px-6 py-20">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Simple process
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              From searching to settling in.
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              No complicated process. Search a property, connect with the
              owner and take the next step towards your new home.
            </p>
          </div>


          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="border-t-2 border-gray-900 pt-6">
              <span className="text-sm font-bold text-gray-400">
                01
              </span>

              <h3 className="mt-5 text-xl font-bold">
                Discover
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Browse properties based on location, rent and your
                requirements.
              </p>
            </div>


            <div className="border-t-2 border-gray-900 pt-6">
              <span className="text-sm font-bold text-gray-400">
                02
              </span>

              <h3 className="mt-5 text-xl font-bold">
                Connect
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Send an inquiry and communicate directly with property
                owners.
              </p>
            </div>


            <div className="border-t-2 border-gray-900 pt-6">
              <span className="text-sm font-bold text-gray-400">
                03
              </span>

              <h3 className="mt-5 text-xl font-bold">
                Move in
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Finalize the details and make your next place feel like home.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ================= OWNER SECTION ================= */}
      <section className="bg-gray-900 text-white">

        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              For property owners
            </p>

            <h2 className="mt-3 text-4xl font-bold leading-tight">
              Have a property to rent?
            </h2>

            <p className="mt-5 max-w-lg leading-7 text-gray-400">
              List your property on KDRent and connect with people looking
              for a place in your area.
            </p>

            <Link
              to="/register"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              List your property
            </Link>
          </div>


          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8">

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white/10 p-5">
                <p className="text-3xl font-bold">
                  01
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Create your listing
                </p>
              </div>

              <div className="rounded-2xl bg-white/10 p-5">
                <p className="text-3xl font-bold">
                  02
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Receive inquiries
                </p>
              </div>

              <div className="col-span-2 rounded-2xl bg-white/10 p-5">
                <p className="text-3xl font-bold">
                  03
                </p>

                <p className="mt-2 text-sm text-gray-400">
                  Connect with potential tenants
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ================= ABOUT ================= */}
      <section id="about" className="bg-white">

        <div className="mx-auto max-w-4xl px-6 py-20 text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
            About KDRent
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Renting shouldn't feel complicated.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-gray-600">
            KDRent is built to make property discovery easier for tenants
            and property management simpler for owners. Whether you're a
            student, professional, family or property owner, KDRent helps
            bring both sides together.
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="bg-[#f4f1eb]">

        <div className="mx-auto max-w-5xl px-6 py-20 text-center">

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to find your next place?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-gray-600">
            Start exploring rental properties and discover a place that
            works for you.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition hover:bg-gray-700"
          >
            Start Exploring
          </Link>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-950 text-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-xl font-bold">
              KDRent
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Find your space. Make it home.
            </p>
          </div>


          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#explore" className="hover:text-white">
              Explore
            </a>

            <a href="#about" className="hover:text-white">
              About
            </a>

            <Link to="/support" className="hover:text-white">
              Support
            </Link>
          </div>

        </div>

        <div className="border-t border-white/10 py-5 text-center text-xs text-gray-600">
          © 2026 KDRent. All rights reserved.
        </div>

      </footer>

    </div>
  );
};

export default Homepage;