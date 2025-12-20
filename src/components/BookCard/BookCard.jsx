import { Link } from "react-router";

const BookCard = ({ book }) => {
  const { title, author, price, image } = book;

  return (
    <Link to={`/book-details/${book.id}`}>
      <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition">
        {/* Book Image */}
        <figure className="h-56 bg-base-200 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </figure>

        <div className="card-body text-center">
          {/* Title */}
          <h2 className="text-center text-lg font-semibold">{title}</h2>

          {/* Author */}
          <p className="text-sm text-neutral/70">
            by <span className="font-medium">{author}</span>
          </p>

          {/* Price */}
          <div className="mt-3">
            <span className="text-primary text-lg font-bold">$ {price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
