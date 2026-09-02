import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          KDRent
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-600 hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/properties"
            className="text-gray-600 hover:text-black"
          >
            Properties
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-black px-5 py-2.5 text-white hover:bg-gray-800"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;