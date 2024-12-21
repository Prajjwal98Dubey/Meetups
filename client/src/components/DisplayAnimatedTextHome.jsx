import { useEffect, useState } from "react";
import "../styling/DisplayAnimatedTextHome.css";
const DisplayAnimatedTextHome = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [data] = useState([
    "Tech",
    "Badminton",
    "Concert",
    "Hiking",
    "Movies",
    "Hangout",
  ]);
  const [displayText, setDisplayText] = useState("Tech");
  useEffect(() => {
    let interval = setInterval(() => {
      setCurrIndex((prevIndex) => prevIndex + 1);
      setDisplayText(data[(currIndex + 1) % data.length]);
    }, 2000);

    return () => clearInterval(interval);
  }, [currIndex, data]);
  return (
    <>
      <div className=" flex justify-center text-[60px]">
        <p className="p-2 font-bold text-red-500 text-center font-dancing">
          {displayText}
        </p>
      </div>
    </>
  );
};

export default DisplayAnimatedTextHome;
