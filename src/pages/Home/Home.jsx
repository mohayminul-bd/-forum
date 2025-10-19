import React, { useContext } from "react";
import Banner from "./Home Component/Banner";
import Platform1 from "./Home Component/Platform1";
import PostsList from "./Home Component/PostsList";
import GlobalCommunity from "./Home Component/extracomponent/GlobalCommunity";
import Footer from "./Home Component/extracomponent/Footer";
import CompanyData from "./Home Component/extracomponent/CompanyData";
import PostSystem from "./Home Component/Others-Component/PostSystem";
import HowToUse from "./Home Component/Others-Component/HowToUse";
import Reviews from "./Home Component/Others-Component/Reviews";
import Newsletter from "./Home Component/Others-Component/Newsletter";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { darkMode } = useContext(AuthContext);
  return (
    <div>
      <Banner></Banner>
      <div
        className={`md:px-20 pb-4 px-4 mt-[-88px] mx-auto ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg text-white"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        }`}
      >
        <PostsList></PostsList>
        <Platform1></Platform1>
        <PostSystem></PostSystem>
        <HowToUse></HowToUse>
        <GlobalCommunity></GlobalCommunity>
        <CompanyData></CompanyData>
        <Reviews></Reviews>
        <Newsletter></Newsletter>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
