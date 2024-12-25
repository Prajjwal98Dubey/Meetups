import { useState, useRef, useEffect, useContext } from "react";
import { FaCamera, FaImage } from "react-icons/fa";
import { nanoid } from "nanoid";
import UserInfoContext from "../contexts/UserInfoContext";
import { onAuthStateChanged } from "firebase/auth";
import { getUserDetails } from "../helpers/dbFunctions";
import { auth, db, storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";

const NewPost = () => {
  const [images, setImages] = useState([]);
  const [isEvent, setIsEvent] = useState(false);
  const [caption, setCaption] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let userDetails = await getUserDetails(user.email);
          setUserInfo({ ...userDetails });
        }
      });
    };
    if (Object.keys(userInfo).length === 0) {
      getUserInfo();
    }
  }, [userInfo]);

  const handleCreatePost = async () => {
    if (!isEvent) {
      if (!caption)
        return toast.error("Caption is Mandatoryf 🥲", {
          duration: 1500,
        });
      let postDetails = {
        postId: nanoid(),
        postUser: userInfo.user_email,
        isEvent,
        createdAt: Date.now(),
        caption,
        eventName,
        images,
      };
      addDoc(collection(db, "meet_posts"), postDetails)
        .then(() => toast.success("Post uploaded !!!"))
        .catch((err) => console.log(err));
    } else {
      let eventDetails = {
        eventId: nanoid(),
        eventHost: userInfo.user_email,
        eventTitle,
        eventDescription,
        eventLocation,
        eventStartTime: startTime,
        eventEndTime: endTime,
        eventImages: images,
        createdAt: Date.now(),
      };
      addDoc(collection(db, "meet_events"), eventDetails)
        .then(() => toast.success("Event Organised !!!", { duration: 1500 }))
        .catch((err) => console.log(err));
    }
  };

  const handleImageUpload = (e) => {
    const postImageRef = ref(
      storage,
      `images_meet/posts/${e.target.files[0].name + Date.now()}`
    );
    uploadBytes(postImageRef, e.target.files[0]).then(() => {
      toast.success("Image Uploaded...", { duration: 1500 });
      getDownloadURL(postImageRef).then((url) => {
        setImages([...images, url]);
      });
    });
  };
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gray-900 p-8 relative min-h-[600px] flex items-center justify-center">
              {images.length > 0 ? (
                <>
                  <img
                    src={images[currentImageIndex]}
                    alt="Preview"
                    className="max-h-[500px] object-contain rounded-lg"
                  />
                  {images.length > 1 && (
                    <div className="absolute inset-x-0 bottom-8 flex justify-center gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-gray-500"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <FaImage size={48} className="mx-auto mb-4" />
                  <p>No images selected</p>
                </div>
              )}
            </div>

            <div className="p-8">
              <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

              <div className="space-y-6">
                <div className="bg-gray-100 p-1 rounded-lg flex">
                  <button
                    className={`flex-1 py-2 rounded-md transition ${
                      !isEvent ? "bg-white shadow-sm" : ""
                    }`}
                    onClick={() => setIsEvent(false)}
                  >
                    Regular Post
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-md transition ${
                      isEvent ? "bg-white shadow-sm" : ""
                    }`}
                    onClick={() => setIsEvent(true)}
                  >
                    Event Post
                  </button>
                </div>

                {!isEvent && (
                  <div>
                    <textarea
                      placeholder="What's on your mind?"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="4"
                    />
                    <div className="text-right text-sm text-gray-500">
                      {caption.length}/500
                    </div>
                  </div>
                )}
                {!isEvent && (
                  <div>
                    <input
                      placeholder="Enter event name"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="4"
                    />
                  </div>
                )}
                {isEvent && (
                  <div>
                    <input
                      placeholder="Enter event title"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="4"
                    />
                  </div>
                )}
                {isEvent && (
                  <div>
                    <textarea
                      placeholder="Enter event description"
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="2"
                    />
                    <div className="text-right text-sm text-gray-500">
                      {caption.length}/200
                    </div>
                  </div>
                )}
                {isEvent && (
                  <div>
                    <input
                      placeholder="Enter event location"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows="4"
                    />
                  </div>
                )}
                {isEvent && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time of your event ?
                    </label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                {isEvent && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time of your event ?
                    </label>
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FaImage className="mx-auto mb-2 text-gray-400" size={24} />
                    <p className="text-gray-600">
                      Click to upload or drag images here
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />

                  <div className="flex justify-between">
                    <button
                      onClick={startCamera}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                      <FaCamera /> Take Photo
                    </button>
                    {images.length > 0 && (
                      <button
                        onClick={() => setImages([])}
                        className="text-red-500 hover:text-red-600"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </div>

                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition"
                  onClick={handleCreatePost}
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <video
        ref={videoRef}
        className="fixed inset-0 w-full h-full object-cover hidden"
        autoPlay
        playsInline
      />
    </div>
  );
};

export default NewPost;
