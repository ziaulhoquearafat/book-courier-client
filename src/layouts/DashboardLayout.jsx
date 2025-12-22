import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaBook,
  FaBoxOpen,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaPlusSquare,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { NavLink, Outlet } from "react-router";
import Logo from "../components/Logo/Logo";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [role, setRole] = useState("");
  const drawerToggleRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch user role
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}/role`).then((res) => {
        setRole(res.data.role);
      });
    }
  }, [user?.email, axiosSecure]);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error.message));
  };

  const closeDrawer = () => {
    if (drawerToggleRef.current && drawerToggleRef.current.checked) {
      drawerToggleRef.current.checked = false;
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // All menu items with roles
  const allMenuItems = [
    {
      name: "My Orders",
      icon: <FaBoxOpen />,
      path: "/dashboard/my-orders",
      roles: ["user"],
    },
    {
      name: "Invoices",
      icon: <FaFileInvoiceDollar />,
      path: "/dashboard/invoices",
      roles: ["user"],
    },
    {
      name: "Add Book",
      icon: <FaPlusSquare />,
      path: "/dashboard/add-books",
      roles: ["librarian"],
    },
    {
      name: "My Books",
      icon: <FaBook />,
      path: "/dashboard/my-books",
      roles: ["librarian"],
    },
    {
      name: "Manage Orders",
      icon: <FaClipboardList />,
      path: "/dashboard/manage-orders",
      roles: ["librarian"],
    },
    {
      name: "Manage Users",
      icon: <FaUsers />,
      path: "/dashboard/manage-users",
      roles: ["admin"],
    },
    {
      name: "Manage Books",
      icon: <GiBookshelf />,
      path: "/dashboard/manage-books",
      roles: ["admin"],
    },
    {
      name: "My Profile",
      icon: <FaUser />,
      path: "/dashboard/profile",
      roles: ["user", "librarian", "admin"],
    },
  ];

  // Filter menu items based on role
  const menuItems = allMenuItems.filter((item) => item.roles.includes(role));

  return (
    <div
      className={`drawer lg:drawer-open font-inter bg-gradient-to-br from-slate-200 via-white to-blue-100 min-h-screen`}
    >
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerToggleRef}
      />

      {/* Page Content */}
      <div className="drawer-content flex flex-col transition-all duration-300">
        {/* Navbar */}
        <div className="w-full navbar bg-base-100 border-b border-base-200 shadow-sm sticky top-0 z-40">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <FaBars className="text-xl" />
            </label>
          </div>

          <div className="flex-none hidden lg:block">
            <button
              onClick={toggleSidebar}
              className="btn btn-square btn-ghost"
              title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              {isSidebarOpen ? (
                <FaArrowLeft className="text-lg" />
              ) : (
                <FaArrowRight className="text-lg" />
              )}
            </button>
          </div>

          <div className="flex-1 px-2 mx-2">
            {!isSidebarOpen && (
              <div className="hidden lg:block">
                <Logo className="w-20" />
              </div>
            )}
            <div className="lg:hidden">
              <Logo className="w-24" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-10 flex-1 h-full min-h-screen bg-gradient-to-br from-base-100 via-indigo-50/30 to-blue-50/30">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div
          className={`menu p-4 min-h-full bg-base-100 border-r border-base-200 text-base-content flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-72" : "w-20"
          }`}
        >
          {isSidebarOpen && (
            <div className="mb-8 flex justify-start pl-2 transition-all duration-300">
              <Logo className="w-32 transition-all duration-300" />
            </div>
          )}

          <ul
            className={`space-y-2 flex-1 flex flex-col ${
              !isSidebarOpen ? "justify-center" : ""
            }`}
          >
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 text-base font-medium overflow-hidden ${
                      isActive
                        ? "bg-primary text-primary-content shadow-md shadow-primary/30"
                        : "hover:bg-base-200 hover:text-primary"
                    } ${isSidebarOpen ? "justify-start" : "justify-center"}`
                  }
                  title={!isSidebarOpen ? item.name : ""}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ${
                      isSidebarOpen
                        ? "opacity-100 w-auto translate-x-0"
                        : "opacity-0 w-0 -translate-x-full overflow-hidden absolute"
                    }`}
                  >
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="border-t border-base-200 pt-4 mt-4 ">
            <button
              onClick={handleLogOut}
              className={`flex items-center gap-4 px-3 py-3 w-full rounded-lg text-error hover:bg-error/10 transition-colors duration-200 font-medium text-base cursor-pointer overflow-hidden ${
                isSidebarOpen ? "justify-start" : "justify-center"
              }`}
              title={!isSidebarOpen ? "Logout" : ""}
            >
              <span className="text-xl shrink-0">
                <FaSignOutAlt />
              </span>
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
