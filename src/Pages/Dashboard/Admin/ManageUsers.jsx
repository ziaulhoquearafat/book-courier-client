import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch all users
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ✅ Mutation to update role
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      toast.success("User role updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleMakeAdmin = (id) => {
    updateRoleMutation.mutate({ id, role: "admin" });
  };

  const handleMakeLibrarian = (id) => {
    updateRoleMutation.mutate({ id, role: "librarian" });
  };

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users!</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">#</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id} className="text-center border-t">
              <td className="p-2 border">{idx + 1}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border space-x-2">
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Make Admin
                  </button>
                )}
                {user.role !== "librarian" && (
                  <button
                    onClick={() => handleMakeLibrarian(user._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Make Librarian
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
