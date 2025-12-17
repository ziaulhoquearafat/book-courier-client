import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayouts from "../layouts/RootLayouts";
import About from "../Pages/About/About";
import AllBooks from "../Pages/AllBooks/AllBooks";
import LogIn from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AddBooks from "../Pages/Dashboard/Librarian/AddBooks";
import Home from "../Pages/Home/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "all-books",
        element: <AllBooks />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: "add-books",
        element: <AddBooks />,
      },
    ],
  },
]);
