/* eslint-disable react/prop-types */
import { useState } from "react";
import JoinEventInfo from "./JoinEventInfo";

function JoinEventInfoProvider({ children }) {
  const [joinInfo, setJoinInfo] = useState(new Set());
  return (
    <JoinEventInfo.Provider value={{ joinInfo, setJoinInfo }}>
      {children}
    </JoinEventInfo.Provider>
  );
}

export default JoinEventInfoProvider;
