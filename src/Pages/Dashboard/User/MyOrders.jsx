import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaBan,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaEye,
  FaFilter,
  FaMoneyBillWave,
  FaSearch,
  FaShoppingBag,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-orders");
      console.log(res.data);
      return res.data;
    },
  });

  const handlePayment = async (order) => {
    try {
      const paymentInfo = {
        _id: order._id,
        bookId: order.bookId,
        bookTitle: order.bookTitle,
        bookImage: order.bookImage,
        price: order.price,
        customer: {
          name: user?.displayName,
          email: user?.email,
        },
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo
      );

      window.location.replace(res.data.url); // 🔥 IMPORTANT
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Payment failed", "error");
    }
  };

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/orders/${id}/cancel`);
      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "pending"
  ).length;
  const completedOrders = orders.filter(
    (order) =>
      order.orderStatus === "delivered" || order.orderStatus === "shipped"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "cancelled"
  ).length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.price || 0), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaShoppingBag className="text-white text-2xl animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Your Orders...
          </h3>
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
              <FaShoppingBag className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-600">
                Track and manage all your book orders
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FaShoppingBag className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalOrders}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {pendingOrders}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {completedOrders}
                  </p>
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
                  <p className="text-2xl font-bold text-gray-900">
                    {cancelledOrders}
                  </p>
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
                  placeholder="Search orders..."
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
                <FaShoppingBag className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Orders Found
              </h3>
              <p className="text-gray-600">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
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
                        <span className="text-white font-bold text-sm">
                          #{index + 1}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          Order #{order._id?.slice(-8)}
                        </h3>
                        <p className="text-sm text-gray-500">Book Purchase</p>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex flex-col items-end gap-2">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.orderStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.orderStatus === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : order.orderStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.orderStatus === "pending" && (
                          <FaClock className="inline mr-1" />
                        )}
                        {order.orderStatus === "cancelled" && (
                          <FaBan className="inline mr-1" />
                        )}
                        {order.orderStatus === "delivered" && (
                          <FaCheckCircle className="inline mr-1" />
                        )}
                        {order.orderStatus === "shipped" && (
                          <FaTruck className="inline mr-1" />
                        )}
                        {order.orderStatus.charAt(0).toUpperCase() +
                          order.orderStatus.slice(1)}
                      </div>

                      {/* Payment Status */}
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </div>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex gap-4 mb-4">
                    <div className="w-20 h-28 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={order.bookImage}
                        alt={order.bookTitle}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/80x112?text=Book";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {order.bookTitle}
                      </h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-blue-500 text-xs" />
                          <span>
                            Ordered:{" "}
                            {new Date(order.orderDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMoneyBillWave className="text-green-500 text-xs" />
                          <span className="font-semibold text-green-600">
                            ${order.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                      <FaEye className="text-xs" />
                      View Details
                    </button>

                    {order.orderStatus === "pending" &&
                      order.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePayment(order)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                        >
                          <FaCreditCard className="text-xs" />
                          Pay Now
                        </button>
                      )}

                    {order.orderStatus === "pending" && (
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm border border-red-200"
                      >
                        <FaTimesCircle className="text-xs" />
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

export default MyOrders;
