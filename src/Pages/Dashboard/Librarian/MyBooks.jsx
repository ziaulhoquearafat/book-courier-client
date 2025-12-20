import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MyBooks = () => {
  // Fetch my books
  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myBooks"],
    queryFn: async () => {
      const token = localStorage.getItem("accessToken"); // token from login
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-books`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)
    return <p className="text-error">Failed to load books: {error.message}</p>;

  return (
    <div className="overflow-x-auto">
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
                <button className="btn btn-sm btn-primary">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooks;
