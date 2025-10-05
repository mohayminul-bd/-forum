import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import { MdNotifications } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); // mobile side menu state
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
    setShowBadge(false);
  };

  // ✅ Close menu when clicking nav item
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const navItem = (
    <>
      <li>
        <NavLink to="/" onClick={handleNavClick} className="px-3 py-1 rounded">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/addPost"
          onClick={handleNavClick}
          className="px-3 py-1 rounded"
        >
          Add Post
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard/homeDashboard"
              onClick={handleNavClick}
              className="px-3 py-1 rounded"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/membership"
              onClick={handleNavClick}
              className="px-3 py-1 rounded"
            >
              Membership
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink
          to="/about"
          onClick={handleNavClick}
          className="px-3 py-1 rounded"
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          onClick={handleNavClick}
          className="px-3 py-1 rounded"
        >
          Service
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          onClick={handleNavClick}
          className="px-3 py-1 rounded"
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className="navbar bg-base-100 px-7 shadow-sm 
      fixed top-0 left-0 right-0 z-40 lg:static"
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Hamburger button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="btn btn-ghost text-2xl"
          >
            ☰
          </button>
        </div>

        <Link
          to="/"
          className="btn btn-ghost text-xl items-center justify-center"
        >
          <span className="text-3xl text-emerald-500">Forum</span>
        </Link>
      </div>

      {/* Navbar Center (desktop menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItem}</ul>
      </div>

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
                <img
                  src={user?.photoURL || "/default-profile.png"}
                  alt="user"
                />
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

      {/* Mobile Side Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative bg-white w-[70%] h-full shadow-lg p-5">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-3 right-3 text-2xl"
            >
              ✕
            </button>
            <ul className="menu space-y-4 mt-10">{navItem}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
