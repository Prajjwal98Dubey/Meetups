import { useContext, useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import DEFAULT_USER from "../icons/default_user.png";
import StoryContextInfo from "../contexts/StoryInfoContext";
const Story = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParam] = useSearchParams();
  const [storyIndex, setStoryIndex] = useState(0);
  const { storyInfo } = useContext(StoryContextInfo);
  const navigate = useNavigate();
  const intervalRef = useRef(null);
  useEffect(() => {
    setStoryIndex(parseInt(searchParam.get("id")));
    setIsLoading(false);
  }, [searchParam]);
  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => prev + 1);
      }, 2000);
    }
  }, [storyIndex]);

  if (currentImageIndex === storyInfo[storyIndex].story_images.length) {
    clearInterval(intervalRef.current);
    if (storyIndex === storyInfo.length - 2) return navigate("/feeds");
    setStoryIndex((prev) => prev + 1);
    setCurrentImageIndex(0);
    intervalRef.current = null;
    return;
  }

  return (
    <>
      {!isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full md:w-[400px] md:h-[700px]">
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {console.log("story index", storyIndex)}
                  <img
                    src={storyInfo[storyIndex].user_photo || DEFAULT_USER}
                    alt="user"
                    className="w-8 h-8 rounded-full border border-white/20"
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      {storyInfo[storyIndex].user_name}
                    </h4>
                    {/* <TimeAgo
                    date={story.timestamp}
                    className="text-xs text-white/60"
                  /> */}
                  </div>
                </div>
                <button
                  className="text-white/60 hover:text-white transition-colors"
                  onClick={() => navigate(-1)}
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            <img
              src={storyInfo[storyIndex].story_images[currentImageIndex]}
              alt="Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              {storyInfo[storyIndex].story_location && (
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2 font-bold">
                  <FaMapMarkerAlt />
                  <span>{storyInfo[storyIndex].story_location}</span>
                </div>
              )}
              {storyInfo[storyIndex].story_caption && (
                <p className="text-white text-sm font-bold">
                  {storyInfo[storyIndex].story_caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Story;
