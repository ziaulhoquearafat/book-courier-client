import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaChevronDown, FaUserCog } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);

  // ✅ Fetch all users
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      // Use existing user data if available to avoid loading flicker
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
      document.getElementById("role_modal").close(); // Close modal on success
    },
    onError: (err) => toast.error(err.message),
  });

  const handleRoleUpdate = (newRole) => {
    if (!selectedUser) return;
    updateRoleMutation.mutate({ id: selectedUser._id, role: newRole });
  };

  const openModal = (user) => {
    setSelectedUser(user);
    document.getElementById("role_modal").showModal();
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-error mt-10">Error loading users!</div>
    );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Users
          </h2>
          <p className="text-base-content/60 mt-1">
            Total Users:{" "}
            <span className="font-semibold text-primary">{users.length}</span>
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra p-2">
            {/* head */}
            <thead className="bg-base-200/50 text-base-content uppercase text-xs font-bold">
              <tr>
                <th className="py-4">#</th>
                <th>User</th>
                <th>Role</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="hover">
                  <td className="font-bold text-base-content/60">{idx + 1}</td>

                  {/* User Column with Avatar */}
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 bg-base-300">
                          <img
                            src={
                              user.photoURL ||
                              `https://ui-avatars.com/api/?name=${user.name}&background=random`
                            }
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{user.name}</div>
                        <div className="text-sm opacity-60 flex items-center gap-1">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role Badge */}
                  <td>
                    {user.role === "admin" ? (
                      <span className="badge badge-primary badge-lg gap-2 text-white shadow-sm">
                        Admin
                      </span>
                    ) : user.role === "librarian" ? (
                      <span className="badge badge-secondary badge-lg gap-2 text-white shadow-sm">
                        Librarian
                      </span>
                    ) : (
                      <span className="badge badge-ghost badge-lg gap-2">
                        User
                      </span>
                    )}
                  </td>

                  {/* Actions Button */}
                  <td className="text-right">
                    <button
                      onClick={() => openModal(user)}
                      className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 gap-2 border border-primary/20"
                    >
                      Edit Role <FaChevronDown size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Management Modal */}
      <dialog id="role_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FaUserCog className="text-primary" /> Manage Role
          </h3>
          <p className="py-4">
            Change role permissions for{" "}
            <span className="font-bold">{selectedUser?.name}</span>
          </p>

          <div className="flex flex-col gap-3">
            {/* Admin Option */}
            <button
              onClick={() => handleRoleUpdate("admin")}
              className={`btn justify-start gap-4 ${
                selectedUser?.role === "admin" ? "btn-primary" : "btn-outline"
              }`}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                {selectedUser?.role === "admin" && (
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                )}
              </span>
              Admin
            </button>

            {/* Librarian Option */}
            <button
              onClick={() => handleRoleUpdate("librarian")}
              className={`btn justify-start gap-4 ${
                selectedUser?.role === "librarian"
                  ? "btn-secondary"
                  : "btn-outline"
              }`}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                {selectedUser?.role === "librarian" && (
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                )}
              </span>
              Librarian
            </button>

            {/* User Option */}
            <button
              onClick={() => handleRoleUpdate("user")}
              className={`btn justify-start gap-4 ${
                selectedUser?.role === "user" || !selectedUser?.role
                  ? "btn-accent"
                  : "btn-outline"
              }`}
            >
              <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
                {(selectedUser?.role === "user" || !selectedUser?.role) && (
                  <span className="w-2 h-2 rounded-full bg-current"></span>
                )}
              </span>
              User (User)
            </button>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
