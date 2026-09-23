import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/auth.api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "tenant",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Terms validation
    if (!termsAccepted) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      // Only tenant / owner can be selected from public registration
      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      };

      const response = await register(registrationData);

      console.log("REGISTER RESPONSE:", response);

      // OTP verification page
      navigate("/verify-otp", {
        state: {
          email: formData.email,
        },
      });

    } catch (err) {
      console.error("REGISTER ERROR:", err);

      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
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


          {/* BACK */}

          <Link
            to="/login"
            className="text-sm font-semibold text-gray-600 transition hover:text-gray-950"
          >
            Already have an account? Login
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


            <div className="relative">

              {/* BADGE */}

              <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">

                <span className="h-2 w-2 rounded-full bg-green-400" />

                Join KDRent

              </div>


              {/* HEADING */}

              <h2 className="max-w-md text-4xl font-bold leading-tight">

                Find your place.

                <span className="block text-gray-400">
                  Or list your own.
                </span>

              </h2>


              <p className="mt-6 max-w-md leading-7 text-gray-400">
                Create your KDRent account and get started with
                a simpler way to discover or manage rental
                properties.
              </p>


              {/* ROLE INFO */}

              <div className="mt-10 space-y-5">

                {/* TENANT */}

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                    🏠
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Looking for a place?
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Join as a Tenant and discover properties.
                    </p>

                  </div>

                </div>


                {/* OWNER */}

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                    🏢
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Have a property?
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Join as an Owner and list your property.
                    </p>

                  </div>

                </div>


                {/* ADMIN */}

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                    🔐
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      Platform administration
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Admin accounts are created separately.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* BOTTOM */}

            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6">

              <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                KDRent
              </p>

              <p className="mt-3 text-lg font-semibold">
                Find a space. Make it home.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Built for tenants and property owners.
              </p>

            </div>

          </div>


          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div className="p-7 sm:p-10 lg:p-12">

            {/* HEADER */}

            <div className="mb-8">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
                Create account
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Get started
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Create your KDRent account in a few simple steps.
              </p>

            </div>


            {/* ================================================= */}
            {/* FORM */}
            {/* ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAME */}

              <div>

                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />

              </div>


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


              {/* PHONE */}

              <div>

                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Phone number
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />

              </div>


              {/* ================================================= */}
              {/* ROLE */}
              {/* ================================================= */}

              <div>

                <label className="mb-3 block text-sm font-semibold text-gray-700">
                  I want to join as
                </label>

                <div className="grid grid-cols-2 gap-3">

                  {/* TENANT */}

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        role: "tenant",
                      }))
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      formData.role === "tenant"
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                    }`}
                  >

                    <div className="text-xl">
                      🏠
                    </div>

                    <p className="mt-2 text-sm font-bold">
                      Tenant
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        formData.role === "tenant"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Find a property
                    </p>

                  </button>


                  {/* OWNER */}

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        role: "owner",
                      }))
                    }
                    className={`rounded-2xl border p-4 text-left transition ${
                      formData.role === "owner"
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300"
                    }`}
                  >

                    <div className="text-xl">
                      🏢
                    </div>

                    <p className="mt-2 text-sm font-bold">
                      Owner
                    </p>

                    <p
                      className={`mt-1 text-xs ${
                        formData.role === "owner"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      List a property
                    </p>

                  </button>

                </div>

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

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="text-xs font-semibold text-gray-500 hover:text-gray-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />

              </div>


              {/* ================================================= */}
              {/* TERMS */}
              {/* ================================================= */}

              <div className="flex items-start gap-3">

                <input
                  id="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) =>
                    setTermsAccepted(e.target.checked)
                  }
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-gray-900"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-gray-500"
                >
                  I agree to KDRent's{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-gray-900 underline underline-offset-2"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-gray-900 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>

              </div>


              {/* ERROR */}

              {error && (

                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>

              )}


              {/* ================================================= */}
              {/* REGISTER BUTTON */}
              {/* ================================================= */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-gray-900 px-5 py-4 text-sm font-semibold text-white transition hover:bg-gray-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {loading
                  ? "Creating account..."
                  : `Create ${formData.role === "owner" ? "Owner" : "Tenant"} Account`}
              </button>

            </form>


            {/* ================================================= */}
            {/* LOGIN */}
            {/* ================================================= */}

            <p className="mt-8 text-center text-sm text-gray-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-semibold text-gray-900 underline underline-offset-4"
              >
                Login
              </Link>

            </p>


            {/* INFO */}

            <div className="mt-6 rounded-2xl bg-gray-50 p-4">

              <p className="text-center text-xs leading-5 text-gray-400">
                🔐 Admin accounts are created separately for
                platform security.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Register;