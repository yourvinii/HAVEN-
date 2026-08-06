import { createBrowserRouter } from "react-router-dom";

// Public Pages
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import PropertyListing from "../pages/public/PropertyListing";
import PropertyDetails from "../pages/public/PropertyDetails";

// User Pages
import Wishlist from "../pages/user/Wishlist";
import Profile from "../pages/user/Profile";
import MyInquiries from "../pages/user/MyInquiries";

// Seller Pages
import Dashboard from "../pages/seller/Dashboard";
import MyProperties from "../pages/seller/MyProperties";
import AddProperty from "../pages/seller/AddProperty";
import EditProperty from "../pages/seller/EditProperty";
import Applications from "../pages/seller/Applications";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Properties from "../pages/admin/Properties";
import Reports from "../pages/admin/Reports";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  { path: "/properties", element: <PropertyListing /> },
  { path: "/property/:id", element: <PropertyDetails /> },

  { path: "/wishlist", element: <Wishlist /> },
  { path: "/profile", element: <Profile /> },
  { path: "/my-inquiries", element: <MyInquiries /> },

  { path: "/seller/dashboard", element: <Dashboard /> },
  { path: "/seller/properties", element: <MyProperties /> },
  { path: "/seller/add-property", element: <AddProperty /> },
  { path: "/seller/edit-property/:id", element: <EditProperty /> },
  { path: "/seller/applications", element: <Applications /> },

  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/users", element: <Users /> },
  { path: "/admin/properties", element: <Properties /> },
  { path: "/admin/reports", element: <Reports /> },
]);

export default router;