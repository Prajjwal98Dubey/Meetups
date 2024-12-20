import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LazyLoader from "./components/LazyLoader";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Home />
      </Suspense>
    ),
  },
]);
