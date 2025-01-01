/* eslint-disable react/prop-types */
import { useState } from "react";
import UserLocationInfo from "./UserLocationInfo";

function UserLocationInfoProvider({ children }) {
  const [userLoc, setUserLoc] = useState("");
  return (
    <UserLocationInfo.Provider value={{ userLoc, setUserLoc }}>
      {children}
    </UserLocationInfo.Provider>
  );
}

export default UserLocationInfoProvider;
