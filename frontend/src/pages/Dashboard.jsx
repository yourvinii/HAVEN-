import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        KDRent Dashboard
      </h1>

      <p className="text-gray-600">
        Welcome, {user?.name}
      </p>

      <p className="text-gray-500">
        Role: {user?.role}
      </p>

      <button
        onClick={logout}
        className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;