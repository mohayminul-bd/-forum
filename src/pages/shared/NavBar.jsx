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
              to="/dashboard/homeDashboard"
              onClick={handleNavClick}
              className={navLinkClass}
            >
              Dashboard
            </NavLink>
          </li>
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
      className="navbar w-full  fixed top-0 left-0 right-0 z-50 md:px-12 py-2.5 
      bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm"
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
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn border-none shadow shadow-gray-200 btn-outline btn-sm p-2 mr-2"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
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
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50 text-gray-700 text-sm">
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
