import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import Search from "../components/Search";
import { AUTH_LOADER_ICON } from "../icons/icons";
import DisplayEvents from "../components/DisplayEvents";

const Event = () => {
  const location = useLocation();
  const [eventDetails, setEventDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getEventDetails = async () => {
      const currUrl = location.pathname;
      const eventId = currUrl.split("/").at(currUrl.split("/").length - 1);
      const q = query(
        collection(db, "meet_events"),
        where("eventId", "==", eventId)
      );
      const querySnapShot = await getDocs(q);
      let details = {};
      querySnapShot.forEach((doc) => {
        details = { ...doc.data() };
      });
      setEventDetails({ ...details });
      setIsLoading(false);
    };
    getEventDetails();
  }, [location.pathname]);
  return (
    <>
      <Search />
      {isLoading ? (
        <div className="flex justify-center items-center p-2">
          <img
            src={AUTH_LOADER_ICON}
            alt="loader"
            className="w-[30px] h-[30px]"
          />
        </div>
      ) : (
        <div className="m-auto w-[90%] pt-4">
          <DisplayEvents event={eventDetails} />
        </div>
      )}
    </>
  );
};

export default Event;
