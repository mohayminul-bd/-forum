import React, { useContext } from "react";
import { FaBook, FaBriefcase, FaHeartbeat, FaLaptopCode } from "react-icons/fa";
import Footer from "./Footer";
import { AuthContext } from "../../../../context/AuthContext";

const services = [
  {
    title: "Education",
    icon: <FaBook className="mx-auto text-4xl text-blue-500 mb-3" />,
    subtitle: "Learn & Grow",
    description:
      "Get access to the latest educational posts, online courses, webinars, and interactive discussions. Connect with experts and enhance your knowledge.",
    points: [
      "Online courses and tutorials",
      "Webinars and live sessions",
      "Educational discussion forums",
      "Expert guidance and mentorship",
    ],
  },
  {
    title: "Business",
    icon: <FaBriefcase className="mx-auto text-4xl text-green-500 mb-3" />,
    subtitle: "Grow Your Network",
    description:
      "Share business ideas, get tips, and network with professionals. Explore investment opportunities, start-up discussions, and business trends.",
    points: [
      "Business idea sharing",
      "Networking with professionals",
      "Startup and investment advice",
      "Market trends and analysis",
    ],
  },
  {
    title: "Health",
    icon: <FaHeartbeat className="mx-auto text-4xl text-red-500 mb-3" />,
    subtitle: "Wellness & Care",
    description:
      "Discuss health topics, wellness tips, fitness routines, and get advice from health experts. Stay informed and maintain a healthy lifestyle.",
    points: [
      "Fitness and workout tips",
      "Nutrition and diet guidance",
      "Mental health support",
      "Health-related Q&A forums",
    ],
  },
  {
    title: "Technology",
    icon: <FaLaptopCode className="mx-auto text-4xl text-purple-500 mb-3" />,
    subtitle: "Innovate & Share",
    description:
      "Explore the latest technology trends, tutorials, and share knowledge. Join discussions on software, hardware, AI, blockchain, and more.",
    points: [
      "Latest tech trends and news",
      "Programming tutorials",
      "AI, blockchain, and software discussions",
      "Tech community collaboration",
    ],
  },
];

const Service = () => {
  const { darkMode } = useContext(AuthContext);
  return (
    <section
      className={`pt-7 ${
        darkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg text-white"
          : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div
              data-aos="zoom-in-up"
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-2"
            >
              {service.icon}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <h4 className="text-gray-500 mb-3">{service.subtitle}</h4>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {service.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <Footer></Footer>
      </div>
    </section>
  );
};

export default Service;
