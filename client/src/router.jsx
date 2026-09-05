import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <h1 className="text-4xl font-bold">
        Welcome to KDRent
      </h1>

      <p className="mt-4 text-gray-600">
        Find your perfect rental property.
      </p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;