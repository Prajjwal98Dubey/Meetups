/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getTimeStamp } from "../helpers/getFormattedTime";
import { Link } from "react-router-dom";
import { prepopulateFeedsImage } from "../helpers/feedsFunction";
import DisplayPostShimmer from "./DisplayPostShimmer";

const DisplayPost = ({ post }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [postDetails, setPostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const q = query(
          collection(db, "meet_users"),
          where("user_email", "==", post.postUser)
        );
        const querySnapShot = await getDocs(q);
        if (querySnapShot.empty) return null;
        let userDetails = {};
        querySnapShot.forEach((doc) => {
          userDetails = { ...doc.data() };
        });
        let preLoadedImages = await prepopulateFeedsImage(post.images);
        setPostDetails({ ...post, images: preLoadedImages, ...userDetails });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPostDetails();
  }, [post]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <DisplayPostShimmer />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-2 font-roboto">
          <div className="flex items-center justify-between p-4">
            <Link to={`/u/${postDetails.user_name.split(" ").join("-")}`}>
              <div className="flex items-center gap-3">
                <img
                  src={
                    postDetails.user_photo
                      ? postDetails.user_photo
                      : DEFAULT_USER
                  }
                  alt={post.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{postDetails.user_name}</h4>
                  <p className="text-xs text-gray-500">
                    {getTimeStamp(postDetails.createdAt)}
                  </p>
                </div>
              </div>
            </Link>

            {/* <button className="text-gray-400 hover:text-gray-600">
              <FaShare />
            </button> */}
          </div>
          {postDetails.images && postDetails.images.length > 0 && (
            <div className="relative">
              <img
                src={postDetails.images[currentImageIndex]}
                alt={`Post ${currentImageIndex + 1}`}
                className="w-full aspect-square object-cover"
              />

              {postDetails.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => prev - 1)}
                    disabled={currentImageIndex === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => prev + 1)}
                    disabled={
                      currentImageIndex === postDetails.images.length - 1
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
                  >
                    <FaChevronRight />
                  </button>
                  <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                    {postDetails.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full ${
                          idx === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="p-4">
            <p className="text-gray-800 mb-4">{postDetails.caption}</p>

            {postDetails.isEvent && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <FaCalendarAlt />
                  <span className="font-semibold">{postDetails.eventName}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {new Date(post.eventTime).toLocaleString()}
                </p>
              </div>
            )}

            <div className="flex items-center gap-6 pt-4 border-t">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                {isLiked ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
                <span>{postDetails.likes || 0}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                <FaRegComment />
                <span>{postDetails.comments?.length || 0}</span>
              </button>
            </div>
            {postDetails.comments && postDetails.comments.length > 0 && (
              <div className="mt-4 space-y-2">
                {postDetails.comments.slice(0, 2).map((comment, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <img
                      src={comment.userPhoto || DEFAULT_USER}
                      alt={comment.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-100 rounded-lg p-2 flex-1">
                      <span className="font-semibold">{comment.userName}</span>{" "}
                      <span className="text-gray-700">{comment.text}</span>
                    </div>
                  </div>
                ))}
                {postDetails.comments.length > 2 && (
                  <button className="text-gray-500 text-sm hover:underline">
                    View all {postDetails.comments.length} comments
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayPost;
