import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaHome, FaPlusCircle, FaUser, FaStickyNote } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Badge = ({ type }) => {
  if (type === "gold") {
    return (
      <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-sm font-semibold">
        🥇 Gold
      </span>
    );
  } else {
    return (
      <span className="ml-2 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-sm font-semibold">
        🥉 Bronze
      </span>
    );
  }
};

const DashboardLayout = () => {
  const { user } = useAuth(); // 🔹 এখানে context থেকে user আনা

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
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
            <div className="flex-1 px-2 text-xl font-bold">Dashboard</div>
          </div>

          <div className="p-6 w-full lg:w-3/4 mx-auto">
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
              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaUser /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaUser /> Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/announcement"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaUser />
                  Announcement
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/report-comment-admin"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FaUser />
                  Report Admin
                </NavLink>
              </li>
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
                <Badge type={user.isMember ? "gold" : "bronze"} />
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
