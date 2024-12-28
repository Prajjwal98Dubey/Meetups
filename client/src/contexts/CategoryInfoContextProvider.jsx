/* eslint-disable react/prop-types */
import { useState } from "react";
import CategoryInfoContext from "./CategoryInfoContext";

function CategoryInfoContextProvider({ children }) {
  const [selectedCategory, setSelectedCategory] = useState("Recent");
  return (
    <CategoryInfoContext.Provider
      value={{ selectedCategory, setSelectedCategory }}
    >
      {children}
    </CategoryInfoContext.Provider>
  );
}
export default CategoryInfoContextProvider;
