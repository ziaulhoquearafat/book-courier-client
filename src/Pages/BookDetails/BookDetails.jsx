import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCheckCircle,
  FaComment,
  FaHeart,
  FaPaperPlane,
  FaShare,
  FaShoppingCart,
  FaStar,
  FaTag,
  FaThumbsUp,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import useAuth from "../../hooks/useAuth";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Fetch single book
  const { data: book, isLoading } = useQuery({
    queryKey: ["books", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return res.data;
    },
  });

  // Fetch reviews
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}/reviews`
      );
      return res.data;
    },
  });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !reviewText) {
      return Swal.fire("Error", "Rating & review required", "error");
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/books/${id}/review`,
        { rating, review: reviewText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      Swal.fire("Success", "Review submitted!", "success");
      setRating(0);
      setReviewText("");
      refetch();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to submit review",
        "error"
      );
    }
  };

  // Wishlist
  const addToWishlist = async (bookId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        { bookId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (res.data.success) {
        Swal.fire("Success", "Book added to wishlist!", "success");
      } else {
        Swal.fire("Info", res.data.message || "Already in wishlist", "info");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add to wishlist",
        "error"
      );
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8 transition-colors duration-200 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Books
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Book Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-1 relative"
            >
              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-4 transform hover:scale-105 transition-all duration-500">
                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <FaStar className="text-white text-xs" />
                </div>
                <div
                  className="absolute -bottom-3 -left-3 w-5 h-5 bg-pink-400 rounded-full flex items-center justify-center shadow-lg animate-pulse"
                  style={{ animationDelay: "1s" }}
                >
                  <FaHeart className="text-white text-xs" />
                </div>

                <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-inner max-w-xs mx-auto">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x400?text=Book+Cover";
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => addToWishlist(book._id)}
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1 text-sm"
                >
                  <FaHeart className="text-red-500 text-sm" />
                  <span className="font-medium">Wishlist</span>
                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1 text-sm">
                  <FaShare className="text-blue-500 text-sm" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </motion.div>

            {/* Book Information Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Title and Author */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaBookOpen className="text-white text-xs" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Book Details
                  </span>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 flex items-center gap-2">
                  <FaUser className="text-purple-500" />
                  by{" "}
                  <span className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200">
                    {book.author}
                  </span>
                </p>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Price</p>
                    <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
                      <FaTag className="text-green-500" />$ {book.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 mb-1">
                      <FaCheckCircle className="text-sm" />
                      <span className="text-xs font-medium">Available</span>
                    </div>
                    <p className="text-xs text-gray-500">Ready to ship</p>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xs" />
                  </div>
                  Seller Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {book.seller?.name?.charAt(0)?.toUpperCase() || "S"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {book.seller?.name || "Seller Name"}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <FaPaperPlane className="text-gray-400 text-xs" />
                        {book.seller?.email || "seller@email.com"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FaThumbsUp className="text-green-500 text-xs" />
                    <span>Verified Seller</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="text-xl font-bold text-blue-600 mb-1">
                    {reviews.length}
                  </div>
                  <div className="text-xs text-gray-600">Reviews</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                  <div className="text-xl font-bold text-green-600 mb-1">
                    4.8
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <div className="text-xl font-bold text-purple-600 mb-1">
                    24
                  </div>
                  <div className="text-xs text-gray-600">Sold</div>
                </div>
              </div>

              {/* Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 text-base"
              >
                <FaShoppingCart className="text-lg" />
                Order Now - ${book.price}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= DESCRIPTION SECTION ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaBookOpen className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  About This Book
                </h2>
                <p className="text-gray-600 text-sm">
                  Learn more about this book
                </p>
              </div>
            </div>

            <div className="prose prose-base max-w-none">
              <p className="text-gray-700 leading-relaxed text-base">
                {book.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= REVIEWS SECTION ================= */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our readers are saying about this book
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Reviews List */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <FaStar className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Reviews ({reviews.length})
                    </h3>
                    <p className="text-gray-600">Reader experiences</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <FaComment className="text-4xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">
                        No reviews yet. Be the first to review!
                      </p>
                    </div>
                  ) : (
                    reviews.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-100 rounded-xl p-6"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-xs">
                                {r.userEmail?.charAt(0)?.toUpperCase() || "U"}
                              </span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">
                                {r.userEmail}
                              </p>
                              <div className="flex items-center gap-1">
                                {[...Array(r.rating)].map((_, idx) => (
                                  <FaStar
                                    key={idx}
                                    className="text-yellow-400 text-xs"
                                  />
                                ))}
                                <span className="text-xs text-gray-500 ml-1">
                                  ({r.rating}/5)
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-green-600">
                            <FaThumbsUp className="text-xs" />
                            <span className="text-xs">Helpful</span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {r.review}
                        </p>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>

            {/* Add Review Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {user ? (
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <FaPaperPlane className="text-white text-lg" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        Write a Review
                      </h3>
                      <p className="text-gray-600">Share your experience</p>
                    </div>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Rating *
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <motion.button
                            key={n}
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setRating(n)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all duration-200 ${
                              n <= rating
                                ? "bg-yellow-400 text-white shadow-lg"
                                : "bg-gray-100 text-gray-300 hover:bg-gray-200"
                            }`}
                          >
                            ★
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Your Review *
                      </label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={6}
                        placeholder="Share your thoughts about this book..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FaPaperPlane className="text-sm" />
                      Submit Review
                    </motion.button>
                  </form>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center border border-blue-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaUser className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Login to Review
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Please log in to share your thoughts about this book
                  </p>
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Login to Continue
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {isOpen && (
        <PurchaseModal
          book={book}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default BookDetails;
