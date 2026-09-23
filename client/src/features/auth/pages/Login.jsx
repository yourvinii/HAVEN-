
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login } from "../services/auth.api";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= LOGIN =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await login(
        formData.email,
        formData.password
      );

      const user = response.user;
      const token = response.token;

      // Save token
      if (token) {
        localStorage.setItem("token", token);
      }

      // Save user information
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);

      // Update Auth Context
      handleLogin(user);

      // ================= ROLE BASED REDIRECT =================

      const normalizedRole = user?.role?.toLowerCase().trim();

      if (normalizedRole === "tenant") {
        navigate("/tenant-dashboard");
      } else if (normalizedRole === "owner") {
        navigate("/owner-dashboard");
      } else if (normalizedRole === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);

      setError(
        err.response?.data?.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
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


          {/* BACK HOME */}

          <Link
            to="/"
            className="text-sm font-semibold text-gray-600 transition hover:text-gray-950"
          >
            ← Back to home
          </Link>

        </div>

      </nav>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="flex min-h-[calc(100vh-81px)] items-center justify-center px-6 py-12">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-xl md:grid-cols-2">


          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="relative hidden overflow-hidden bg-gray-900 p-10 text-white md:flex md:flex-col md:justify-between">

            {/* Decorative circles */}

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/10" />


            {/* CONTENT */}

            <div className="relative">

              {/* BADGE */}

              <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">

                <span className="h-2 w-2 rounded-full bg-green-400" />

                Welcome back

              </div>


              {/* HEADING */}

              <h2 className="max-w-md text-4xl font-bold leading-tight">

                Your next place

                <span className="block text-gray-400">
                  is waiting for you.
                </span>

              </h2>


              {/* DESCRIPTION */}

              <p className="mt-6 max-w-md leading-7 text-gray-400">
                Sign in to explore rental properties, manage your
                inquiries, connect with owners and continue your
                rental journey.
              </p>


              {/* FEATURES */}

              <div className="mt-10 space-y-5">

                {/* FEATURE 1 */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    🏠
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Discover properties
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Find rooms, flats and homes around you.
                    </p>

                  </div>

                </div>


                {/* FEATURE 2 */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    💬
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Connect with owners
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Send inquiries and communicate easily.
                    </p>

                  </div>

                </div>


                {/* FEATURE 3 */}

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    📍
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Find your space
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Make your next rental feel like home.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* BOTTOM CARD */}

            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6">

              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                KDRent
              </p>

              <p className="mt-3 text-lg font-semibold">
                Find a space. Make it home.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Simple rental discovery for everyone.
              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE — LOGIN FORM */}
          {/* ================================================= */}

          <div className="p-7 sm:p-10 lg:p-12">

            {/* HEADER */}

            <div className="mb-8">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Account
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Login to continue to your KDRent account.
              </p>

            </div>


            {/* ================================================= */}
            {/* LOGIN FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />

              </div>


              {/* PASSWORD */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>


                  {/* SHOW / HIDE */}

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                    className="text-xs font-semibold text-gray-500 transition hover:text-gray-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>


                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />

              </div>


              {/* ERROR */}

              {error && (

                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                  {error}
                </div>

              )}


              {/* ================================================= */}
              {/* LOGIN BUTTONS */}
              {/* ================================================= */}

              <div className="space-y-3">

                {/* NORMAL LOGIN */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gray-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {loading
                    ? "Logging in..."
                    : "Login to KDRent"}
                </button>


                {/* DEMO LOGIN */}

                <button
                  type="button"
                  onClick={() => navigate("/demo-login")}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
                >
                  Try Demo Account
                </button>

              </div>

            </form>


            {/* ================================================= */}
            {/* DIVIDER */}
            {/* ================================================= */}

            <div className="my-8 flex items-center gap-4">

              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs text-gray-400">
                OR
              </span>

              <div className="h-px flex-1 bg-gray-200" />

            </div>


            {/* ================================================= */}
            {/* REGISTER */}
            {/* ================================================= */}

            <p className="text-center text-sm text-gray-500">

              Don't have a KDRent account?{" "}

              <Link
                to="/register"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                Create one
              </Link>

            </p>


            {/* ================================================= */}
            {/* BOTTOM INFO */}
            {/* ================================================= */}

            <div className="mt-8 rounded-2xl bg-gray-50 p-4">

              <p className="text-center text-xs leading-5 text-gray-400">
                🔒 Your account information is securely handled
                by KDRent.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Login;
