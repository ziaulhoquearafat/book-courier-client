import PurchaseModal from "../../components/Modal/PurchaseModal";

const BookDetails = () => {
  // Hardcoded book data
  const book = {
    _id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    description:
      "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    sellerName: "Book Heaven",
    sellerEmail: "sales@bookheaven.com",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="flex justify-center items-center bg-base-200 rounded-lg p-6 h-[400px] md:h-[500px]">
          <img
            src={book.image}
            alt={book.title}
            className="h-full object-contain shadow-lg rounded-md"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-neutral">{book.title}</h1>
            <p className="text-xl text-gray-500 mt-1">
              by <span className="text-primary">{book.author}</span>
            </p>
          </div>

          <div className="text-3xl font-bold text-primary">৳ {book.price}</div>

          {/* Seller Info */}
          <div className="bg-base-200 p-4 rounded-lg border border-base-300">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
              Seller Information
            </h3>
            <p className="font-medium text-neutral">{book.sellerName}</p>
            <p className="text-sm text-gray-600">{book.sellerEmail}</p>
          </div>

          {/* Order Button */}
          <button
            onClick={() =>
              document.getElementById("purchase_modal").showModal()
            }
            className="btn btn-primary w-full md:w-fit px-8"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-neutral mb-4 border-b pb-2">
          Description
        </h2>
        <p className="text-gray-600 leading-relaxed">{book.description}</p>
      </div>

      {/* DaisyUI Modal */}
      <PurchaseModal book={book} />
    </div>
  );
};

export default BookDetails;
