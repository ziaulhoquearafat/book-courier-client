import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaBook,
  FaFilter,
  FaHeart,
  FaSearch,
  FaStar,
  FaTag,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import Swal from "sweetalert2";

const Wishlist = () => {
  const queryClient = useQueryClient();

  // 1️⃣ Fetch wishlist
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-wishlist`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return res.data.books || [];
    },
  });

  // 2️⃣ Remove book mutation
  const removeMutation = useMutation({
    mutationFn: async (bookId) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/wishlist/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Book removed from wishlist.", "success");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] }); // v5 syntax
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to remove book",
        "error"
      );
    },
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaHeart className="text-white text-2xl animate-pulse" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Your Wishlist...
          </h3>
          <div className="w-32 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ================= HERO SECTION ================= */}

      {/* ================= WISHLIST TABLE ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Table Header */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-between"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Your Saved Books
                </h2>
                <p className="text-gray-600">Manage your wishlist collection</p>
              </div>

              {/* Search and Filter */}
              <div className="flex gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center gap-2">
                  <FaFilter className="text-sm" />
                  Filter
                </button>
              </div>
            </motion.div>

            {books.length === 0 ? (
              <motion.div variants={fadeInUp} className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaHeart className="text-red-400 text-3xl" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Your Wishlist is Empty
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start building your collection by adding books you love to
                  your wishlist!
                </p>
                <button
                  onClick={() => (window.location.href = "/all-books")}
                  className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
                >
                  <FaBook className="text-lg" />
                  Browse Books
                </button>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-red-50 to-pink-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          #
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Book Details
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Author
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                          Price
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                          Rating
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {books.map((book, index) => (
                        <motion.tr
                          key={book._id}
                          variants={fadeInUp}
                          className="hover:bg-gradient-to-r hover:from-red-50/50 hover:to-pink-50/50 transition-all duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full">
                              <span className="text-white text-sm font-bold">
                                {index + 1}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img
                                  src={book.image}
                                  alt={book.title}
                                  className="w-16 h-20 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                                  onError={(e) => {
                                    e.target.src =
                                      "https://via.placeholder.com/64x80?text=Book";
                                  }}
                                />
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                  <FaHeart className="text-white text-xs" />
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
                                  {book.title}
                                </h4>
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                      key={star}
                                      className={`text-xs ${
                                        star <= 4
                                          ? "text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-xs text-gray-500 ml-1">
                                    (4.0)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                <FaUser className="text-white text-xs" />
                              </div>
                              <span className="font-medium text-gray-900">
                                {book.author}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <FaTag className="text-green-500 text-sm" />
                              <span className="font-bold text-green-600 text-lg">
                                ${book.price}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={`text-sm ${
                                      star <= 4
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">
                                4.0
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  (window.location.href = `/book-details/${book._id}`)
                                }
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-sm rounded-lg transition-all duration-200 flex items-center gap-2"
                              >
                                <FaBook className="text-xs" />
                                View
                              </button>

                              <button
                                onClick={() => removeMutation.mutate(book._id)}
                                disabled={removeMutation.isLoading}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-sm rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {removeMutation.isLoading ? (
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <FaTrash className="text-xs" />
                                )}
                                Remove
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
