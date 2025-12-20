import { useForm } from "react-hook-form";

const PurchaseModal = ({ isOpen, onClose, book, user, onPlaceOrder }) => {
  const { register, handleSubmit, reset } = useForm();

  const submitHandler = (data) => {
    const orderData = {
      bookId: book?.id,
      bookTitle: book?.title,
      userName: user?.displayName,
      userEmail: user?.email,
      phone: data.phone,
      address: data.address,
      status: "pending",
      paymentStatus: "unpaid",
    };
    onPlaceOrder(orderData);
    reset(); // form reset
    onClose(); // close modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-base-100 w-full max-w-md p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-error text-lg font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">
          Order {book?.title}
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Phone Number</span>
            </label>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="input input-bordered w-full"
              {...register("phone", { required: "Phone number is required" })}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">Address</span>
            </label>
            <textarea
              placeholder="Enter your address"
              className="textarea textarea-bordered w-full"
              {...register("address", { required: "Address is required" })}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full text-white">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;
