import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { saveOrUpdateUser } from "../../../utils"; // axios helper
import SocialLogin from "../SocialLogin/SocialLogin";

const LogIn = () => {
  const { loginUser, setLoading, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      setLoading(true);

      // 1️⃣ Firebase login
      const result = await loginUser(data.email, data.password);
      const firebaseUser = result.user;

      // 2️⃣ Firebase ID token নাও
      const idToken = await firebaseUser.getIdToken();
      localStorage.setItem("access-token", idToken); // save token for axiosSecure

      // 3️⃣ Save/update user in DB
      await saveOrUpdateUser({
        name: firebaseUser.displayName || "User",
        email: firebaseUser.email,
        image: firebaseUser.photoURL || "",
        role: "user",
      });

      setLoading(false);
      toast.success("Logged In Successfully");

      // 4️⃣ Navigate
      navigate(location?.state?.from || "/");
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="bg-white max-w-4xl flex items-center mx-auto md:min-h-screen p-4">
        <div className="grid md:grid-cols-3 items-center [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-xl overflow-hidden">
          {/* Left info panel */}
          <div className="max-md:order-1 flex flex-col justify-center md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-primary to-secondary lg:px-8 px-4 py-4">
            <div>
              <h3 className="text-white text-lg">Secure Authentication</h3>
              <p className="text-[13px] text-slate-300 mt-3 leading-relaxed">
                Log in with your registered email and password securely.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg">Forgot Password?</h3>
              <p className="text-[13px] text-slate-300 mt-3 leading-relaxed">
                Easily recover your account by clicking on the "Forgot
                Password?" link.
              </p>
            </div>
          </div>

          {/* Login form */}
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="md:col-span-2 w-full py-6 px-6 sm:px-14 max-w-lg mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-primary text-2xl font-bold">Login Now</h1>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email Id
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-primary hover:bg-secondary focus:outline-none cursor-pointer"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Log In"
                )}
              </button>
            </div>

            <p className="text-slate-600 text-sm mt-6 text-center">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Register here
              </Link>
            </p>

            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
