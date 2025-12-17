import { useRef, useState } from "react";
import { Outlet, NavLink } from "react-router";
import {
  FaBars,
  FaBook,
  FaBoxOpen,
  FaClipboardList,
  FaFileInvoiceDollar,
  FaPlusSquare,
  FaSignOutAlt,
  FaUser,
  FaUsers,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import Logo from "../components/Logo/Logo";

const DashboardLayout = () => {
  const drawerToggleRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const closeDrawer = () => {
    if (drawerToggleRef.current && drawerToggleRef.current.checked) {
      drawerToggleRef.current.checked = false;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: "My Orders", icon: <FaBoxOpen />, path: "/dashboard/my-orders" },
    {
      name: "Invoices",
      icon: <FaFileInvoiceDollar />,
      path: "/dashboard/invoices",
    },
    { name: "Add Book", icon: <FaPlusSquare />, path: "/dashboard/add-books" },
    { name: "My Books", icon: <FaBook />, path: "/dashboard/my-books" },
    {
      name: "Manage Orders",
      icon: <FaClipboardList />,
      path: "/dashboard/manage-orders",
    },
    {
      name: "Manage Users",
      icon: <FaUsers />,
      path: "/dashboard/manage-users",
    },
    {
      name: "Manage Books",
      icon: <GiBookshelf />,
      path: "/dashboard/manage-books",
    },
    { name: "My Profile", icon: <FaUser />, path: "/dashboard/profile" },
  ];

  return (
    <div className={`drawer ${isSidebarOpen ? "lg:drawer-open" : ""} font-inter bg-base-100 min-h-screen`}>
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

          {/* Desktop Toggle Button */}
          <div className="flex-none hidden lg:block">
            <button
              onClick={toggleSidebar}
              className="btn btn-square btn-ghost"
              title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
              {isSidebarOpen ? <FaArrowLeft className="text-lg" /> : <FaArrowRight className="text-lg" />}
            </button>
          </div>

          <div className="flex-1 px-2 mx-2">
            {!isSidebarOpen && <div className="hidden lg:block"><Logo /></div>}
            <div className="lg:hidden"><Logo /></div>
          </div>
        </div>

        {/* Main Content Area with Gradient */}
        <div className="p-6 md:p-10 flex-1 h-full min-h-screen bg-gradient-to-br from-base-100 via-base-50 to-base-200/50">
          <Outlet />
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="drawer-side z-50">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-72 min-h-full bg-base-100 border-r border-base-200 text-base-content flex flex-col">
          {/* Sidebar Logo */}
          <div className="mb-8 pl-2 flex justify-center lg:justify-start">
            <Logo />
          </div>

          {/* Menu Items */}
          <ul className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium ${isActive
                      ? "bg-primary text-white shadow-md shadow-primary/30"
                      : "hover:bg-base-200 hover:text-primary"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Logout Button (Bottom) */}
          <div className="border-t border-base-200 pt-4 mt-4">
            <button className="flex items-center gap-4 px-4 py-3 w-full rounded-lg text-error hover:bg-error/10 transition-colors duration-200 font-medium text-base">
              <span className="text-lg">
                <FaSignOutAlt />
              </span>
              Logout
            </button>
          </div>

          {/* User Profile Summary */}
          <div className="mt-6 flex items-center gap-3 px-2">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-10">
                <span className="text-xs">UI</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">User Name</span>
              <span className="text-xs text-base-content/60">Librarian</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
