import { createBrowserRouter } from "react-router-dom";
import HomePage from "./features/homePage/HomePage";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import DemoCredentials from "./features/auth/pages/DemoCredentials";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path:"/demo-login",
    element:<DemoCredentials/>
  }
]);

export default router;
