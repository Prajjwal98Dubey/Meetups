import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate("/");
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-500 to-purple-700 flex flex-col justify-center items-center gap-6">
      <FaExclamationCircle className="w-16 h-16 text-white/90" />
      <h1 className="text-3xl font-bold text-white">Oops! Page Not Found</h1>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full
                 hover:bg-white/20 transition-all duration-300 text-white font-medium"
      >
        <FaArrowLeft />
        Go Back
      </button>
    </div>
  );
};

export default Error;
