import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // ✅ axiosSecure

const PurchaseModal = ({ book, isOpen, onClose }) => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure(); // ✅ use secure axios instance

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isOpen) {
      document.getElementById("purchase_modal").showModal();
    }
  }, [isOpen]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const orderData = {
        bookId: book._id,
        userName: user?.displayName,
        userEmail: user?.email,
        phone: data.phone,
        address: data.address,
      };

      await axiosSecure.post("/orders", orderData); // ✅ JWT auto attach

      toast.success("Order placed successfully!");

      reset();

      // ✅ DaisyUI modal close
      document.getElementById("purchase_modal").close();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    document.getElementById("purchase_modal").close();
    onClose();
  };

  return (
    <dialog id="purchase_modal" className="modal" onClose={onClose}>
      <div className="modal-box bg-base-300">
        <h3 className="font-bold text-xl text-primary mb-4">
          Place Your Order
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <p className="text-error text-sm mt-1">
                Phone number is required
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <textarea
              {...register("address", { required: true })}
              className="textarea textarea-bordered w-full"
            />
            {errors.address && (
              <p className="text-error text-sm mt-1">Address is required</p>
            )}
          </div>

          {/* Buttons */}
          <div className="modal-action flex flex-col gap-2">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Place Order"
              )}
            </button>

            {/* Cancel Button */}
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default PurchaseModal;
