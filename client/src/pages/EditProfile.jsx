import { useContext, useEffect, useState } from "react";
import { FaCamera, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "../contexts/UserInfoContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { getUserDetails } from "../helpers/dbFunctions";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";

const EditProfile = () => {
  const [preview, setPreview] = useState(DEFAULT_USER);
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userDetails = await getUserDetails(user.email);
          setUserInfo({ ...userDetails });
        }
      });
    };
    if (Object.keys(userInfo).length === 0) getUserInfo();
  }, [userInfo]);

  const handleEditProfile = async () => {
    try {
      const q = query(
        collection(db, "meet_users"),
        where("user_email", "==", userInfo.user_email)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const docRef = doc(db, "meet_users", docSnapshot.id);
          await updateDoc(docRef, {
            ...userInfo,
            user_location: userInfo.user_location
              ? userInfo.user_location
              : location,
            user_profession: userInfo.user_profession
              ? userInfo.user_profession
              : profession,
          });
          toast.success("Profile Updated !!!", { duration: 1500 });
        });
      }
    } catch {
      toast.error("something went wrong!!!", { duration: 1500 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      {console.log("user info", userInfo)}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative"></div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm -mt-24 relative z-10 p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={userInfo.user_photo ? userInfo.user_photo : DEFAULT_USER}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600 transition">
                <FaCamera />
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-center mt-[5px] ">
            <p className="text-gray-900 font-xl font-bold text-[28px]">
              {userInfo.user_name}
            </p>
          </div>
          <div className="flex justify-center mb-[5px]">
            <div className="flex text-gray-500 font-medium ">
              {userInfo.user_profession && (
                <div className="flex justify-center items-center">
                  <p>{userInfo.user_profession}</p>
                </div>
              )}
              {userInfo.user_profession && (
                <div className="flex justify-center items-center">,</div>
              )}
              {userInfo.user_location && (
                <div className="flex justify-center items-center pl-1">
                  <p>{userInfo.user_location}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profession
                </label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Software Engineer"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-bold"
              onClick={handleEditProfile}
            >
              Save Changes
            </button>
            <button
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition font-bold"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
