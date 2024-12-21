import { useState } from "react";
import AuthSideBar from "../components/AuthSideBar";
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../firebase/authentication";
import { AUTH_LOADER_ICON } from "../icons/icons";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!email || !password || !userName || !confirmPassword)
      return toast.error("Enter all Mandotory fields...", { duration: 1500 });
    if (password !== confirmPassword)
      return toast.error("Password do not match", { duration: 1500 });
    try {
      setIsLoading(true);
      await registerUser(email, password);
      navigate("/");
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      toast.error("Something went wrong !!!");
    }
  };
  return (
    <div className="w-full min-h-screen flex">
      <AuthSideBar />
      <div className="w-1/2 min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 font-roboto">
        <form className="bg-white p-8 rounded-xl shadow-lg shadow-gray-800 w-96 transform transition-all">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join our community today</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleRegisterUser}
              className={`w-full ${
                isLoading
                  ? "bg-gray-500"
                  : "bg-gradient-to-r from-blue-500 to-purple-600"
              } text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-all`}
            >
              <div className="flex justify-center">
                {isLoading && (
                  <div className="flex justify-center items-center m-1">
                    <img
                      src={AUTH_LOADER_ICON}
                      alt="loading"
                      className="w-[20px] h-[20px] animate-spin"
                    />
                  </div>
                )}
                <p className="m-1">Sign Up</p>
              </div>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or register with
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all"
              >
                <FaGoogle /> Google
              </button>
            </div>
          </div>
          <p className="mt-8 text-center text-gray-600">
            Already have an account?
            <Link to="/login">
              <span className="text-blue-500 hover:underline ml-1 hover:cursor-pointer">
                Sign in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
