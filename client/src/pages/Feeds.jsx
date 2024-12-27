import { FaPlus } from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";
import { useContext } from "react";
import { useEffect } from "react";
import { feedsPosts } from "../helpers/feedsFunction";
import FeedsContext from "../contexts/FeedsContext";
import DisplayEvents from "../components/DisplayEvents";
import DisplayPost from "../components/DisplayPost";
import Search from "../components/Search";

const Feeds = () => {
  const { feedsInfo, setFeedsInfo } = useContext(FeedsContext);
  useEffect(() => {
    const getFeeds = async () => {
      let feeds = await feedsPosts();
      setFeedsInfo([...feeds]);
    };
    if (Object.keys(feedsInfo).length === 0) getFeeds();
  }, [feedsInfo]);
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Search />
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
