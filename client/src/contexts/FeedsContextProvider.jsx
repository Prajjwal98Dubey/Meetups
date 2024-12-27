/* eslint-disable react/prop-types */
import { useState } from "react";
import FeedsContext from "./FeedsContext";

function FeedsContextProvider({ children }) {
  const [feedsInfo, setFeedsInfo] = useState([]);

  return (
    <FeedsContext.Provider value={{ feedsInfo, setFeedsInfo }}>
      {children}
    </FeedsContext.Provider>
  );
}

export default FeedsContextProvider;
