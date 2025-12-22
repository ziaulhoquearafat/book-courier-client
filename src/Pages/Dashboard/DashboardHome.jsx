import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import {
  FaShoppingBag,
  FaFileInvoice,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaChartLine,
  FaArrowRight,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaUser
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Fetch user stats based on role
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats");
      return res.data;
    },
  });

  const quickActions = [
    {
      title: "My Orders",
      description: "Track your book orders",
      icon: <FaShoppingBag className="text-2xl" />,
      path: "/dashboard/my-orders",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "My Invoices",
      description: "View payment history",
      icon: <FaFileInvoice className="text-2xl" />,
      path: "/dashboard/invoices",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Browse Books",
      description: "Explore our collection",
      icon: <FaBook className="text-2xl" />,
      path: "/all-books",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    }
  ];

  // Add librarian/admin specific actions
  if (stats.role === "librarian" || stats.role === "admin") {
    quickActions.push({
      title: "Add Book",
      description: "Add new books to catalog",
      icon: <FaBook className="text-2xl" />,
      path: "/dashboard/add-books",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    });
  }

  if (stats.role === "librarian") {
    quickActions.push({
      title: "Manage Orders",
      description: "Handle customer orders",
      icon: <FaClipboardList className="text-2xl" />,
      path: "/dashboard/manage-orders",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600"
    });
  }

  if (stats.role === "admin") {
    quickActions.push(
      {
        title: "Manage Users",
        description: "User management",
        icon: <FaUsers className="text-2xl" />,
        path: "/dashboard/manage-users",
        color: "from-indigo-500 to-purple-500",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-600"
      },
      {
        title: "Manage Books",
        description: "Book catalog management",
        icon: <FaBook className="text-2xl" />,
        path: "/dashboard/manage-books",
        color: "from-teal-500 to-green-500",
        bgColor: "bg-teal-50",
        textColor: "text-teal-600"
      }
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChartLine className="text-white text-2xl animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard...</h3>
          <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 lg:py-16">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900">Welcome back, {user?.displayName || 'User'}!</h2>
                <p className="text-sm text-gray-600 capitalize">{stats.role || 'User'} Dashboard</p>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Your Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage your books, orders, and account all in one place
            </p>
          </div>

          {/* Stats Overview */}
          {(stats.role === "user" || stats.role === "librarian" || stats.role === "admin") && (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <FaShoppingBag className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedOrders || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <FaClock className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FaBook className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {stats.role === "librarian" || stats.role === "admin" ? "Books Added" : "Books Ordered"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBooks || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`${action.bgColor} p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer text-left`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white">{action.icon}</span>
                    </div>
                    <FaArrowRight className={`${action.textColor} text-lg group-hover:translate-x-1 transition-transform duration-300`} />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity / Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaClock className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-gray-600 text-sm">Your latest actions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-xs" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Welcome to your dashboard!</p>
                    <p className="text-xs text-gray-600">Just now</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaBook className="text-blue-600 text-xs" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Explore our book collection</p>
                    <p className="text-xs text-gray-600">Browse available books</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <FaShoppingBag className="text-purple-600 text-xs" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Ready to place orders</p>
                    <p className="text-xs text-gray-600">Start shopping now</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features/Help */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <FaStar className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Getting Started</h3>
                  <p className="text-gray-600 text-sm">Helpful tips and features</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">📚 Browse Books</h4>
                  <p className="text-sm text-gray-600">Explore our extensive collection of books across all genres and categories.</p>
                </div>

                <div className="p-4 border border-gray-100 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">🛒 Easy Ordering</h4>
                  <p className="text-sm text-gray-600">Simple and secure checkout process with multiple payment options.</p>
                </div>

                <div className="p-4 border border-gray-100 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Track Everything</h4>
                  <p className="text-sm text-gray-600">Monitor your orders, payments, and account activity in real-time.</p>
                </div>

                <div className="p-4 border border-gray-100 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Personalized Dashboard</h4>
                  <p className="text-sm text-gray-600">Your dashboard adapts to your role with relevant tools and information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
