import { EXPLORE_ICON } from "../icons/icons";
import DisplayAnimatedTextHome from "./DisplayAnimatedTextHome";

const HomePageImage = () => {
  return (
    <>
      <div className="flex justify-center font-serif text-red-500">
        <div>
          <div className="font-roboto text-[130px] font-bold ">
            Explore New Adventures
          </div>
          <div className="flex justify-center items-center text-[50px] text-gray-800 m-2">
            <p className="font-bold font-roboto">find people who loves, </p>
          </div>
          <div className="flex justify-center">
            <DisplayAnimatedTextHome />
          </div>
          <div className="flex justify-center items-center p-2">
            <button className="bg-black text-white rounded-[26px] w-1/4 h-[50px] font-bold text-[20px] hover:bg-gray-800 transition-all duration-500 transform hover:scale-105 shadow-lg border border-gray-700">
              <div className="flex justify-center items-center">
                <img
                  src={EXPLORE_ICON}
                  alt="loading"
                  loading="lazy"
                  className="w-[30px] h-[30px] m-1"
                />
                <p className="m-1 font-sans">Explore</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageImage;

/**
 * 
 * 
 * 
 * <div>
      <div className="flex justify-center items-center p-2">
        <img
          src="https://static.uacdn.net/production/_next/static/images/home-illustration.svg?q=75&aut=format%2Ccompress&w=640"
          className="lg:w-[560px] w-[400px] lg:h-[333px] h-[200px]"
          alt="loading"
          loading="lazy"
        />
      </div>
      <div className="flex justify-center m-2">
        <button className="w-1/3 h-fit p-4 rounded-[36px] bg-[#313131] text-white m-1 hover:bg-black font-semibold">Get Started</button>
        <button className="w-1/3 h-fit p-4 rounded-[36px] bg-[#313131] text-white m-1 hover:bg-black font-semibold">Chat</button>

      </div>
    </div>
 * 
 */
