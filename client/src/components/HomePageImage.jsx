// import { EXPLORE_ICON } from "../icons/icons";
// import DisplayAnimatedTextHome from "./DisplayAnimatedTextHome";

// const HomePageImage = () => {
//   return (
//     <>
//       <div className="flex justify-center font-serif text-red-500">
//         <div>
//           <div className="font-roboto text-[130px] font-bold ">
//             Explore New Adventures
//           </div>
//           <div className="flex justify-center items-center text-[50px] text-gray-800 m-2">
//             <p className="font-bold font-roboto">find people who loves, </p>
//           </div>
//           <div className="flex justify-center">
//             <DisplayAnimatedTextHome />
//           </div>
//           <div className="flex justify-center items-center p-2">
//             <button className="bg-black text-white rounded-[26px] w-1/4 h-[50px] font-bold text-[20px] hover:bg-gray-800 transition-all duration-500 transform hover:scale-105 shadow-lg border border-gray-700">
//               <div className="flex justify-center items-center">
//                 <img
//                   src={EXPLORE_ICON}
//                   alt="loading"
//                   loading="lazy"
//                   className="w-[30px] h-[30px] m-1"
//                 />
//                 <p className="m-1 font-sans">Explore</p>
//               </div>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HomePageImage;

// /**
//  *
//  *
//  *
//  * <div>
//       <div className="flex justify-center items-center p-2">
//         <img
//           src="https://static.uacdn.net/production/_next/static/images/home-illustration.svg?q=75&aut=format%2Ccompress&w=640"
//           className="lg:w-[560px] w-[400px] lg:h-[333px] h-[200px]"
//           alt="loading"
//           loading="lazy"
//         />
//       </div>
//       <div className="flex justify-center m-2">
//         <button className="w-1/3 h-fit p-4 rounded-[36px] bg-[#313131] text-white m-1 hover:bg-black font-semibold">Get Started</button>
//         <button className="w-1/3 h-fit p-4 rounded-[36px] bg-[#313131] text-white m-1 hover:bg-black font-semibold">Chat</button>

//       </div>
//     </div>
//  *
//  */

import { EXPLORE_ICON } from "../icons/icons";
import DisplayAnimatedTextHome from "./DisplayAnimatedTextHome";

const HomePageImage = () => {
  return (
    <div className=" bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen ">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Explore New Adventures
            </span>
          </h1>
          <div className="text-2xl md:text-4xl text-gray-700 font-medium mb-4">
            <p>find people who loves,</p>
          </div>
          <div className="mb-6">
            <DisplayAnimatedTextHome />
          </div>
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-500 ease-in-out transform bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:scale-105 hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <img
              src={EXPLORE_ICON}
              alt="Explore"
              className="w-6 h-6 mr-2 transform group-hover:rotate-12 transition-transform duration-300"
            />
            Explore Now
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageImage;
