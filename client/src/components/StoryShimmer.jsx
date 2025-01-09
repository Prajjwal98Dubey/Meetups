const StoryShimmer = () => {
  return (
    <div className="flex">
      {Array(5)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-gray-300 rounded-full m-1 animate-pulse"
          ></div>
        ))}
    </div>
  );
};

export default StoryShimmer;
