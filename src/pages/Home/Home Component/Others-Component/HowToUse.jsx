import React, { useContext } from "react";
import {
  FaSignInAlt,
  FaHome,
  FaPen,
  FaComments,
  FaCrown,
} from "react-icons/fa";
import { AuthContext } from "../../../../context/AuthContext";

const HowToUse = () => {
  const { darkMode } = useContext(AuthContext);

  return (
    <section data-aos="zoom-in">
      <h2 className="text-3xl font-bold text-center mb-4 pt-5 ">
        🚀 How to Use This Forum Website
      </h2>

      <p className="text-center  text-lg max-w-3xl mx-auto mb-10">
        New to this platform? Don’t worry! Follow these simple steps to explore,
        connect, and share your thoughts in our community.
      </p>

      <div className="grid md:grid-cols-5 md:px-7 gap-6">
        {/* Step 1 */}
        <div
          className={` p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300 flex flex-col items-center text-center ${
            darkMode
              ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
              : "bg-base-100 text-black"
          }`}
        >
          <FaSignInAlt className="text-4xl text-indigo-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">1. Login or Register</h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Start by creating your account or logging in using email or Google.
          </p>
        </div>

        {/* Step 2 */}
        <div
          className={` p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300 flex flex-col items-center text-center ${
            darkMode
              ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
              : "bg-base-100 text-black"
          }`}
        >
          <FaHome className="text-4xl text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">2. Explore Posts</h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Browse the homepage to read the latest and most popular posts.
          </p>
        </div>

        {/* Step 3 */}
        <div
          className={` p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300 flex flex-col items-center text-center ${
            darkMode
              ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
              : "bg-base-100 text-black"
          }`}
        >
          <FaPen className="text-4xl text-green-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">
            3. Create Your Own Post
          </h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Share your ideas or questions by creating a new post in your
            dashboard.
          </p>
        </div>

        {/* Step 4 */}
        <div
          className={` p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300 flex flex-col items-center text-center ${
            darkMode
              ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
              : "bg-base-100 text-black"
          }`}
        >
          <FaComments className="text-4xl text-yellow-600 mb-3" />
          <h3 className="text-lg font-semibold mb-2">4. Comment & Vote</h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Join the discussion! Comment on posts and upvote the ones you like.
          </p>
        </div>

        {/* Step 5 */}
        <div
          className={` p-6 rounded-xl shadow hover:-translate-y-2 hover:shadow-lg transition duration-300 flex flex-col items-center text-center ${
            darkMode
              ? " bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg"
              : "bg-base-100 text-black"
          }`}
        >
          <FaCrown className="text-4xl text-amber-500 mb-3" />
          <h3 className="text-lg font-semibold mb-2">5. Become a Member</h3>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>
            Upgrade to Gold Membership to enjoy special features and unlimited
            posts.
          </p>
        </div>
      </div>

      <p className="text-center mt-10 text-gray-700 font-medium">
        💡 Tip: Stay respectful, stay active, and make your voice heard in the
        community!
      </p>
    </section>
  );
};

export default HowToUse;
