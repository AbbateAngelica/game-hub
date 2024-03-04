import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/gamehub-project/",
        element: <Layout></Layout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          { index: true, element: <Homepage></Homepage> },
          { path: "games/:slug", element: <GameDetailPage></GameDetailPage> },
        ],
      },
    ],
  },
]);

export default router;
