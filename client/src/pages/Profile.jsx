import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaEdit,
  FaPlus,
} from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";
import { LOGOUT_ICON } from "../icons/icons";
import { useContext, useEffect } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserDetails } from "../helpers/dbFunctions";

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let userDetails = await getUserDetails(user.email);
          setUserInfo({ ...userDetails });
        }
      });
    };
    if (Object.keys(userInfo).length === 0) {
      getUserInfo();
    }
  }, [userInfo]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserInfo({});
        if (localStorage.getItem("meet-auth"))
          localStorage.removeItem("meet-auth");
        navigate("/");
      })
      .catch(() => {
        toast("something went wrong !!!");
      });
  };
  return (
    <div className="bg-gray-50 font-roboto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-red-500 to-rose-700"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-wrap items-end -mt-16">
              <div className="w-32 h-32 bg-white rounded-full p-2 mr-6 border border-gray-400 shadow-sm shadow-gray-400">
                <img
                  src={userInfo.user_photo ? userInfo.user_photo : DEFAULT_USER}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1 mt-16 sm:mt-0">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold">
                      {userInfo.user_name ? userInfo.user_name : ""}
                    </h1>
                    {userInfo.user_profession && (
                      <p className="text-gray-600">
                        {userInfo.user_profession}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 mt-4 sm:mt-0">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-bold">
                      Follow
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex justify-center p-1"
                      onClick={handleLogOut}
                    >
                      <div className="flex justify-center items-center m-1">
                        <img
                          src={LOGOUT_ICON}
                          alt="logout"
                          loading="lazy"
                          className="w-[20px] h-[20px]"
                        />
                      </div>
                      <div className="m-1 flex justify-center font-medium ">
                        <p>Logout</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts</span>
                  <span className="font-semibold">245</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">14.3K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Following</span>
                  <span className="font-semibold">892</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                {userInfo.user_location && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaMapMarkerAlt /> {userInfo.user_location}
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <FaEnvelope />{" "}
                  {userInfo.user_email ? userInfo.user_email : ""}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="flex overflow-x-auto">
                <button className="flex-1 px-6 py-4 text-red-500 font-bold text-xl cursor-default">
                  Timeline
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2].map((post) => (
                <div key={post} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={DEFAULT_USER}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-gray-500 text-sm">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Just shipped a new feature! 🚀 #coding #developer
                  </p>
                  <img
                    src="https://via.placeholder.com/600x400"
                    alt=""
                    className="rounded-lg w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link to="/edit_profile">
        <button className="fixed bottom-28 right-8 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 transition">
          <FaPlus className="w-6 h-6" />
        </button>
      </Link>
      <Link to="/edit_profile">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-600 transition">
          <FaEdit className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
};

export default Profile;
