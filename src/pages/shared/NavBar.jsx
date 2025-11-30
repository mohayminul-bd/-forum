import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { MdNotifications } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { darkMode, setDarkMode } = useContext(AuthContext);
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogOut = async () => {
    try {
      await logOut();
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

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
  const handleNotificationsClick = () => setShowBadge(false);

  // ✅ Scroll page to top and close menus
  const handleNavClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded text-sm font-medium tracking-wide transition 
     ${
       isActive
         ? "text-white bg-emerald-600"
         : "text-gray-100 hover:text-white hover:bg-emerald-500/40"
     }`;

  const navItem = (
    <>
      <li>
        <NavLink to="/" onClick={handleNavClick} className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addPost"
          onClick={handleNavClick}
          className={navLinkClass}
        >
          Add Post
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/membership"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              Membership
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/about" onClick={handleNavClick} className={navLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          onClick={handleNavClick}
          className={navLinkClass}
        >
          Service
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          onClick={handleNavClick}
          className={navLinkClass}
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar w-full  fixed top-0 left-0 right-0 z-50 md:px-12 py-2.5 
       text-white shadow-sm ${darkMode ? "bg-gray-800" : " bg-teal-700"}`}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl text-white"
          >
            ☰
          </button>
        </div>

        <Link
          to="/"
          onClick={handleNavClick}
          className="text-2xl pl-4 font-semibold text-white hover:text-gray-200 transition"
        >
          Forum
        </Link>
      </div>

      {/* Navbar Center (desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-2 space-x-2">{navItem}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end relative" ref={dropdownRef}>
        <div>
          <label className="swap swap-rotate mr-3">
            {/* hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />

            {/* Sun Icon */}
            <svg
              className="swap-off h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon Icon */}
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        <div className="mx-3 relative">
          <NavLink
            to="/HomeAnnouncements"
            className="relative"
            onClick={() => {
              handleNotificationsClick();
              handleNavClick();
            }}
          >
            <MdNotifications className="text-2xl text-white" />
            {showBadge && announcementCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {announcementCount}
              </span>
            )}
          </NavLink>
        </div>

        {!user ? (
          <Link to="/login" onClick={handleNavClick}>
            <span className="btn bg-white text-emerald-700 hover:bg-gray-100 border-none text-sm font-medium px-4 py-1.5">
              Log In
            </span>
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full">
                <img
                  src={user?.photoURL || "/default-profile.png"}
                  alt="user"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute h-40 right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50 text-gray-700 text-md">
                <Link
                  to="/dashboard/homeDashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={handleNavClick}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Side Menu */}
      {menuOpen && (
        <div className="fixed  inset-0  z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="relative bg-gradient-to-r from-teal-700 to-teal-700 w-[70%] h-full shadow-lg p-5">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-2xl"
            >
              ✕
            </button>
            <ul className="menu space-y-3 mt-10 text-gray-700 text-base font-medium">
              {navItem}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
