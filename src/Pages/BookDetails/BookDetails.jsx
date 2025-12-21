import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaEnvelope,
  FaHeart,
  FaShare,
  FaShoppingCart,
  FaStar,
  FaTag,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router";
import LoadingSpinner from "../../components/LoadingSpinner";
import PurchaseModal from "../../components/Modal/PurchaseModal";

const BookDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch single book
  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["books", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return res.data;
    },
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to Load Book
          </h2>
          <p className="text-red-600 text-sm">{error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 py-8 lg:py-16">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors duration-200 group"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Books
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Book Image Section */}
            <div className="lg:col-span-1 relative">
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
                <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1 text-sm">
                  <FaHeart className="text-red-500 text-sm" />
                  <span className="font-medium">Wishlist</span>
                </button>
                <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2 px-3 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-1 text-sm">
                  <FaShare className="text-blue-500 text-sm" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>

            {/* Book Information Section */}
            <div className="lg:col-span-2 space-y-6">
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

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
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
                        {book.seller?.name}
                      </p>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <FaEnvelope className="text-gray-400 text-xs" />
                        {book.seller?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FaCalendarAlt className="text-green-500 text-xs" />
                    <span>Member since 2024</span>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={openModal}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 text-base"
              >
                <FaShoppingCart className="text-lg" />
                Order Now - ${book.price}
              </button>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="text-xl font-bold text-blue-600">4.8</div>
                  <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                    <FaStar className="text-yellow-400 text-xs" />
                    Rating
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                  <div className="text-xl font-bold text-green-600">24</div>
                  <div className="text-xs text-gray-600">Sold</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <FaBookOpen className="text-white text-base" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                About This Book
              </h2>
              <p className="text-gray-600 text-sm">
                Discover what makes this book special
              </p>
            </div>
          </div>

          <div className="prose prose-base max-w-none">
            <p className="text-gray-700 leading-relaxed text-base">
              {book.description}
            </p>
          </div>

          {/* Additional Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="text-white text-sm" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Quality Assured
              </h3>
              <p className="text-xs text-gray-600">
                Premium quality books with excellent condition
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="text-white text-sm" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                Fast Delivery
              </h3>
              <p className="text-xs text-gray-600">
                Quick and secure shipping to your doorstep
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="text-white text-sm" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                24/7 Support
              </h3>
              <p className="text-xs text-gray-600">
                Round the clock customer support available
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      {isOpen && (
        <PurchaseModal book={book} isOpen={isOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default BookDetails;
