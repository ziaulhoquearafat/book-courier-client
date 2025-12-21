import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { FaBook, FaUser, FaDollarSign, FaImage, FaInfoCircle, FaArrowLeft, FaSave, FaEye } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  // Fetch single book
  const { data: book, isLoading } = useQuery({
    queryKey: ["books", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      price: "",
      description: "",
      image: "",
      status: "",
    },
  });

  React.useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        price: book.price,
        description: book.description,
        image: book.image,
        status: book.status,
      });
    }
  }, [book, reset]);

  const updateBookMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/books/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["books", id]);
      navigate("/dashboard/my-books");
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to update book ❌");
    },
  });

  const onSubmit = (data) => {
    updateBookMutation.mutate(data);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard/my-books")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Back to My Books
          </button>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaBook className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
              <p className="text-gray-600">Update your book information and settings</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                <h2 className="text-xl font-semibold text-white">Book Details</h2>
                <p className="text-blue-100 text-sm">Modify your book information</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                {/* Title & Author Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FaBook className="text-blue-500" />
                      Book Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter book title"
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Author */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FaUser className="text-purple-500" />
                      Author *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter author name"
                      {...register("author", { required: "Author is required" })}
                    />
                    {errors.author && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.author.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Price & Status Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FaDollarSign className="text-green-500" />
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="0.00"
                      {...register("price", { required: "Price is required" })}
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FaInfoCircle className="text-orange-500" />
                      Status *
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      {...register("status", { required: "Status is required" })}
                    >
                      <option value="">Select status</option>
                      <option value="published" className="text-green-600">📖 Published</option>
                      <option value="unpublished" className="text-gray-600">📝 Unpublished</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaImage className="text-indigo-500" />
                    Image URL *
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="https://example.com/book-image.jpg"
                    {...register("image", { required: "Image URL is required" })}
                  />
                  {errors.image && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.image.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaInfoCircle className="text-teal-500" />
                    Description *
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    rows={6}
                    placeholder="Write a compelling description for your book..."
                    {...register("description", {
                      required: "Description is required",
                    })}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={updateBookMutation.isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {updateBookMutation.isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating Book...
                      </>
                    ) : (
                      <>
                        <FaSave className="text-lg" />
                        Update Book
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <FaEye className="text-gray-600 text-lg" />
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              </div>

              {/* Book Preview Card */}
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                  {book?.image ? (
                    <img
                      src={book.image}
                      alt="Book cover"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FaImage className="text-4xl" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg leading-tight">
                      {book?.title || "Book Title"}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      by {book?.author || "Author Name"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-600">
                      ${book?.price || "0.00"}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      book?.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {book?.status === 'published' ? 'Published' : 'Unpublished'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {book?.description || "Book description will appear here..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
