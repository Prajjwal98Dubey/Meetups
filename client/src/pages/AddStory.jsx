import { useState, useRef, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import {
  FaCamera,
  FaMapMarkerAlt,
  FaTimes,
  FaImage,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "../contexts/UserInfoContext";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const AddStory = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const fileInputRef = useRef(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();
  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newImages]);
  };
  useEffect(() => {
    const suggestLocation = async () => {
      if (!location) {
        setLocationSuggestions([]);
        setShowLocationDropdown(false);
        return;
      }
      setIsLoadingLocation(true);
      try {
        let res = await fetch(
          `https://api.olamaps.io/places/v1/autocomplete?input=${location}&location=&api_key=${
            import.meta.env.VITE_OLA_API_KEY
          }`
        );
        res = await res.json();
        console.log("suggestions details", res.predictions);
        setLocationSuggestions(res.predictions || []);
        setShowLocationDropdown(true);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching locations");
      } finally {
        setIsLoadingLocation(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (location) suggestLocation();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [location]);

  const handleShareStory = async () => {
    if (!location && !caption && images.length === 0)
      return toast.error("Add someting to the story!!!");
    const uploadedImages = [];
    images.length > 0 &&
      images.forEach((img) => {
        const imageStorageRef = ref(
          storage,
          `images_meet/story/${img.name + Date.now()}`
        );
        uploadedImages.push(
          new Promise((res, rej) => {
            uploadBytes(imageStorageRef, img).then(() => {
              getDownloadURL(imageStorageRef)
                .then((url) => res(url))
                .catch((err) => rej(err));
            });
          })
        );
      });
    let uploadedImagesUrl = await Promise.all(uploadedImages);
    setImages([...uploadedImagesUrl]);
    toast.success("Images Uploaded...", { duration: 1500 });
    await addDoc(collection(db, "meet_story"), {
      user_name: userInfo.user_name,
      story_caption: caption,
      story_images: uploadedImagesUrl,
      story_location: location,
      story_post_time: Date.now(),
    });
    toast.success("Story Posted...");
    navigate("/feeds");
  };

  return (
    <div className="fixed inset-0 bg-gray-300 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute lg:top-6 top-16 left-6 z-50 p-2 bg-black backdrop-blur-md rounded-full 
                 hover:bg-[#313131] transition-all duration-200 text-white"
      >
        <FaArrowLeft size={20} />
      </button>
      <div className="w-full max-w-6xl h-[90vh] md:h-[80vh] bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 h-1/2 md:h-full relative flex items-center justify-center bg-black/50">
          {images.length > 0 ? (
            <>
              <img
                src={images[currentImage]}
                alt="Story preview"
                className="h-full w-full object-contain"
              />
              {images.length > 1 && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImage ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-white/60 p-4">
              <FaImage size={48} className="mx-auto mb-4" />
              <p className="text-sm md:text-base">
                Drop images here or click to upload
              </p>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3 p-4 md:p-6 bg-white/10 backdrop-blur-md flex flex-col h-1/2 md:h-full">
          <div className="flex justify-between items-center mb-4 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold text-white">
              Create Story
            </h2>
            <button className="text-white/60 hover:text-white">
              <FaTimes size={20} />
            </button>
          </div>
          <div className="flex gap-3 mb-4 md:mb-8">
            <button
              onClick={() => fileInputRef.current.click()}
              className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white text-sm md:text-base hover:opacity-90 transition-opacity"
            >
              <FaImage /> Gallery
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 md:py-3 bg-white/10 rounded-xl text-white text-sm md:text-base hover:bg-white/20 transition-colors">
              <FaCamera /> Camera
            </button>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          <div className="mb-4">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full h-24 md:h-32 bg-white/10 border border-white/20 rounded-xl p-3 text-sm md:text-base text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="text-right text-white/40 text-xs md:text-sm mt-1">
              {caption.length}/200
            </div>
          </div>

          <div className="relative mb-4">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location"
                className="w-full bg-white/10 border border-white/20 rounded-xl py-2 md:py-3 pl-10 pr-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {showLocationDropdown && location.length > 2 && (
              <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                {isLoadingLocation ? (
                  <div className="p-3 text-center text-white/60">
                    <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  </div>
                ) : locationSuggestions.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setLocation(suggestion.description);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-gray-400" />
                          {suggestion.description}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-white/60">
                    No locations found
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            className="mt-auto w-full py-3 md:py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-medium text-sm md:text-base hover:opacity-90 transition-opacity"
            onClick={handleShareStory}
          >
            Share Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStory;
