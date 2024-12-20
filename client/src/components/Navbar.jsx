const Navbar = () => {
  return (
    <div className="h-fit p-2 w-full flex justify-around relative">
      <div className="flex justify-center items-center ">
        <div className="bg-[#313131] rounded-full w-[50px] h-[50px]"></div>
      </div>
      <div>
        <div className="flex justify-center items-center">
          <p className="font-roboto font-bold text-grey-900 text-xl ">
            Meet Ups
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="font-roboto text-gray-600 font-medium">
            where people meets for adventures
          </p>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-[50px] h-[50px] bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default Navbar;
