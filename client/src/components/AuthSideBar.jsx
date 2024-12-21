import { AUTH_LEFTSIDE_IMG } from "../icons/icons";

const AuthSideBar = () => {
  return (
    <div className="w-1/2 h-screen bg-[#313131] flex justify-center items-center p-1">
      <img
        src={AUTH_LEFTSIDE_IMG}
        className="lg:w-[560px] w-[400px] lg:h-[333px] h-[200px]"
        alt="loading"
        loading="lazy"
      />
    </div>
  );
};

export default AuthSideBar;
