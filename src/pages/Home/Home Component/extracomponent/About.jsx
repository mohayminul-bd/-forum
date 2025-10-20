import React, { useContext } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaComments,
  FaLaptopCode,
} from "react-icons/fa";
import Footer from "./Footer";
import { AuthContext } from "../../../../context/AuthContext";

const aboutPoints = [
  {
    icon: <FaUsers className="text-4xl text-blue-500 mb-3" />,
    title: "Community Driven",
    description:
      "Our forum is built to connect like-minded individuals. Users can post queries, share experiences, and get advice from a supportive community.",
  },
  {
    icon: <FaChalkboardTeacher className="text-4xl text-green-500 mb-3" />,
    title: "Educational Resources",
    description:
      "Access high-quality educational content, tutorials, and expert guidance. Stay updated with the latest trends in learning and development.",
  },
  {
    icon: <FaComments className="text-4xl text-red-500 mb-3" />,
    title: "Interactive Discussions",
    description:
      "Engage in meaningful discussions on Business, Health, Technology, and Education. Comment, upvote, downvote, and share posts easily.",
  },
  {
    icon: <FaLaptopCode className="text-4xl text-purple-500 mb-3" />,
    title: "Tech & Innovation",
    description:
      "Explore the latest in technology, coding tutorials, AI discussions, and digital innovations. Contribute your knowledge and learn from others.",
  },
];

const About = () => {
  const { darkMode } = useContext(AuthContext);
  return (
    <section
      className={`pt-10 ${
        darkMode
          ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg text-white"
          : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      }`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          About Our Forum
        </h2>

        <p className=" mb-8 text-lg">
          Welcome to our Forum website, a hub where education, business, health,
          and technology enthusiasts come together to share knowledge, ask
          questions, and grow collectively. Our goal is to provide a platform
          that encourages learning, networking, and community engagement.
        </p>

        <div
          data-aos="zoom-in"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {aboutPoints.map((point, idx) => (
            <div
              key={idx}
              className={` p-6 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-2  ${
                darkMode
                  ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
                  : "bg-base-100 text-gray-700"
              }`}
            >
              {point.icon}
              <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
              <p>{point.description}</p>
            </div>
          ))}
        </div>

        <div
          data-aos="zoom-in"
          className={` p-6 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-2  ${
            darkMode
              ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
              : "bg-base-100 text-gray-700"
          }`}
        >
          <h3 className="text-2xl font-bold mb-4">Why Join Us?</h3>
          <ul className="list-disc list-inside  space-y-2">
            <li>
              Access to a wide range of educational and professional content.
            </li>
            <li>
              Interactive discussions and expert advice across multiple fields.
            </li>
            <li>
              Opportunities to network with like-minded users and professionals.
            </li>
            <li>Share your knowledge and gain recognition in the community.</li>
            <li>
              Stay updated with latest trends in technology, business, and
              health.
            </li>
            <li>Participate in polls, surveys, and collaborative projects.</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-50 text-lg mb-2">
            Our forum is designed to make learning and networking easy,
            interactive, and fun.
          </p>
          <p className="text-gray-50 text-lg">
            Join today, post your thoughts, ask questions, and be part of a
            growing community.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Footer></Footer>
      </div>
    </section>
  );
};

export default About;
