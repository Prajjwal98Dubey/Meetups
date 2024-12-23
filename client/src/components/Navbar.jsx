import { Link } from "react-router-dom";
import DEFAULT_USER from "../icons/default_user.png";
import { checkUserAuth } from "../helpers/checkAuth";
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
    <div className="h-fit p-2 w-full flex justify-around relative">
      <div className="flex justify-center items-center w-1/3 ">
        <div className="bg-[#313131] rounded-full w-[50px] h-[50px]"></div>
      </div>
      <div className="w-1/3">
        <div className="flex justify-center items-center">
          <p className="font-roboto font-extrabold text-grey-900 text-xl text-red-500 ">
            LinkUp
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="font-roboto text-gray-600 font-medium">
            where people meets for adventures
          </p>
        </div>
      </div>
      <div className=" flex justify-center items-center w-1/3 font-roboto">
        <div className="">
          {checkUserAuth() ? (
            <Link to="/profile">
              <div className="flex justify-center w-fit h-fit p-1 border border-gray-300 rounded-full bg-red-400 hover:cursor-pointer">
                <img
                  src={userInfo.user_photo ? userInfo.user_photo : DEFAULT_USER}
                  alt="loading"
                  loading="lazy"
                  className="w-[50px] h-[50px] rounded-full"
                />
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-gradient-to-r from-red-500 to-rose-700 w-[120px] h-fit p-3 rounded-md text-white font-bold hover:underline">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
