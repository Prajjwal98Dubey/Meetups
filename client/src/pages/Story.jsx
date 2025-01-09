import { useContext, useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import DEFAULT_USER from "../icons/default_user.png";
import StoryContextInfo from "../contexts/StoryInfoContext";
import { getTimeStamp } from "../helpers/getFormattedTime";
const Story = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
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
    if (!intervalRef.current && storyInfo[storyIndex].story_images.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => prev + 1);
      }, 3000);
    }
  }, [storyIndex, storyInfo, trigger]);
  const handleNextStory = (e) => {
    if (
      e.clientX >= document.body.clientWidth / 2 &&
      e.clientY >= document.body.clientHeight / 2
    ) {
      if (currentImageIndex === storyInfo[storyIndex].story_images.length) {
        clearInterval(intervalRef.current);
        if (storyIndex === storyInfo.length - 2) {
          navigate("/feeds");
        } else {
          setStoryIndex((prev) => prev + 1);
          setCurrentImageIndex(0);
          intervalRef.current = null;
        }
      } else {
        setCurrentImageIndex((prev) => prev + 1);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTrigger(!trigger);
      }
    }
  };
  if (
    storyIndex < storyInfo.length - 1 &&
    storyInfo[storyIndex].story_images.length === 0
  ) {
    setTimeout(() => {
      setStoryIndex((prev) => prev + 1);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setCurrentImageIndex(0);
    }, 3000);
  }
  if (
    storyInfo[storyIndex].story_images.length > 0 &&
    currentImageIndex === storyInfo[storyIndex].story_images.length
  ) {
    clearInterval(intervalRef.current);
    if (storyIndex === storyInfo.length - 2) {
      navigate("/feeds");
      return;
    }
    setStoryIndex((prev) => prev + 1);
    setCurrentImageIndex(0);
    intervalRef.current = null;
    return;
  }

  const handleSearchOnGoogleMap = (searchQuery) => {
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery);
      window.open(
        `https://www.google.com/maps/search/${encodedQuery}`,
        "_blank"
      );
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div
            className={`relative w-full h-full md:w-[400px] md:h-[700px] ${
              storyInfo[storyIndex].story_images.length === 0 &&
              "border border-gray-300 rounded-md shadow-sm shadow-gray-200"
            }`}
            id="story"
            onClick={handleNextStory}
          >
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={storyInfo[storyIndex].user_photo || DEFAULT_USER}
                    alt="user"
                    className="w-8 h-8 rounded-full border border-white/20 object-cover"
                  />
                  <div>
                    <h4 className="text-white font-medium">
                      {storyInfo[storyIndex].user_name}
                    </h4>
                    <div className="text-xs text-white/60 font-medium">
                      {getTimeStamp(storyInfo[storyIndex].story_post_time)}
                    </div>
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

            {storyInfo[storyIndex].story_images.length > 0 && (
              <img
                src={storyInfo[storyIndex].story_images[currentImageIndex]}
                alt="Story"
                className="w-full h-full object-cover"
              />
            )}
            <div
              className={`absolute ${
                storyInfo[storyIndex].story_images.length > 0
                  ? "bottom-0 left-0 right-0"
                  : "bottom-1/2 left-0 right-0"
              }  p-4 bg-gradient-to-t from-black/60 to-transparent`}
            >
              {storyInfo[storyIndex].story_caption && (
                <p
                  className={`text-white ${
                    storyInfo[storyIndex].story_images.length > 0
                      ? "text-sm m-1"
                      : "text-lg m-2"
                  } font-bold `}
                >
                  {storyInfo[storyIndex].story_caption}
                </p>
              )}
              {storyInfo[storyIndex].story_location && (
                <div
                  className={`flex items-center gap-1 text-white/80 hover:underline cursor-pointer w-fit h-fit ${
                    storyInfo[storyIndex].story_images.length > 0
                      ? "text-sm mt-1 mb-1"
                      : "text-md mt-3 mb-3"
                  } mb-2 font-bold`}
                >
                  <FaMapMarkerAlt className="text-purple-600" />
                  <span
                    className="w-fit h-fit"
                    onClick={() =>
                      handleSearchOnGoogleMap(
                        storyInfo[storyIndex].story_location
                      )
                    }
                  >
                    {storyInfo[storyIndex].story_location.split(",")[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Story;
