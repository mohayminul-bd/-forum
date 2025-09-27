import React from "react";
import Banner from "./Home Component/Banner";
import Platform1 from "./Home Component/Platform1";
import PostsList from "./Home Component/PostsList";
import GlobalCommunity from "./Home Component/extracomponent/GlobalCommunity";
import Footer from "./Home Component/extracomponent/Footer";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PostsList></PostsList>
      <Platform1></Platform1>
      <GlobalCommunity></GlobalCommunity>
      <Footer></Footer>
    </div>
  );
};

export default Home;
