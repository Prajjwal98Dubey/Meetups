import { Link } from "react-router-dom";
import DEFAULT_USER from "../icons/default_user.png";
import { useContext, useEffect } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getUserDetails } from "../helpers/dbFunctions";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDetails = await getUserDetails(user.email);
          setUserInfo({ ...userDetails });
        }
      });
    };
    if (Object.keys(userInfo).length === 0) getUserInfo();
  }, [userInfo]);

  return (
    <div className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur group-hover:blur-md transition-all"></div>
              <div className="relative bg-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                LU
              </div>
            </div>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              LinkUp
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              where people meet for adventures
            </p>
          </div>
          <div className="flex items-center gap-3">
            {Object.keys(userInfo).length === 0 ? (
              <Link to="/login">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-700 text-white font-bold font-roboto hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 rounded-md ">
                  Login
                </button>
              </Link>
            ) : (
              <>
                <div className="text-right hidden sm:block">
                  <p className="font-medium text-gray-900">
                    {userInfo.user_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    @{userInfo.user_name?.toLowerCase()}
                  </p>
                </div>
                <Link to="/profile">
                  <img
                    src={userInfo.user_photo || DEFAULT_USER}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-gray-100 hover:border-blue-500 transition-colors"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
