/* eslint-disable react/prop-types */
import { useState } from "react";
import StoryContextInfo from "./StoryInfoContext";

function StoryInfoContextProvider({ children }) {
  const [storyInfo, setStoryInfo] = useState([]);
  return (
    <StoryContextInfo.Provider value={{ storyInfo, setStoryInfo }}>
      {children}
    </StoryContextInfo.Provider>
  );
}

export default StoryInfoContextProvider;
