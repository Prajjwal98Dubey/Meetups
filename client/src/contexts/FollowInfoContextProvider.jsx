/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import FollowInfoContext from "./FollowInfoContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import UserInfoContext from "./UserInfoContext";

function FollowInfoContextProvider({ children }) {
  const [followInfo, setFollowInfo] = useState({});
  const { userInfo } = useContext(UserInfoContext);
  useEffect(() => {
    const getFollowInfo = async () => {
      const followerQuery = query(
        collection(db, "meet_follower_following"),
        where("follower", "==", userInfo.user_email)
      );
      const followerQuerySnapShot = await getDocs(followerQuery);
      let numberOfPeopleFollowingMe = 0;
      let numberOfPeopleIAmFollowing = 0;
      followerQuerySnapShot.forEach(() => {
        numberOfPeopleIAmFollowing += 1;
      });
      const followingQuery = query(
        collection(db, "meet_follower_following"),
        where("following", "==", userInfo.user_name)
      );
      const followingQuerySnapShot = await getDocs(followingQuery);
      followingQuerySnapShot.forEach(() => {
        numberOfPeopleFollowingMe += 1;
      });
      setFollowInfo({
        follower: numberOfPeopleFollowingMe,
        following: numberOfPeopleIAmFollowing,
      });
    };
    getFollowInfo();
  }, [userInfo.user_email, userInfo.user_name]);
  return (
    <FollowInfoContext.Provider value={{ followInfo, setFollowInfo }}>
      {children}
    </FollowInfoContext.Provider>
  );
}

export default FollowInfoContextProvider;
