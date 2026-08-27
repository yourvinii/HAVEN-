import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import MainLayout from "./layouts/MainLayout";
import SocketTest from "./SocketTest";
import Properties from "./pages/Properties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "socket-test",
        element: <SocketTest />,
      },
      {
        path: "properties",
        element: <Properties />,
      },
    ],
  },
]);

export default router;
