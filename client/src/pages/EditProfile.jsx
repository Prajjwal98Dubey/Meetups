import { useContext, useEffect } from "react";
import { FaCamera, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";
import DEFAULT_USER from "../icons/default_user.png";
import { useNavigate } from "react-router-dom";
import UserInfoContext from "../contexts/UserInfoContext";
import { db, storage } from "../firebase/firebaseConfig";
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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  useEffect(() => {
    if (userInfo.user_name === "Guest") {
      toast.error("Guest cannot edit Profile");
      navigate("/");
      return;
    }
  }, [navigate, userInfo.user_name]);
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
          });
          let userDetails = await getUserDetails(userInfo.user_email);
          setUserInfo({ ...userDetails });
          toast.success("Profile Updated !!!", { duration: 1500 });
          navigate("/profile");
        });
      }
    } catch {
      toast.error("something went wrong!!!", { duration: 1500 });
    }
  };
  const handleUserPhotoEdit = (e) => {
    const imageStorageRef = ref(
      storage,
      `images_meet/users/${e.target.files[0].name + Date.now()}`
    );
    uploadBytes(imageStorageRef, e.target.files[0])
      .then(() => {
        toast.success("user photo edit !!!");
        getDownloadURL(imageStorageRef)
          .then((url) => {
            setUserInfo({
              ...userInfo,
              user_photo: url,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative"></div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm -mt-24 relative z-10 p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <img
                src={userInfo.user_photo ? userInfo.user_photo : DEFAULT_USER}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white cursor-pointer hover:bg-blue-600 transition">
                <FaCamera />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUserPhotoEdit}
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
                    value={userInfo.user_location}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        user_location: e.target.value,
                      })
                    }
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
                    value={userInfo.user_profession}
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        user_profession: e.target.value,
                      })
                    }
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
