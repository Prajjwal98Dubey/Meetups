import { FaSearch, FaPlus } from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";
import { useContext } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getUserDetails } from "../helpers/dbFunctions";
import { feedsPosts } from "../helpers/feedsFunction";
import FeedsContext from "../contexts/FeedsContext";
import DisplayEvents from "../components/DisplayEvents";
import DisplayPost from "../components/DisplayPost";

const Feeds = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { feedsInfo, setFeedsInfo } = useContext(FeedsContext);
  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let userDetails = await getUserDetails(user.email);
          setUserInfo({ ...userDetails });
        }
      });
    };
    if (Object.keys(userInfo).length === 0) getUserInfo();
  }, [userInfo]);
  useEffect(() => {
    const getFeeds = async () => {
      let feeds = await feedsPosts();
      console.log("feeed details", feeds);
      setFeedsInfo([...feeds]);
    };
    if (Object.keys(feedsInfo).length === 0) getFeeds();
  }, [feedsInfo]);
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50 flex justify-center">
        <div className="w-1/4 flex justify-center items-center">
          <Link to="/">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              LinkUp
            </p>
          </Link>
        </div>
        <div className="w-1/2 mx-auto px-4 py-3 ">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search feeds..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100/80 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 w-1/4 justify-center">
          <div className="text-right hidden sm:block">
            <p className="font-medium text-gray-900">{userInfo.user_name}</p>
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
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-[2px]">
              <button className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <FaPlus className="text-blue-500" />
              </button>
            </div>
            <p className="text-xs text-center mt-1">Add Story</p>
          </div>
          {[1, 2, 3, 4, 5].map((story) => (
            <div key={story} className="flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full p-[2px]">
                <img
                  src={DEFAULT_USER}
                  className="w-full h-full rounded-full object-cover border-2 border-white"
                />
              </div>
              <p className="text-xs text-center mt-1">User {story}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {feedsInfo.map((feed) => {
            return feed.isEvent ? (
              <DisplayEvents key={feed.eventId} event={feed} />
            ) : (
              <DisplayPost key={feed.postId} post={feed} />
            );
          })}
        </div>
      </div>

      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow">
        <FaPlus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Feeds;
