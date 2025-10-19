import React from "react";
import { useNavigate } from "react-router";
import {
  FaPlusCircle,
  FaUser,
  FaStickyNote,
  FaChartLine,
  FaBell,
  FaCommentDots,
} from "react-icons/fa";

const DashboardCards = () => {
  const navigate = useNavigate();

  const cards = [
    // Simple info cards
    {
      id: 1,
      title: "Statistics",
      description: "Check your stats and progress",
      icon: <FaChartLine size={30} />,
      color: "bg-blue-50 text-blue-700",
      clickable: false,
    },
    {
      id: 2,
      title: "Notifications",
      description: "See all recent notifications",
      icon: <FaBell size={30} />,
      color: "bg-green-50 text-green-700",
      clickable: false,
    },
    {
      id: 3,
      title: "Messages",
      description: "Read your latest messages",
      icon: <FaCommentDots size={30} />,
      color: "bg-purple-50 text-purple-700",
      clickable: false,
    },
    // Navigation cards
    {
      id: 4,
      title: "Add Post",
      description: "Create a new post",
      icon: <FaPlusCircle size={30} />,
      color: "bg-green-400 text-green-900", // Updated light green
      clickable: true,
      route: "/dashboard/addPost",
    },
    {
      id: 5,
      title: "My Profile",
      description: "View and edit your profile",
      icon: <FaUser size={30} />,
      color: "bg-pink-300 text-pink-900",
      clickable: true,
      route: "/dashboard/myProfile",
    },
    {
      id: 6,
      title: "My Post",
      description: "See all your posts",
      icon: <FaStickyNote size={30} />,
      color: "bg-sky-300 text-sky-900", // Updated sky blue
      clickable: true,
      route: "/dashboard/myPost",
    },
  ];

  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => card.clickable && navigate(card.route)}
            className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 ${card.color}`}
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
            <p className="text-sm text-gray-700 text-center">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
