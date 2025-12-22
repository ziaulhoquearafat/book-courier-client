import { useNavigate } from "react-router";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const ErrorPages = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <FaExclamationTriangle className="text-red-500 text-4xl" />
        </div>

        {/* Error Number */}
        <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>

        {/* Error Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>

        {/* Error Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <FaHome className="text-sm" />
            Go Home
          </button>

          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <FaArrowLeft className="text-sm" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPages;
