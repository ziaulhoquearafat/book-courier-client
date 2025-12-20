import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const PurchaseModal = ({ book, isOpen, onClose }) => {
  const { user, loading, setLoading } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const orderData = {
        bookId: book._id, // book id
        userName: user?.displayName,
        userEmail: user?.email,
        phone: data.phone,
        address: data.address,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData
      );

      console.log("Order placed:", res.data);
      toast.success("Oorder Placed Successfully! Check Order Page");

      // Close modal & reset form
      reset();
      onClose();
    } catch (err) {
      console.error("Order failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-primary text-xl font-bold mb-4">Place Order</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <textarea
              {...register("address", { required: true })}
              className="textarea textarea-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
        <button onClick={onClose} className="btn btn-secondary w-full mt-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PurchaseModal;
