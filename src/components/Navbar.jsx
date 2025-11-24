import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "../constants/index";
import { IoLogoApple } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [time, setTime] = useState(dayjs());
  const [menuOpen, setMenuOpen] = useState(false);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-md bg-white/30 shadow-md px-6 py-3 flex items-center justify-between transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center justify-center h-5">
        <span className="font-xirstark font-semibold text-gray-900 text-lg sm:text-xl pt-2 flex items-center justify-center">
          <IoLogoApple className="w-6 h-6 -mt-3" />
          Virtual macOS
        </span>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6">
        {navLinks.map((item) => (
          <li
            key={item.id}
            className="text-gray-800 capitalize cursor-pointer relative group transition-colors duration-100"
          >
            {item.name}
            <span className="absolute left-0 -bottom-0 w-0 h-[1.5px] bg-gray-600 transition-all group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Right Icons + Time */}
      <div className="flex items-center gap-4">
        <ul className="hidden md:flex items-center gap-4">
          {navIcons.map((icon) => (
            <li key={icon.id} className="relative group">
              <img
                src={icon.img}
                alt={icon.name || "icon"}
                className="w-4 h-4 opacity-80 hover:opacity-100 cursor-pointer transition-all duration-200 transform hover:scale-110"
              />
            </li>
          ))}
        </ul>
        <span className="text-gray-700 font-mono text-sm sm:text-base">
          {time.format("ddd MMM D h:mm:ss A")}
        </span>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden ml-2 text-gray-800 hover:text-gray-900 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md shadow-lg md:hidden flex flex-col py-4 items-center gap-4">
          {navLinks.map((item) => (
            <div
              key={item.id}
              className="text-gray-800 font-medium capitalize cursor-pointer hover:text-gray-900 transition-colors duration-200"
            >
              {item.name}
            </div>
          ))}
          <div className="flex items-center gap-4 mt-2">
            {navIcons.map((icon) => (
              <img
                key={icon.id}
                src={icon.img}
                alt={icon.name || "icon"}
                className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer transition-all duration-200 transform hover:scale-110"
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
