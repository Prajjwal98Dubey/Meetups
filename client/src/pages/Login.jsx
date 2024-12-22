import { FaLock, FaGoogle, FaEnvelope } from "react-icons/fa";
import AuthSideBar from "../components/AuthSideBar";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { googleSignIn, loginUser } from "../firebase/authentication";
import toast from "react-hot-toast";
import UserInfoContext from "../contexts/UserInfoContext";
import { AUTH_LOADER_ICON } from "../icons/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserInfoContext);

  const handleLoginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter all mandatory fields...");
    try {
      setIsLoading(true);
      await loginUser(email, password);
      setIsLoading(false);
      navigate("/");
    } catch {
      setIsLoading(false);
      toast.error("Invalid Credentials", { duration: 1500 });
    }
  };
  return (
    <div className="w-full min-h-screen flex">
      <AuthSideBar />
      <div className="flex items-center justify-center w-1/2 min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 font-roboto ">
        <form className="bg-white p-8 rounded-xl shadow-lg w-96 transform transition-all  shadow-gray-800">
          <div className="text-center mb-8 ">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
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
            <button
              type="submit"
              onClick={handleLoginUser}
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
                <p className="m-1">Sign In</p>
              </div>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={async () => {
                  try {
                    let userDetails = await googleSignIn();
                    setUserInfo({ ...userDetails });
                    navigate("/");
                  } catch {
                    toast.error("Something went Wrong !!!");
                  }
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all"
              >
                <FaGoogle /> Google
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Don&apos;t have an account?
            <Link to="/register">
              <span className="text-blue-500 hover:underline ml-1">
                Sign up
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
