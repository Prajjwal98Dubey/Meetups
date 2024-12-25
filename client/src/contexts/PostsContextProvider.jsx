/* eslint-disable react/prop-types */
import { useState } from "react";
import PostsContext from "./PostsContext";

function PostsContextProvider({ children }) {
  const [postsInfo, setPostsInfo] = useState([]);
  return (
    <PostsContext.Provider value={{ postsInfo, setPostsInfo }}>
      {children}
    </PostsContext.Provider>
  );
}

export default PostsContextProvider;
