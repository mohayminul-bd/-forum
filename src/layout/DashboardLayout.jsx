import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaHome, FaPlusCircle, FaUser, FaStickyNote } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

// Badge components
const BronzeBadge = () => (
  <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold shadow-sm text-sm sm:text-base">
    <span className="text-xl">🥉</span> <span>Bronze</span>
  </div>
);

const GoldBadge = () => (
  <div className="flex items-center gap-2 bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-semibold shadow-md text-sm sm:text-base">
    <span className="text-xl">🥇</span> <span>Gold</span>
  </div>
);

const DashboardLayout = () => {
  const { darkMode } = useContext(AuthContext);
  const { user } = useAuth(); // 🔹 এখানে context থেকে user আনা
  const [role, setRole] = useState("user");
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://fourm-server.vercel.app/users/role/${user.email}`)
        .then((res) => setRole(res.data.role));
      // .catch(() => setRole("admin"));
    }
  }, [user?.email]);

  // ✅ Get user info from DB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://fourm-server.vercel.app/users/role/${user.email}`
        );

        setProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (user?.email) fetchProfile();
  }, [user?.email]);

  // console.log(role);
  return (
    <div>
      <div
        className={`drawer lg:drawer-open ${
          darkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg text-white"
            : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        }`}
      >
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-gradient-to-r md:hidden from-emerald-600 to-teal-700 text-whi w-full">
            <div className="flex-none  lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
          </div>

          <div className="p-6 w-full  mx-auto">
            <Outlet />
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <li>
                <NavLink
                  className="flex items-center gap-2 text-lg font-semibold"
                  to="/"
                >
                  <FaHome className="text-green-400" size={40} /> Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/homeDashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaHome /> Home Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addPost"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaPlusCircle /> Add Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myPost"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaStickyNote /> My Post
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myProfile"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaUser /> My Profile
                </NavLink>
              </li>

              {/* {role == "admin" && <AdminDashboard></AdminDashboard>} */}

              {role === "admin" ? (
                <div>
                  <AdminDashboard></AdminDashboard>
                </div>
              ) : (
                <div>👤 Normal user dashboard</div>
              )}
            </div>

            {/* User Info at bottom */}
            {user && (
              <div className="flex flex-col items-center mt-6 border-t pt-4">
                <img
                  src={user.photoURL || "/default-profile.png"}
                  alt={user.name || "User"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-200 shadow-sm mb-2"
                />
                <p className="text-gray-700 font-semibold text-center">
                  {user.name || "Unnamed User"}
                </p>
                <p className="text-gray-500 text-sm">
                  {user.email || "No email"}
                </p>
                {profile?.isMember ? <GoldBadge /> : <BronzeBadge />}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
