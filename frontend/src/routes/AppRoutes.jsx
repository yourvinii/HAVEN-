import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>KDRent Home</h1>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;