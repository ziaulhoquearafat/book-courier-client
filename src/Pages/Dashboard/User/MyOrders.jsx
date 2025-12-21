import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-orders");
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.patch(`/orders/${id}/cancel`);
      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>

                <td className="flex items-center gap-3">
                  <img
                    src={order.bookImage}
                    alt=""
                    className="w-12 h-16 object-cover rounded"
                  />
                  <span>{order.bookTitle}</span>
                </td>

                <td>{new Date(order.orderDate).toLocaleDateString()}</td>

                <td>
                  <span
                    className={`badge ${
                      order.orderStatus === "pending"
                        ? "badge-warning"
                        : order.orderStatus === "cancelled"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td className="space-x-2">
                  {/* Cancel Button */}
                  {order.orderStatus === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}

                  {/* Pay Now Button */}
                  {order.orderStatus === "pending" &&
                    order.paymentStatus === "unpaid" && (
                      <Link
                        to={`/dashboard/payment/${order._id}`}
                        className="btn btn-sm btn-success"
                      >
                        Pay Now
                      </Link>
                    )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-10">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
