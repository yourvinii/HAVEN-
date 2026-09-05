function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">KDRent</h1>

        <div className="flex gap-6">
          <a href="/">Home</a>
          <a href="/properties">Properties</a>
          <a href="/login">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;