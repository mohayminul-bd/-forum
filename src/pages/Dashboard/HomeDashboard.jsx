import React from "react";
// import UserCard from "./homeDashboardComponent/UserCard";
import DashboardCards from "./homeDashboardComponent/DashboardCards";
import UserCard from "./homeDashboardComponent/UserCard";
import DashboardText from "./homeDashboardComponent/DashboardText";

const HomeDashboard = () => {
  return (
    <div className="">
      <div>
        <UserCard></UserCard>
      </div>
      <div>
        <DashboardCards></DashboardCards>
      </div>
      <div>
        <DashboardText></DashboardText>
      </div>
    </div>
  );
};

export default HomeDashboard;
