import { FaGithub, FaLinkedin } from "react-icons/fa";
import Categories from "../components/Categories";
import HomePageImage from "../components/HomePageImage";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Categories />
      <HomePageImage />
      <footer className=" bg-gradient-to-r from-gray-900 to-gray-800 text-white/80">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                LinkUp
              </h3>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/Prajjwal98Dubey"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/prajjwal-dubey-8a1938182/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-yellow-400">⚠️ Testing Version</p>
              <p className="text-xs mt-1">
                This application is under development, all the posts and events
                does not hold true.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-xs text-gray-400">
            © {new Date(Date.now()).getFullYear()} LinkUp. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
