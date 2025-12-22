import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayouts from "../layouts/RootLayouts";

import About from "../Pages/About/About";
import AllBooks from "../Pages/AllBooks/AllBooks";
import LogIn from "../Pages/Auth/Login/LogIn";
import Register from "../Pages/Auth/Register/Register";
import BookDetails from "../Pages/BookDetails/BookDetails";
import ContactUs from "../Pages/ContactUs/ContactUs";

import ManageBooks from "../Pages/Dashboard/Admin/ManageBooks";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";

import MyProfile from "../Pages/Dashboard/Common/MyProfile";
import DashboardHome from "../Pages/Dashboard/DashboardHome";

import AddBooks from "../Pages/Dashboard/Librarian/AddBooks";
import EditBook from "../Pages/Dashboard/Librarian/EditBook";
import ManageOrders from "../Pages/Dashboard/Librarian/ManageOrders";
import MyBooks from "../Pages/Dashboard/Librarian/MyBooks";

import Invoice from "../Pages/Dashboard/User/Invoice";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import Wishlist from "../Pages/Dashboard/User/Wishlist";

import ErrorPages from "../Pages/ErrorPages";
import Home from "../Pages/Home/Home";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";

import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    errorElement: <ErrorPages />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-books", element: <AllBooks /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <ContactUs /> },
      { path: "book-details/:id", element: <BookDetails /> },
      { path: "payment-success", element: <PaymentSuccess /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LogIn /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "my-orders", element: <MyOrders /> },
      { path: "invoices", element: <Invoice /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "profile", element: <MyProfile /> },

      // Librarian Routes
      {
        element: <LibrarianRoute />,
        children: [
          { path: "add-books", element: <AddBooks /> },
          { path: "my-books", element: <MyBooks /> },
          { path: "edit-books/:id", element: <EditBook /> },
          { path: "manage-orders", element: <ManageOrders /> },
        ],
      },

      // Admin Routes
      {
        element: <AdminRoute />,
        children: [
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-books", element: <ManageBooks /> },
        ],
      },
    ],
  },
]);
