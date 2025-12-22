import { useQuery } from "@tanstack/react-query";
import {
  FaFileInvoice,
  FaCreditCard,
  FaCalendarAlt,
  FaDollarSign,
  FaReceipt,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaFilter
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Invoice = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-payments");
      return res.data;
    },
  });

  // Calculate stats
  const totalSpent = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);
  const totalInvoices = payments.length;
  const averageOrder = totalInvoices > 0 ? (totalSpent / totalInvoices).toFixed(2) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaFileInvoice className="text-white text-2xl animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Invoices...</h3>
          <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Invoices</h2>
          <p className="text-red-600 text-sm">Please try again later or contact support</p>
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
              <FaFileInvoice className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">My Invoices</h1>
              <p className="text-gray-600">Track your payment history and download receipts</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <FaReceipt className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Invoices</p>
                  <p className="text-2xl font-bold text-gray-900">{totalInvoices}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaCreditCard className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Order</p>
                  <p className="text-2xl font-bold text-gray-900">${averageOrder}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white">
              <option value="">All Time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
            </select>
          </div>

          {/* Invoices List */}
          {payments.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaFileInvoice className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Invoices Found</h3>
              <p className="text-gray-600">You haven't made any purchases yet. Start shopping to see your invoices here!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {payments.map((payment, index) => (
                <div
                  key={payment._id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Invoice Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FaReceipt className="text-white text-sm" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">Invoice #{index + 1}</h3>
                        <p className="text-sm text-gray-500">Order #{payment._id?.slice(-8)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCheckCircle className="text-green-500 text-sm" />
                      <span className="text-xs text-green-600 font-medium">Paid</span>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-1">{payment.bookTitle}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-blue-500" />
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-purple-500" />
                        {new Date(payment.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Amount</p>
                        <p className="text-lg font-bold text-green-600">${payment.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Currency</p>
                        <p className="text-lg font-semibold text-gray-900">{payment.currency?.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Transaction ID</p>
                      <p className="font-mono text-xs bg-white px-2 py-1 rounded border">{payment.transactionId}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                      <FaEye className="text-xs" />
                      View Details
                    </button>
                    <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg border border-gray-200 font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                      <FaDownload className="text-xs" />
                      Download
                    </button>
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

export default Invoice;
