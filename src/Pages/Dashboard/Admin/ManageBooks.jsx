import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaExchangeAlt, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();

  // ===============================
  // Fetch All Books (Admin)
  // ===============================
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-books");
      return res.data;
    },
  });

  // ===============================
  // Publish / Unpublish
  // ===============================
  const handleTogglePublish = async (book) => {
    try {
      await axiosSecure.patch(`/books/${book._id}/status`, {
        isPublished: !book.isPublished,
      });

      toast.success(book.isPublished ? "Book Unpublished" : "Book Published");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  // ===============================
  // Delete Book
  // ===============================
  const handleDeleteBook = async (id) => {
    const confirmDelete = confirm(
      "Are you sure? This will delete the book and all related orders."
    );

    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/books/${id}`);

      toast.success("Book deleted successfully");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    }
  };

  // ===============================
  // UI
  // ===============================
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Books
          </h2>
          <p className="text-base-content/60 mt-1">
            Total Books:{" "}
            <span className="font-semibold text-primary">{books.length}</span>
          </p>
        </div>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-xl border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200/50 text-base-content uppercase text-xs font-bold">
              <tr>
                <th className="py-4">#</th>
                <th>Book</th>
                <th>Author</th>
                <th>Status</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {books.map((book, index) => (
                <tr key={book._id} className="hover">
                  <td className="font-bold text-base-content/60">{index + 1}</td>

                  {/* Book Image & Title */}
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-14 h-14 bg-base-300">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{book.title}</div>
                        <div className="text-sm opacity-60">Category: {book.category}</div>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium">{book.author}</td>

                  {/* Status Badge */}
                  <td>
                    <span
                      className={`badge badge-lg gap-2 text-white shadow-sm ${book.isPublished ? "badge-success" : "badge-warning"
                        }`}
                    >
                      {book.isPublished ? "Published" : "Unpublished"}
                    </span>
                  </td>

                  {/* Actions Buttons */}
                  <td className="text-right">
                    <div className="flex justify-end gap-2 pr-2">
                      {/* Toggle Publish Button */}
                      <div
                        className="tooltip"
                        data-tip={book.isPublished ? "Unpublish Book" : "Publish Book"}
                      >
                        <button
                          onClick={() => handleTogglePublish(book)}
                          className={`btn btn-sm btn-square ${book.isPublished
                              ? "btn-outline btn-warning hover:btn-warning"
                              : "btn-outline btn-success hover:btn-success"
                            }`}
                        >
                          <FaExchangeAlt />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <div className="tooltip tooltip-error" data-tip="Delete Book">
                        <button
                          onClick={() => handleDeleteBook(book._id)}
                          className="btn btn-sm btn-square btn-outline btn-error hover:btn-error"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {books.length === 0 && (
            <div className="p-10 text-center text-base-content/50">
              <p className="text-lg">No books found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;
