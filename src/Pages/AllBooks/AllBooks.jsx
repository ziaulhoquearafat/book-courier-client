import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaSort,
  FaBook,
  FaFilter,
  FaTimes,
  FaShoppingCart,
  FaHeart
} from "react-icons/fa";
import BookCard from "../../components/BookCard/BookCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const AllBooks = () => {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState(""); // "", "price_asc", "price_desc", "newest"

  const fetchBooks = async ({ queryKey }) => {
    const [_key, { search, sort }] = queryKey;
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`, {
      params: { search, sort },
    });
    return res.data;
  };

  const {
    data: books = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["books", { search: searchText, sort: sortOption }],
    queryFn: fetchBooks,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Modern Header */}
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg mb-6">
              <FaBook className="text-xl" />
              <span className="font-semibold">BookCourier Library</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Discover Your Next
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Favorite Book</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our extensive collection of books across all genres and categories
            </p>
          </motion.div>

          {/* Enhanced Search & Sort Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100 shadow-sm"
          >
            <form
              onSubmit={handleSearch}
              className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-end"
            >
              {/* Search Input */}
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  🔍 Search Books
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Search by title, author, or genre..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg bg-white shadow-sm"
                  />
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="lg:w-64">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📊 Sort By
                </label>
                <div className="relative">
                  <FaSort className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm appearance-none text-base"
                  >
                    <option value="">Default Order</option>
                    <option value="price_asc">💰 Price: Low to High</option>
                    <option value="price_desc">💎 Price: High to Low</option>
                    <option value="newest">🆕 Newest First</option>
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:w-48">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-base"
                >
                  <FaSearch className="text-sm" />
                  Search Books
                </button>
              </div>
            </form>

            {/* Active Filters */}
            {(searchText || sortOption) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200"
              >
                {searchText && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm"
                  >
                    <FaFilter className="text-xs" />
                    Search: "{searchText}"
                    <button
                      onClick={() => setSearchText("")}
                      className="ml-1 hover:bg-blue-200 rounded-full p-1 transition-colors"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </motion.span>
                )}
                {sortOption && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium shadow-sm"
                  >
                    <FaSort className="text-xs" />
                    {sortOption === "price_asc" && "Price: Low to High"}
                    {sortOption === "price_desc" && "Price: High to Low"}
                    {sortOption === "newest" && "Newest First"}
                    <button
                      onClick={() => setSortOption("")}
                      className="ml-1 hover:bg-green-200 rounded-full p-1 transition-colors"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </motion.span>
                )}
                {(searchText || sortOption) && (
                  <button
                    onClick={() => {
                      setSearchText("");
                      setSortOption("");
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBook className="text-white text-2xl animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Amazing Books...</h3>
              <div className="w-32 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        ) : isError ? (
          <motion.div
            variants={fadeInUp}
            className="text-center py-20"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Failed to Load Books</h3>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </motion.div>
        ) : books.length === 0 ? (
          <motion.div
            variants={fadeInUp}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaBook className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              {searchText ? "No Books Found" : "No Books Available"}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {searchText
                ? "Try adjusting your search terms or browse all books."
                : "Check back later for new arrivals in our collection."
              }
            </p>
            {searchText && (
              <button
                onClick={() => {
                  setSearchText("");
                  setSortOption("");
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Clear Search
              </button>
            )}
          </motion.div>
        ) : (
          <>
            {/* Results Header */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {searchText ? `Search Results` : "All Books"}
                </h2>
                <p className="text-gray-600">
                  {searchText ? `Found ${books.length} books matching "${searchText}"` : `Showing ${books.length} amazing books`}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-sm text-gray-500">
                ✨ Discover • 📚 Read • ❤️ Enjoy
              </div>
            </motion.div>

            {/* Books Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
            >
              {books.map((book, index) => (
                <motion.div
                  key={book._id}
                  variants={itemVariants}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group"
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={fadeInUp}
              className="text-center py-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-gray-100"
            >
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <FaShoppingCart className="text-2xl text-blue-500" />
                  <FaHeart className="text-2xl text-red-500" />
                  <FaBook className="text-2xl text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Start Your Reading Journey?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join thousands of readers who have found their perfect books with BookCourier
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => window.location.href = '/all-books'}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Browse More Books
                  </button>
                  <button
                    onClick={() => window.location.href = '/contact'}
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
