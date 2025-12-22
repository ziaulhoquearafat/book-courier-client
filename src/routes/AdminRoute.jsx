import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, Outlet } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const AdminRoute = () => {
  const { user } = useAuth();

  // Fetch user role from backend
  const { data, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}/role`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return res.data.role;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (data !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
