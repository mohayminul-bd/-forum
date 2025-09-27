import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / Logo */}
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-bold mb-3">MyPlatform</h1>
          <p className="text-gray-400">
            Providing innovative solutions across Technology, Health, Education,
            and Business sectors.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <a href="/" className="hover:text-indigo-500 transition mb-2">
            Home
          </a>
          <a href="/about" className="hover:text-indigo-500 transition mb-2">
            About
          </a>
          <a href="/services" className="hover:text-indigo-500 transition mb-2">
            Services
          </a>
          <a href="/contact" className="hover:text-indigo-500 transition mb-2">
            Contact
          </a>
        </div>

        {/* Contact Info & Social Media */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-5 h-5 text-indigo-500" />
            <span>mohayminulislam514@gmail.com</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-indigo-500" />
            <span>+88-01325440591</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <span>Dhaka, Bangladesh</span>
          </div>

          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Twitter className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8"></div>

      {/* Copyright */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MyPlatform. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
