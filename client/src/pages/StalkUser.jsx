import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import DEFAULT_USER from "../icons/default_user.png";
import { FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import DisplayPost from "../components/DisplayPost";
import DisplayEvents from "../components/DisplayEvents";
import UserInfoContext from "../contexts/UserInfoContext";
import { onAuthStateChanged } from "firebase/auth";

const StalkUser = () => {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const location = useLocation();
  useEffect(() => {
    const getLoggedInUserDetails = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const q = query(
            collection(db, "meet_users"),
            where("user_email", "==", user.email)
          );
          const querySnapShot = await getDocs(q);
          let userDetails = {};
          querySnapShot.forEach((doc) => {
            userDetails = { ...doc.data() };
          });
          setUserInfo({ ...userDetails });
        }
      });
    };
    if (Object.keys(userInfo).length == 0) getLoggedInUserDetails();
  }, [userInfo]);
  useEffect(() => {
    const getUserDetails = async () => {
      const url = location.pathname.split("/");
      const currUser = url[url.length - 1].split("-").join(" ");
      const q = query(
        collection(db, "meet_users"),
        where("user_name", "==", currUser)
      );
      const documentSnapShot = await getDocs(q);
      if (documentSnapShot.empty)
        return toast.success("No User Exist !!!", { duration: 1500 });
      let userDetails = {};
      documentSnapShot.forEach((doc) => {
        userDetails = { ...doc.data() };
      });
      setUser({ ...userDetails });
      const followerQuery = query(
        collection(db, "meet_follower_following"),
        where("follower", "==", userInfo.user_email),
        where("following", "==", currUser)
      );
      const followerQuerySnapShot = await getDocs(followerQuery);
      if (!followerQuerySnapShot.empty) setIsFollowing(true);
      const postQuery = query(
        collection(db, "meet_posts"),
        where("postUser", "==", userDetails.user_email)
      );
      const postQuerySnapShot = await getDocs(postQuery);
      let postDetails = [];
      postQuerySnapShot.forEach((doc) => postDetails.push(doc.data()));
      setPosts([...postDetails]);
      const eventsQuery = query(
        collection(db, "meet_events"),
        where("eventHost", "==", userDetails.user_email)
      );
      const eventsQuerySnapShot = await getDocs(eventsQuery);
      let eventsDetails = [];
      eventsQuerySnapShot.forEach((doc) => {
        eventsDetails.push(doc.data());
      });
      setEvents([...eventsDetails]);
      setIsLoading(false);
    };
    getUserDetails();
  }, [location.pathname, userInfo.user_email]);

  const handleFollow = async () => {
    if (isFollowing) {
      const followerQuery = query(
        collection(db, "meet_follower_following"),
        where("follower", "==", userInfo.user_email),
        where("following", "==", user.user_name),
        limit(1)
      );
      const querySnapShot = await getDocs(followerQuery);
      if (querySnapShot.empty) return;
      deleteDoc(doc(db, "meet_follower_following", querySnapShot.docs[0].id));
      setIsFollowing(false);
    } else {
      await addDoc(collection(db, "meet_follower_following"), {
        follower: userInfo.user_email,
        following: location.pathname
          .split("/")
          .at(location.pathname.split("/").length - 1)
          .split("-")
          .join(" "),
      });
      setIsFollowing(true);
    }
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className="bg-gray-50 font-roboto">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="h-32 bg-gradient-to-r from-red-500 to-rose-700"></div>
                <div className="px-8 pb-8">
                  <div className="flex flex-wrap items-end -mt-16">
                    <div className="w-32 h-32 bg-white rounded-full p-2 mr-6 border border-gray-400 shadow-sm shadow-gray-400">
                      <img
                        src={user.user_photo ? user.user_photo : DEFAULT_USER}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 mt-16 sm:mt-0">
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h1 className="text-3xl font-bold">
                            {user.user_name ? user.user_name : ""}
                          </h1>
                          {user.user_profession && (
                            <p className="text-gray-600">
                              {user.user_profession}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-4 mt-4 sm:mt-0">
                          {isFollowing ? (
                            <button
                              className="px-6 py-2 bg-blue-500 text-white rounded-lg  bg-gradient-to-r from-green-500 to-green-600 hover:bg-gradient-to-r hover:from-green-700 hover:to-green-900 font-bold"
                              onClick={handleFollow}
                            >
                              Following
                            </button>
                          ) : (
                            <button
                              className="px-6 py-2 bg-blue-500 text-white rounded-lg  bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 font-bold"
                              onClick={handleFollow}
                            >
                              Follow
                            </button>
                          )}
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
                        <span className="font-semibold">{posts.length}</span>
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
                      {user.user_location && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <FaMapMarkerAlt /> {user.user_location}
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-gray-600">
                        <FaEnvelope /> {user.user_email ? user.user_email : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <div className="bg-white rounded-xl shadow-sm mb-3">
                    <div className="flex overflow-x-auto">
                      <button className="flex-1 px-6 py-4 text-red-500 font-extrabold text-xl cursor-default">
                        Timeline
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    {(filter === "all" || filter === "posts") &&
                      posts.map((post) => (
                        <DisplayPost key={post.postId} post={post} />
                      ))}
                  </div>
                  <div className="h-[5px]"></div>
                  <div className="space-y-6">
                    {(filter === "all" || filter === "events") &&
                      events.map((event) => (
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
                        onChange={(e) => setFilter(e.target.value)}
                        defaultValue={filter}
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
          </div>
        </>
      )}
    </>
  );
};

export default StalkUser;
