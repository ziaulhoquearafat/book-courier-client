import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayouts from "../layouts/RootLayouts";
import About from "../Pages/About/About";
import AllBooks from "../Pages/AllBooks/AllBooks";
import LogIn from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import BookDetails from "../Pages/BookDetails/BookDetails";
import ContactUs from "../Pages/ContactUs/ContactUs";
import ManageBooks from "../Pages/Dashboard/Admin/ManageBooks";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import MyProfile from "../Pages/Dashboard/Common/MyProfile";
import AddBooks from "../Pages/Dashboard/Librarian/AddBooks";
import ManageOrders from "../Pages/Dashboard/Librarian/ManageOrders";
import MyBooks from "../Pages/Dashboard/Librarian/MyBooks";
import Invoice from "../Pages/Dashboard/User/Invoice";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import Home from "../Pages/Home/Home/Home";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "book-details/:id",
        element: <BookDetails />,
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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "invoices",
        element: <Invoice />,
      },
      {
        path: "add-books",
        element: <AddBooks />,
      },
      {
        path: "my-books",
        element: <MyBooks />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-books",
        element: <ManageBooks />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },
    ],
  },
]);
