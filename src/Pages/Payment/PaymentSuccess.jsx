import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/verify-payment`, {
          sessionId,
        })
        .then(() => {
          toast.success("Payment Successful!");
          navigate("/dashboard/my-orders");
        })
        .catch(() => {
          toast.error("Payment verification failed");
        });
    }
  }, [sessionId, navigate]);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-2">Redirecting to orders...</p>
    </div>
  );
};

export default PaymentSuccess;
