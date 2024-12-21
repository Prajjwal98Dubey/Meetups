import { BIKE_ICON, POPULAR_ICON } from "../icons/icons";
import SPORTS_ICON from "../icons/sports-icon.png";
import TECH_ICON from "../icons/tech-icon.png";
const Categories = () => {
  return (
    <div className=" h-fit p-3 flex justify-center m-2 font-roboto">
      <div className="w-full md:w-3/4 lg:w-1/2 bg-gray-700 bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 h-fit p-4 rounded-[36px] flex justify-evenly items-center lg:text-[18px] text-[13px] font-semibold">
        <div className="flex justify-center items-center p-2 border border-transparent border-gray-200 m-1 w-full sm:w-auto hover:bg-gray-300 rounded-[36px] cursor-pointer">
          <div className="m-1">
            <img
              src={POPULAR_ICON}
              alt="loading"
              className="w-[30px] h-[30px]"
            />
          </div>
          <p className="m-1">Popular</p>
        </div>
        <div className="flex justify-center items-center p-2 border border-transparent border-gray-200 m-1 w-full sm:w-auto hover:bg-gray-300 rounded-[36px] cursor-pointer">
          <div className="m-1">
            <img src={TECH_ICON} alt="loading" className="w-[30px] h-[30px]" />
          </div>
          <p className="m-1">Tech</p>
        </div>
        <div className="flex justify-center items-center p-2 border border-transparent border-gray-200 m-1 w-full sm:w-auto hover:bg-gray-300 rounded-[36px] cursor-pointer">
          <div className="m-1">
            <img
              src={SPORTS_ICON}
              alt="loading"
              className="w-[30px] h-[30px]"
            />
          </div>
          <p className="m-1">Sports</p>
        </div>
        <div className="flex justify-center items-center p-2 border border-transparent border-gray-200 m-1 w-full sm:w-auto hover:bg-gray-300 rounded-[36px] cursor-pointer">
          <div className="m-1">
            <img src={BIKE_ICON} alt="loading" className="w-[30px] h-[30px]" />
          </div>
          <p className="m-1">Bike Rides</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
