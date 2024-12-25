/* eslint-disable react/prop-types */
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaRegComment,
  FaUserFriends,
  FaShare,
} from "react-icons/fa";
import { db } from "../firebase/firebaseConfig";
import DEFAULT_USER from "../icons/default_user.png";
import { getTimeStamp } from "../helpers/getFormattedTime";

const DisplayEvents = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isJoined, setIsJoined] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    const getEventDetails = async () => {
      try {
        const q = query(
          collection(db, "meet_users"),
          where("user_email", "==", event.eventHost)
        );
        const querySnapShot = await getDocs(q);
        if (querySnapShot.empty) return null;
        let userDetails = {};
        querySnapShot.forEach((doc) => {
          userDetails = { ...doc.data() };
        });
        setEventDetails({ ...event, ...userDetails, attendees: 0 });
      } catch (error) {
        console.log(error);
      }
    };
    getEventDetails();
  }, [event]);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
      {console.log("Details of event", eventDetails)}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <img
            src={eventDetails.user_photo || DEFAULT_USER}
            alt={eventDetails.user_name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{eventDetails.user_name}</h4>
            <p className="text-xs text-gray-500"> {getTimeStamp(eventDetails.createdAt)}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FaShare />
        </button>
      </div>
      {eventDetails.images && eventDetails.images.length > 0 && (
        <div className="relative">
          <img
            src={eventDetails.images[currentImageIndex]}
            alt={`Event ${currentImageIndex + 1}`}
            className="w-full aspect-video object-cover"
          />

          {eventDetails.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) => Math.max(0, prev - 1))
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    Math.min(eventDetails.images.length - 1, prev + 1)
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              >
                <FaChevronRight />
              </button>
              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                {eventDetails.images.map((_, idx) => (
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
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{eventDetails.eventTitle}</h2>

        {eventDetails.eventDescription && (
          <p className="text-gray-600 mb-4">{eventDetails.eventDescription}</p>
        )}

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="text-blue-500" />
            <span>{new Date(eventDetails.eventTime).toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{eventDetails.eventLocation}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaUserFriends className="text-green-500" />
            <span>{eventDetails.attendees?.length || 0} people joined</span>
          </div>
        </div>
        <button
          onClick={() => setIsJoined(!isJoined)}
          className={`w-full py-3 rounded-lg font-semibold mb-4 ${
            isJoined
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isJoined ? "Leave Event" : "Join Event"}
        </button>
        <div>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <FaRegComment />
            <span>{eventDetails.comments?.length || 0} Comments</span>
          </button>

          {showComments && (
            <div className="mt-4 space-y-4">
              {eventDetails.comments?.map((comment, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <img
                    src={comment.userPhoto || DEFAULT_USER}
                    alt={comment.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <span className="font-semibold">{comment.userName}</span>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                    {/* <TimeAgo
                      date={comment.timestamp}
                      className="text-xs text-gray-500 mt-1"
                    /> */}
                  </div>
                </div>
              ))}
              <div className="flex gap-3 mt-4">
                <img
                  src={DEFAULT_USER}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayEvents;
