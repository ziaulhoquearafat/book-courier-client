import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  FaClipboardList,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaBan,
  FaUser,
  FaBook,
  FaFilter,
  FaSearch,
  FaEdit,
  FaTimes,
  FaEye
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  // Fetch librarian orders
  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarian-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/librarian-orders");
      return res.data;
    },
  });

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await axiosSecure.patch(`/orders/${orderId}/status`, {
        orderStatus: newStatus,
      });
      Swal.fire("Updated!", `Order status changed to ${newStatus}`, "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleCancel = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/orders/${orderId}/status`, {
        orderStatus: "cancelled",
      });
      Swal.fire("Cancelled!", "Order has been cancelled.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.orderStatus === "pending").length;
  const shippedOrders = orders.filter(order => order.orderStatus === "shipped").length;
  const deliveredOrders = orders.filter(order => order.orderStatus === "delivered").length;
  const cancelledOrders = orders.filter(order => order.orderStatus === "cancelled").length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaClipboardList className="text-white text-2xl animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Orders...</h3>
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
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FaClipboardList className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Manage Orders</h1>
              <p className="text-gray-600">Track and manage all customer orders</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FaClipboardList className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <FaTruck className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shipped</p>
                  <p className="text-2xl font-bold text-gray-900">{shippedOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaCheckCircle className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-gray-900">{deliveredOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaBan className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cancelled</p>
                  <p className="text-2xl font-bold text-gray-900">{cancelledOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders by book or user..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2">
              <FaFilter className="text-sm" />
              Filter
            </button>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaClipboardList className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600">There are no orders to manage at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">#{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Order #{order._id?.slice(-8)}</h3>
                        <p className="text-sm text-gray-500">Order Management</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.orderStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.orderStatus === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {order.orderStatus === "pending" && <FaClock className="inline mr-1" />}
                      {order.orderStatus === "cancelled" && <FaBan className="inline mr-1" />}
                      {order.orderStatus === "delivered" && <FaCheckCircle className="inline mr-1" />}
                      {order.orderStatus === "shipped" && <FaTruck className="inline mr-1" />}
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </div>
                  </div>

                  {/* Book and User Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Book Details */}
                    <div className="flex gap-3">
                      <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={order.bookImage}
                          alt={order.bookTitle}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/64x80?text=Book";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm">{order.bookTitle}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FaBook className="text-blue-500" />
                          <span>Book Order</span>
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="flex gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{order.userName}</p>
                        <p className="text-xs text-gray-600">Customer</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 mb-1">Order Date</p>
                        <p className="font-medium text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Price</p>
                        <p className="font-semibold text-green-600">${order.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Update Section */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <select
                      value={order.orderStatus || "pending"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={
                        updatingOrderId === order._id ||
                        order.orderStatus === "delivered" ||
                        order.orderStatus === "cancelled"
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white disabled:bg-gray-100"
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    {updatingOrderId === order._id && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                      <FaEye className="text-xs" />
                      View Details
                    </button>

                    <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg border border-gray-200 font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                      <FaEdit className="text-xs" />
                      Edit
                    </button>

                    {order.orderStatus === "pending" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-red-200"
                      >
                        <FaTimes className="text-xs" />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
