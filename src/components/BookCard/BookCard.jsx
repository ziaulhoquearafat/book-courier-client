const BookCard = () => {
  //   const { title, author, price, image } = book;

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition">
      {/* Book Image */}
      <figure className="h-56 bg-base-200 overflow-hidden">
        <img src="" alt="" className="h-full w-full object-cover" />
      </figure>

      <div className="card-body">
        {/* Title */}
        <h2 className="card-title text-neutral text-lg font-semibold">
          Rich Dad Poor Dad
        </h2>

        {/* Author */}
        <p className="text-sm text-neutral/70">
          by <span className="font-medium">Robert T. Kiyosaki</span>
        </p>

        {/* Price */}
        <div className="mt-3">
          <span className="text-primary text-lg font-bold">$ 200</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
