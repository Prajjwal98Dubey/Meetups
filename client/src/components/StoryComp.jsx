// import { useState,  } from "react";
// import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
// // import TimeAgo from "react-timeago";
// import DEFAULT_USER from "../icons/default_user.png";

// const StoryComp = ({ story }) => {
//   const [currImageIndex, setCurrentImageIndex] = useState(0);
//   return (
//     <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//       {/* Story Content */}
//       <div className="relative w-full h-full md:w-[400px] md:h-[700px]">
//         <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <img
//                 src={DEFAULT_USER}
//                 alt="user"
//                 className="w-8 h-8 rounded-full border border-white/20"
//               />
//               <div>
//                 <h4 className="text-white font-medium">{story.user_name}</h4>
//                 {/* <TimeAgo
//                   date={story.timestamp}
//                   className="text-xs text-white/60"
//                 /> */}
//               </div>
//             </div>
//             <button className="text-white/60 hover:text-white transition-colors">
//               <FaTimes size={24} />
//             </button>
//           </div>
//         </div>

//         {/* Image */}
//         <img
//           src={story.story_images[currentImageIndex]}
//           alt="Story"
//           className="w-full h-full object-cover"
//         />

//         {/* Footer Content */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
//           {story.location && (
//             <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
//               <FaMapMarkerAlt />
//               <span>{story.location}</span>
//             </div>
//           )}
//           {story.caption && (
//             <p className="text-white text-sm">{story.caption}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoryComp;
