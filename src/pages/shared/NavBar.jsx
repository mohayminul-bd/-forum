import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { MdNotifications } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true); // Badge দেখানোর state
  const dropdownRef = useRef();

  const handleLogOut = async () => {
    try {
      await logOut();
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch announcements
  const { data: announcements } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get(
        "https://fourm-server.vercel.app/announcements"
      );
      return res.data;
    },
  });

  const announcementCount = announcements?.length || 0;

  const handleNotificationsClick = () => {
    setShowBadge(false); // ক্লিক করলে badge disappear হবে
  };

  const navItem = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? "bg-green-200 text-green-800" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addPost"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? "bg-green-200 text-green-800" : ""}`
          }
        >
          Add Post
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/homeDashboard"
              className={({ isActive }) =>
                `px-3 py-1 rounded ${
                  isActive ? "bg-green-200 text-green-800" : ""
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/membership"
              className={({ isActive }) =>
                `px-3 py-1 rounded ${
                  isActive ? "bg-green-200 text-green-800" : ""
                }`
              }
            >
              MembershipPage
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? "bg-green-200 text-green-800" : ""}`
          }
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? "bg-green-200 text-green-800" : ""}`
          }
        >
          Service
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? "bg-green-200 text-green-800" : ""}`
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 px-7 shadow-sm">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {navItem}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl items-center justify-center"
        >
          <span className="text-3xl text-emerald-500">Forum</span>
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>

      {/* Notification Icon */}

      {/* Navbar End */}
      <div className="navbar-end relative" ref={dropdownRef}>
        <div className="mx-4 md:mr-14 mr-7 relative">
          <NavLink
            to="/HomeAnnouncements"
            className="relative"
            onClick={handleNotificationsClick}
          >
            <MdNotifications className="text-2xl text-gray-700" />
            {showBadge && announcementCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {announcementCount}
              </span>
            )}
          </NavLink>
        </div>
        {!user ? (
          <Link to="/login">
            <span className="btn btn-primary text-black">Log In</span>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "/default-profile.png"} alt="user" />
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 h-32 bg-white border rounded-lg shadow-lg z-50">
                <Link
                  to="/dashboard/homeDashboard"
                  className="block px-4 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
