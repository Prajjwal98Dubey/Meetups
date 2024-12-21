import Categories from "../components/Categories";
import HomePageImage from "../components/HomePageImage";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Categories />
      <HomePageImage />
    </div>
  );
};

export default Home;
