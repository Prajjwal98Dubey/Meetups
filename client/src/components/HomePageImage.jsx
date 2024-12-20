const HomePageImage = () => {
  return (
    <>
    <div className="flex justify-center font-roboto">
        <div>
      <div className="flex justify-center items-center p-2">
        <img
          src="https://static.uacdn.net/production/_next/static/images/home-illustration.svg?q=75&auto=format%2Ccompress&w=640"
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
        </div>
    </>
  );
};

export default HomePageImage;
