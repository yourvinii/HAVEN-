import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link  to={'/'} className="text-2xl font-bold">KDRent</Link> 

        <div className="flex gap-6">
          <Link to={"/"}>Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
