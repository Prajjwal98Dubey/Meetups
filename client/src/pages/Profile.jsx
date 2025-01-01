import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaEdit,
  FaPlus,
  FaArrowLeft,
} from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";
import { LOGOUT_ICON } from "../icons/icons";
import { useContext, useEffect } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { auth, db } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DisplayPost from "../components/DisplayPost";
import { collection, getDocs, query, where } from "firebase/firestore";
import PostsContext from "../contexts/PostsContext";
import EventsContext from "../contexts/EventsContext";
import DisplayEvents from "../components/DisplayEvents";
import FilterValueContext from "../contexts/FIlterValueContext";
import { signOut } from "firebase/auth";
import CategoryInfoContext from "../contexts/CategoryInfoContext";
import FollowInfoContext from "../contexts/FollowInfoContext";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const { postsInfo, setPostsInfo } = useContext(PostsContext);
  const { eventsInfo, setEventsInfo } = useContext(EventsContext);
  const { filterValue, setFilterValue } = useContext(FilterValueContext);
  const { setSelectedCategory } = useContext(CategoryInfoContext);
  const { followInfo } = useContext(FollowInfoContext);

  useEffect(() => {
    const getUserPosts = async () => {
      const q = query(
        collection(db, "meet_posts"),
        where("postUser", "==", userInfo.user_email)
      );
      const documentSnapShots = await getDocs(q);
      let allPosts = [];
      documentSnapShots.forEach((doc) => {
        allPosts.push(doc.data());
      });
      setPostsInfo([...allPosts]);
    };
    const getUsersEvents = async () => {
      const q = query(
        collection(db, "meet_events"),
        where("eventHost", "==", userInfo.user_email)
      );
      const documentSnapShots = await getDocs(q);
      let allEvents = [];
      documentSnapShots.forEach((doc) => {
        allEvents.push(doc.data());
      });
      setEventsInfo([...allEvents]);
    };

    if (postsInfo.length === 0) {
      getUserPosts();
    }
    if (eventsInfo.length === 0) {
      getUsersEvents();
    }
  }, [eventsInfo.length, postsInfo.length, userInfo.user_email]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setUserInfo({});
        setPostsInfo([]);
        setEventsInfo([]);
        setFilterValue("all");
        setSelectedCategory("recent");
        navigate("/");
        if (localStorage.getItem("meet-auth"))
          localStorage.removeItem("meet-auth");
      })
      .catch(() => {
        toast("something went wrong !!!");
      });
  };

  return (
    <div className="bg-gray-50 font-roboto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-700 relative">
            <button
              onClick={() => navigate("/feeds")}
              className="absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-200"
            >
              <FaArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="px-8 pb-8">
            <div className="flex flex-wrap items-end -mt-16">
              <div className="w-32 h-32 bg-white rounded-full p-2 mr-6 border border-gray-400 shadow-sm shadow-gray-400 z-50">
                <img
                  src={userInfo.user_photo ? userInfo.user_photo : DEFAULT_USER}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1 mt-16 sm:mt-0">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h1 className="lg:text-3xl text-xl font-bold">
                      {userInfo.user_name ? userInfo.user_name : ""}
                    </h1>
                    {userInfo.user_profession && (
                      <p className="text-gray-600 sm:text-[15px]">
                        {userInfo.user_profession}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-4 mt-4 sm:mt-0">
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
                  <span className="font-semibold">{postsInfo.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold">{followInfo.follower}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Following</span>
                  <span className="font-semibold">{followInfo.following}</span>
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
            <div className="bg-white rounded-xl shadow-sm mb-3">
              <div className="flex overflow-x-auto">
                <button className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent font-extrabold text-xl cursor-default">
                  Timeline
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {(filterValue === "all" || filterValue === "posts") &&
                postsInfo.map((post) => (
                  <DisplayPost key={post.postId} post={post} />
                ))}
            </div>
            <div className="h-[5px]"></div>
            <div className="space-y-6">
              {(filterValue === "all" || filterValue === "events") &&
                eventsInfo.map((event) => (
                  <DisplayEvents key={event.eventId} event={event} />
                ))}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
              </div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-medium">Sort By</h2>
                <select
                  className="border border-gray-400 font-bold p-1 rounded-md"
                  onChange={(e) => setFilterValue(e.target.value)}
                  defaultValue={filterValue}
                >
                  <option className="font-bold" value="all">
                    All
                  </option>
                  <option className="font-bold" value="events">
                    Only Events
                  </option>
                  <option className="font-bold" value="posts">
                    Only Posts
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to="/new_post">
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
