
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          KDRent
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium hover:text-gray-600"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium hover:text-gray-600"
          >
            About
          </Link>

          <Link
            to="/sign-in"
            className="text-sm font-medium hover:text-gray-600"
          >
            Sign In
          </Link>

          <Link
            to="/sign-up"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
