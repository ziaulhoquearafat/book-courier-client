import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { loading, user } = useAuth();

  useEffect(() => {
    if (loading) return; // Wait until Firebase Auth loads the user state

    if (sessionId && user) {
      axiosSecure
        .post("/verify-payment", {
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
  }, [sessionId, navigate, axiosSecure, loading, user]);

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
