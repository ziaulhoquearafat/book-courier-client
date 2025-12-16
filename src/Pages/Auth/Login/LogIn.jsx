import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const LogIn = () => {
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log("location is login", location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    loginUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="bg-white max-w-4xl flex items-center mx-auto md:min-h-screen p-4">
        <div className="grid md:grid-cols-3 items-center [box-shadow:0_2px_10px_-3px_rgba(14,14,14,0.3)] rounded-xl overflow-hidden">
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
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="md:col-span-2 w-full py-6 px-6 sm:px-14 max-w-lg mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-primary text-2xl font-bold">Login Now</h1>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email Id
                </label>
                <div className="relative flex items-center">
                  <input
                    className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                    name="email"
                    placeholder="Enter email"
                    required
                    type="email"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  <svg
                    className="w-4 h-4 absolute right-4"
                    fill="#bbb"
                    stroke="#bbb"
                    viewBox="0 0 682.667 682.667"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath clipPathUnits="userSpaceOnUse" id="a">
                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                      />
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    className="text-slate-900 bg-white border border-slate-300 w-full text-sm pl-4 pr-8 py-2.5 rounded-md outline-blue-500"
                    name="password"
                    placeholder="Enter password"
                    required
                    type="password"
                    {...register("password", { required: "password required" })}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                  <svg
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    fill="#bbb"
                    stroke="#bbb"
                    viewBox="0 0 128 128"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button className="w-full py-2.5 px-4 tracking-wider text-sm rounded-md text-white bg-primary hover:bg-secondary focus:outline-none cursor-pointer">
                Log In
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
