import { createBrowserRouter } from "react-router-dom";
import HomePage from "./features/homePage/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  
]);

export default router;
