import React from "react";
import { Outlet } from "react-router";
import authimage from "../assets/authentication/cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37328.avif";

const AuthLayout = () => {
  return (
    <div className=" p-12 bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={authimage} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
