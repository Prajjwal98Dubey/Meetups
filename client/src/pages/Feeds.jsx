import {
  FaSearch,
  FaRegComment,
  FaRegHeart,
  FaShare,
  FaEllipsisH,
  FaPlus,
} from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";

const Feeds = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search feeds..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100/80 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {/* Add Story */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-[2px]">
              <button className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <FaPlus className="text-blue-500" />
              </button>
            </div>
            <p className="text-xs text-center mt-1">Add Story</p>
          </div>
          {/* Story Previews */}
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

      {/* Feed Grid */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {[1, 2, 3, 4].map((post) => (
            <div
              key={post}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <img src={DEFAULT_USER} className="w-10 h-10 rounded-full" />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <FaEllipsisH />
                </button>
              </div>

              {/* Post Image */}
              <img
                src={`https://source.unsplash.com/random/600x400?${post}`}
                className="w-full aspect-[4/3] object-cover"
              />

              {/* Post Actions */}
              <div className="p-4">
                <div className="flex items-center gap-6 mb-4">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition">
                    <FaRegHeart /> 2.4k
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition">
                    <FaRegComment /> 128
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition">
                    <FaShare />
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-gray-800">
                  Amazing view from today&apos;s hike! 🏔️ #nature #adventure
                </p>
                <div className="mt-2 flex gap-2">
                  {["nature", "adventure"].map((tag) => (
                    <span key={tag} className="text-xs text-blue-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow">
        <FaPlus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Feeds;
