import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import DEFAULT_USER from "../icons/default_user.png";
import { useContext, useEffect, useRef, useState } from "react";
import UserInfoContext from "../contexts/UserInfoContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { getUserDetails } from "../helpers/dbFunctions";
import { handleSearchQuery } from "../helpers/feedsFunction";

const Search = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timerRef = useRef(null);
  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          let userDetails = await getUserDetails(user.email);
          setUserInfo({ ...userDetails });
        }
      });
    };
    if (Object.keys(userInfo).length === 0) getUserInfo();
  }, [userInfo]);

  return (
    <>
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50 flex justify-center">
        <div className="w-1/4 flex justify-center items-center">
          <Link to="/">
            <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              LinkUp
            </p>
          </Link>
        </div>
        <div className="w-1/2 mx-auto px-4 py-3 ">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for people and events..."
              value={searchText}
              onChange={async (e) => {
                setSearchText(e.target.value);
                if (e.target.value.trim().length > 0) {
                  if (timerRef.current === null) {
                    let result = await handleSearchQuery(
                      e.target.value.trim().toLowerCase()
                    );
                    setSearchResults([...result]);
                    setIsLoading(false);
                    timerRef.current = "timer";
                    timerRef.current = setTimeout(() => {
                      timerRef.current = null;
                    }, 300);
                  } else {
                    clearTimeout(timerRef.current);
                    timerRef.current = setTimeout(async () => {
                      timerRef.current = null;
                      let result = await handleSearchQuery(
                        e.target.value.trim().toLowerCase()
                      );
                      setSearchResults([...result]);
                      setIsLoading(false);
                    }, 300);
                  }
                }
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-100/80 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchText.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                    {searchResults.map((search, index) => {
                      return search.search_category === "users" ? (
                        <Link
                          key={search.user_email}
                          to={`/u/${search.user_name.split(" ").join("-")}`}
                          className="block hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-4 p-4">
                            <div className="relative">
                              <img
                                src={search.user_photo || DEFAULT_USER}
                                alt={search.user_name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {search.user_name}
                              </h4>
                            </div>
                            <div className="text-blue-500">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <Link to={`/event/${search.event_id}`}>
                          <div
                            key={index}
                            className="block hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-4 p-4">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                  {search.event_title}
                                </h4>
                              </div>
                              <div className="text-blue-500">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 w-1/4 justify-center">
          {Object.keys(userInfo).length === 0 ? (
            <Link to="/login">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-700 text-white font-bold font-roboto hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 rounded-md ">
                Login
              </button>
            </Link>
          ) : (
            <>
              <div className="text-right hidden sm:block">
                <p className="font-medium text-gray-900">
                  {userInfo.user_name}
                </p>
                <p className="text-sm text-gray-500">
                  @{userInfo.user_name?.toLowerCase()}
                </p>
              </div>
              <Link to="/profile">
                <img
                  src={userInfo.user_photo || DEFAULT_USER}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border-2 border-gray-100 hover:border-blue-500 transition-colors object-cover"
                />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
