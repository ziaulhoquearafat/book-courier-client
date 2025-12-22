import { Link, NavLink } from "react-router";
import Logo from "../../../components/Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { FaHome, FaBook, FaChartLine, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-b-2 border-purple-300"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            }`
          }
        >
          <FaHome className="text-sm" />
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/all-books"}
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-b-2 border-purple-300"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            }`
          }
        >
          <FaBook className="text-sm" />
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/dashboard"}
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-b-2 border-purple-300"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            }`
          }
        >
          <FaChartLine className="text-sm" />
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-b-2 border-purple-300"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            }`
          }
        >
          <FaInfoCircle className="text-sm" />
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact"}
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-b-2 border-purple-300"
                : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
            }`
          }
        >
          <FaEnvelope className="text-sm" />
          Contact Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="sticky top-0 z-40">
      <div className="navbar bg-base-100/95 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-lg gap-2"
            >
              {links}
            </ul>
          </div>
          <div className="btn btn-ghost text-lg lg:text-xl">
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full ring-2 ring-blue-500">
                  <img
                    src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt={user.displayName || "User"}
                  />
                </div>
              </div>
              <a
                onClick={handleLogOut}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Log Out
              </a>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to={"/login"}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Log in
              </Link>
              <Link
                to={"/register"}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
