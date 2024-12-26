import { BIKE_ICON, POPULAR_ICON } from "../icons/icons";
import SPORTS_ICON from "../icons/sports-icon.png";
import TECH_ICON from "../icons/tech-icon.png";
const Categories = () => {
  const categories = [
    {
      icon: POPULAR_ICON,
      name: "Popular",
      color: "from-pink-500 to-rose-500",
      count: 245,
    },
    {
      icon: TECH_ICON,
      name: "Tech",
      color: "from-blue-500 to-cyan-500",
      count: 189,
    },
    {
      icon: SPORTS_ICON,
      name: "Sports",
      color: "from-green-500 to-emerald-500",
      count: 167,
    },
    {
      icon: BIKE_ICON,
      name: "Adventure",
      color: "from-orange-500 to-amber-500",
      count: 142,
    },
  ];
  return (
    <div className="relative w-full py-8 px-4 md:px-8 overflow-hidden flex justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex overflow-x-auto hide-scrollbar gap-6 p-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div
                className="relative flex items-center gap-4 px-8 py-4 rounded-2xl 
                            bg-white/10 backdrop-blur-md border border-white/20 
                            shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
                            hover:bg-white/20 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} 
                              opacity-0 group-hover:opacity-10 rounded-2xl 
                              transition-opacity duration-300`}
                />
                <div
                  className="relative w-12 h-12 rounded-xl bg-white/20 p-2.5
                              group-hover:scale-110 transition-transform duration-300
                              shadow-[0_4px_12px_0_rgba(31,38,135,0.05)]"
                >
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {category.count} posts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
