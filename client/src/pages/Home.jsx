import HomePageImage from "../components/HomePageImage";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
        <HomePageImage/>
    </div>
  );
};

export default Home;
