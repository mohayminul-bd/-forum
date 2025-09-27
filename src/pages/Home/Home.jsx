import React from "react";
import Banner from "./Home Component/Banner";
import Platform1 from "./Home Component/Platform1";
import PostsList from "./Home Component/PostsList";
import GlobalCommunity from "./Home Component/extracomponent/GlobalCommunity";
import Footer from "./Home Component/extracomponent/Footer";
import CompanyData from "./Home Component/extracomponent/CompanyData";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PostsList></PostsList>
      <Platform1></Platform1>
      <GlobalCommunity></GlobalCommunity>
      <CompanyData></CompanyData>
      <Footer></Footer>
    </div>
  );
};

export default Home;
