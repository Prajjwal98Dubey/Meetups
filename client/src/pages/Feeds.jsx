import {
  FaBiking,
  FaClock,
  FaCompass,
  FaLaptopCode,
  FaMountain,
  FaPlus,
  FaVolleyballBall,
} from "react-icons/fa";
import { useContext } from "react";
import { useEffect } from "react";
import { feedsPosts } from "../helpers/feedsFunction";
import FeedsContext from "../contexts/FeedsContext";
import DisplayEvents from "../components/DisplayEvents";
import DisplayPost from "../components/DisplayPost";
import Search from "../components/Search";
import { Link, useNavigate } from "react-router-dom";
import CategoryInfoContext from "../contexts/CategoryInfoContext";
import UserInfoContext from "../contexts/UserInfoContext";
// import DEFAULT_USER from "../icons/default_user.png";
import StoryContextInfo from "../contexts/StoryInfoContext";
const Feeds = () => {
  const { feedsInfo, setFeedsInfo } = useContext(FeedsContext);
  const { selectedCategory, setSelectedCategory } =
    useContext(CategoryInfoContext);
  const { storyInfo } = useContext(StoryContextInfo);
  // const [isLoadingStory, setIsLoadingStory] = useState(true);
  const navigate = useNavigate();

  const categories = [
    { name: "Recent", icon: <FaClock /> },
    { name: "Technology", icon: <FaLaptopCode /> },
    { name: "Bike Rides", icon: <FaBiking /> },
    { name: "Sports", icon: <FaVolleyballBall /> },
    { name: "Hiking", icon: <FaMountain /> },
    { name: "Random", icon: <FaCompass /> },
  ];
  const { userInfo } = useContext(UserInfoContext);
  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      navigate("/login");
      return;
    }
    // else {
    //   if (Object.keys(storyInfo).length === 0) {
    //     getAllStories()
    //       .then((res) => {
    //         setStoryInfo([...res]);
    //         setIsLoadingStory(false);
    //       })
    //       .catch((err) => console.log(err));
    //   } else setIsLoadingStory(false);
    // }
  }, [navigate, storyInfo, userInfo]);
  useEffect(() => {
    const getFeeds = async () => {
      let feeds = await feedsPosts(selectedCategory.trim().toLowerCase());
      setFeedsInfo([...feeds]);
    };
    if (feedsInfo.length === 0) getFeeds();
  }, [feedsInfo, selectedCategory]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Search />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {/* <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-[2px]">
              <Link to="/add-story">
                <button className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <FaPlus className="text-blue-500" />
                </button>
              </Link>
            </div>
            <p className="text-xs text-center mt-1">Add Story</p>
          </div> */}

          {/* {isLoadingStory ? (
            <div>Loading...</div>
          ) : (
            storyInfo.slice(0, storyInfo.length - 1).map((story, index) => (
              <Link key={index} to={`/story?id=${index}`}>
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-full p-[2px]">
                    <img
                      src={DEFAULT_USER}
                      className="w-full h-full rounded-full object-cover border-2 border-white"
                    />
                  </div>
                  <p className="text-xs text-center mt-1">User {index + 1}</p>
                </div>
              </Link>
            ))
          )} */}
        </div>

        <div className="mt-6 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/feeds?category=${category.name.toLowerCase()}`}
            >
              <button
                onClick={() => {
                  setFeedsInfo([]);
                  setSelectedCategory(category.name);
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-200
                ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="whitespace-nowrap font-medium">
                  {category.name}
                </span>
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {feedsInfo.length === 0 ? (
            <div className="flex justify-center items-center p-2">
              <p className="text-[#313131] text-2xl">No Events ...</p>
            </div>
          ) : (
            feedsInfo.slice(0, feedsInfo.length - 1).map((feed) => {
              return feed.isEvent ? (
                <DisplayEvents key={feed.eventId} event={feed} />
              ) : (
                <DisplayPost key={feed.postId} post={feed} />
              );
            })
          )}
        </div>
      </div>
      <Link to="/new_post">
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow">
          <FaPlus className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
};

export default Feeds;
