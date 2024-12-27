import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LazyLoader from "./components/LazyLoader";
import { Toaster } from "react-hot-toast";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Feeds = lazy(() => import("./pages/Feeds"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const NewPost = lazy(() => import("./pages/NewPost"));
const StalkUser = lazy(() => import("./pages/StalkUser"));
const Event = lazy(() => import("./pages/Event"));
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
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
  {
    path: "/login",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Profile />
      </Suspense>
    ),
  },
  {
    path: "/feeds",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Feeds />
      </Suspense>
    ),
  },
  {
    path: "/edit_profile",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <EditProfile />
      </Suspense>
    ),
  },
  {
    path: "/new_post",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <NewPost />
      </Suspense>
    ),
  },
  {
    path: "/u/:user",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <StalkUser />
      </Suspense>
    ),
  },
  {
    path: "/event/:id",
    element: (
      <Suspense fallback={<LazyLoader />}>
        <Event />
      </Suspense>
    ),
  },
]);
