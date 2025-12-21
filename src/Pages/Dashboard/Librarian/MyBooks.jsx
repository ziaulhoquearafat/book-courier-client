import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBooks = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-books");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-error text-lg font-medium bg-error/10 px-6 py-4 rounded-lg">
          Failed to load books: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Books
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
                <th>Price</th>
                <th className="text-right pr-6">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {books.map((book, i) => (
                <tr key={book._id} className="hover">
                  <td className="font-bold text-base-content/60">{i + 1}</td>

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
                        <div className="text-sm opacity-60">
                          {/* Optional: Add category or other meta if available */}
                          {/* Category: {book.category} */}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-medium">{book.author}</td>

                  <td className="font-semibold text-primary">
                    $ {book.price}
                  </td>

                  {/* Actions Buttons */}
                  <td className="text-right">
                    <div className="flex justify-end pr-2">
                      <div className="tooltip" data-tip="Edit Book">
                        <button
                          className="btn btn-sm btn-square btn-outline btn-primary hover:btn-primary"
                          onClick={() => navigate(`/dashboard/edit-books/${book._id}`)}
                        >
                          <FaEdit />
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
              <p className="text-lg">You haven't added any books yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
