/* eslint-disable react/prop-types */
import { useState } from "react";
import FilterValueContext from "./FIlterValueContext";

function FilterValueContextProvider({ children }) {
  const [filterValue, setFilterValue] = useState("all");
  return (
    <FilterValueContext.Provider value={{ filterValue, setFilterValue }}>
      {children}
    </FilterValueContext.Provider>
  );
}

export default FilterValueContextProvider;

// filterValue => the filtering for displaying only events or only posts or both(posts,events)
