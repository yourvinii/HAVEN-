import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.api";
import { useAuth } from "../hooks/useAuth";

const DemoCredentials = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [loadingRole, setLoadingRole] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // DEMO ACCOUNTS
  // =====================================================

  const demoAccounts = {
    tenant: {
      role: "tenant",
      title: "Tenant",
      description: "Explore properties, send inquiries and manage your rental journey.",
      email: "demo.tenant@kdrent.com",
      password: "demo123",
      icon: "🏠",
    },

    owner: {
      role: "owner",
      title: "Owner",
      description: "Manage your properties, inquiries and rental listings.",
      email: "demo.owner@kdrent.com",
      password: "demo123",
      icon: "🏢",
    },

    admin: {
      role: "admin",
      title: "Admin",
      description: "Manage users, properties and the KDRent platform.",
      email: "demo.admin@kdrent.com",
      password: "demo123",
      icon: "⚙️",
    },
  };

  // =====================================================
  // DEMO LOGIN
  // =====================================================

  const handleDemoLogin = async (account) => {
    try {
      setError("");
      setLoadingRole(account.role);

      const response = await login(
        account.email,
        account.password
      );

      const user = response.user;
      const token = response.token;

      // Save authentication data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);

      // Update Auth Context
      handleLogin(user);

      // =================================================
      // ROLE BASED REDIRECT
      // =================================================

      const role = user?.role?.toLowerCase().trim();

      if (role === "tenant") {
        navigate("/tenant-dashboard");
      } else if (role === "owner") {
        navigate("/owner-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        setError("Invalid demo account role.");
      }

    } catch (err) {
      console.error("DEMO LOGIN ERROR:", err);

      setError(
        err.response?.data?.message ||
        `Unable to login as ${account.title}. Please check the demo account.`
      );
    } finally {
      setLoadingRole("");
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-900">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="border-b border-gray-200 bg-[#faf9f6]">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-2"
          >

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


          {/* BACK TO LOGIN */}

          <Link
            to="/login"
            className="text-sm font-semibold text-gray-600 transition hover:text-gray-950"
          >
            ← Back to login
          </Link>

        </div>

      </nav>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-12">

        <div className="w-full max-w-5xl">

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="mx-auto mb-10 max-w-2xl text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-2xl">
              🚀
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              KDRent Demo
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              Explore KDRent
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500">
              Choose a demo account to experience KDRent from
              different perspectives.
            </p>

          </div>


          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {error && (

            <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm text-red-600">
              {error}
            </div>

          )}


          {/* ================================================= */}
          {/* DEMO CARDS */}
          {/* ================================================= */}

          <div className="grid gap-5 md:grid-cols-3">

            {Object.values(demoAccounts).map((account) => (

              <button
                key={account.role}
                type="button"
                onClick={() => handleDemoLogin(account)}
                disabled={loadingRole !== ""}
                className="group rounded-[28px] border border-gray-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >

                {/* ICON */}

                <div className="flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-900 text-2xl">
                    {account.icon}
                  </div>


                  {/* ROLE */}

                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                    {account.role}
                  </span>

                </div>


                {/* CONTENT */}

                <div className="mt-7">

                  <h2 className="text-xl font-bold">
                    {account.title} Demo
                  </h2>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                    {account.description}
                  </p>

                </div>


                {/* LOGIN */}

                <div className="mt-7 flex items-center justify-between border-t border-gray-100 pt-5">

                  <span className="text-sm font-semibold text-gray-900">
                    {loadingRole === account.role
                      ? "Logging in..."
                      : "Continue as " + account.title}
                  </span>

                  <span className="text-lg transition group-hover:translate-x-1">
                    →
                  </span>

                </div>

              </button>

            ))}

          </div>


          {/* ================================================= */}
          {/* INFO */}
          {/* ================================================= */}

          <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-gray-200 bg-white p-6">

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                🔐
              </div>

              <div>

                <h3 className="text-sm font-semibold">
                  Demo accounts
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  These accounts are only for exploring the KDRent
                  application. Each account provides access to a
                  different role and dashboard.
                </p>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* FOOTER */}
          {/* ================================================= */}

          <p className="mt-8 text-center text-xs text-gray-400">
            KDRent · Find a space. Make it home.
          </p>

        </div>

      </main>

    </div>
  );
};

export default DemoCredentials;