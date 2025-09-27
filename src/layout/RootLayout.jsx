import React, { useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "../pages/shared/NavBar";
import Aos from "aos";
import "aos/dist/aos.css";

const RootLayout = () => {
  useEffect(function () {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="py-7">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default RootLayout;
