import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaPen, FaCamera } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}/role`).then((res) => {
        setRole(res.data.role || "user");
      }).catch((error) => {
        console.error("Error fetching role:", error);
        setRole("user"); // Default fallback
      });
    }
  }, [user?.email, axiosSecure]);

  const onSubmit = (data) => {
    updateUserProfile({
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        toast.success("Profile updated successfully!");
        // Optional: Force reload or state update if needed, but Firebase auth changes usually propagate
      })
      .catch((error) => {
        console.error("Profile update error:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="max-w-4xl mx-auto font-inter">
      {/* Profile Header Card */}
      <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden mb-8 border border-base-200">
        {/* Colorful Banner */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary via-secondary to-accent relative">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Profile Info & Avatar */}
        <div className="px-6 pb-6 md:px-10 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 md:-mt-16 mb-6 gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="avatar ring-4 ring-base-100 rounded-full bg-base-100">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
                  <img
                    src={user?.photoURL || "https://ui-avatars.com/api/?name=" + (user?.displayName || "User")}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-base-100 rounded-full p-2 shadow-md border border-base-200 text-primary cursor-pointer hover:bg-base-200 transition-colors">
                <FaCamera size={16} />
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 mt-2 md:mt-0">
              <h1 className="text-2xl md:text-3xl font-bold space-grotesk text-base-content">
                {user?.displayName || "User Name"}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-base-content/70 mt-1">
                <span className="flex items-center gap-2 text-sm">
                  <FaEnvelope /> {user?.email}
                </span>
                <span className="badge badge-primary badge-outline text-xs font-semibold">
                  {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
                </span>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <p className="text-xs text-base-content/50 font-medium">
                Last Login: {new Date(user?.metadata?.lastSignInTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar / Stats (Optional enhancement) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg font-bold">Profile Strength</h3>
              <progress className="progress progress-primary w-full" value="80" max="100"></progress>
              <p className="text-sm text-base-content/60 mt-2">Add a phone number to reach 100% (Coming Soon)</p>
            </div>
          </div>
          <div className="card bg-primary text-primary-content shadow-lg">
            <div className="card-body">
              <h3 className="card-title text-lg">Pro Tip</h3>
              <p className="text-sm">Use a high-quality professional photo for your avatar to build trust.</p>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-base-200">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <FaUser size={20} />
                </div>
                <div>
                  <h2 className="card-title text-xl font-bold">Edit Profile</h2>
                  <p className="text-sm text-base-content/60">Update your personal information</p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Display Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`input input-bordered w-full pl-10 ${errors.displayName ? "input-error" : ""}`}
                      {...register("displayName", { required: "Name is required" })}
                    />
                    <FaPen className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-sm" />
                  </div>
                  {errors.displayName && (
                    <span className="text-error text-sm mt-1">{errors.displayName.message}</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Photo URL</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://"
                      className={`input input-bordered w-full pl-10 ${errors.photoURL ? "input-error" : ""}`}
                      {...register("photoURL", {
                        pattern: {
                          value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                          message: "Please enter a valid URL"
                        }
                      })}
                    />
                    <FaCamera className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 text-sm" />
                  </div>
                  {errors.photoURL && (
                    <span className="text-error text-sm mt-1">{errors.photoURL.message}</span>
                  )}
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">Paste a direct link to your image (e.g. from Imgur or LinkedIn)</span>
                  </label>
                </div>

                <div className="form-control mt-4">
                  <button type="submit" className="btn btn-primary w-full md:w-auto md:self-end text-lg transition-transform active:scale-95">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
