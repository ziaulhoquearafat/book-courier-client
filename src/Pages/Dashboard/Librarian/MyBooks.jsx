import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBooks = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure(); // ✅ use secure axios instance

  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-books"); // ✅ token automatically attach
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return (
      <p className="text-error text-center">
        Failed to load books: {error.message}
      </p>
    );

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book._id}>
              <th>{i + 1}</th>
              <td>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>$ {book.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/dashboard/edit-books/${book._id}`)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
