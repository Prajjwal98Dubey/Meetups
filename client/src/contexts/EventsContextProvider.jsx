/* eslint-disable react/prop-types */
import { useState } from "react";
import EventsContext from "./EventsContext";

function EventsContextProvider({ children }) {
  const [eventsInfo, setEventsInfo] = useState([]);
  return (
    <EventsContext.Provider value={{ eventsInfo, setEventsInfo }}>
      {children}
    </EventsContext.Provider>
  );
}

export default EventsContextProvider;
