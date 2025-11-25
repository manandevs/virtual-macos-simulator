import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "../constants/index";
import { IoLogoApple } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { GoDotFill } from "react-icons/go";

const Navbar = () => {
  const [time, setTime] = useState(dayjs());
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(navLinks[0]?.id);

  // clock update
  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className="
        w-full fixed top-0 left-0 z-50
        backdrop-blur-xl bg-white/30 border-b border-white/20
        shadow-md px-6 py-3 
        flex items-center justify-between
        transition-all duration-300
      "
    >
      {/* Left section */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <span className="flex items-center gap-2 font-xirstark text-gray-900 text-lg sm:text-xl">
          <IoLogoApple className="w-6 h-6 -mt-1" />
          Virtual macOS
        </span>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-4">
          {navLinks.map((item) => {
            const isActive = activeLink === item.id;

            return (
              <li
                key={item.id}
                onClick={() => setActiveLink(item.id)}
                className={`
                  flex items-center gap-1 capitalize cursor-pointer
                  relative transition-all duration-200
                  group
                  ${isActive ? "text-black font-semibold" : "text-gray-900 hover:text-black"}
                `}
              >
                <GoDotFill className={`w-3 h-3 opacity-70 transition-all duration-200 ${isActive ? "text-black rotate-90 block" : "rotate-0 hidden"}`} />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5">
        {/* Desktop Icons */}
        <ul className="hidden md:flex items-center gap-4">
          {navIcons.map((icon) => (
            <li key={icon.id}>
              <img
                src={icon.img}
                alt={icon.name}
                className="
                  w-4 h-4 opacity-70 hover:opacity-100
                  transition transform hover:scale-110
                  cursor-pointer
                "
              />
            </li>
          ))}
        </ul>

        {/* Live Clock */}
        <span className="text-gray-800 font-mono text-sm whitespace-nowrap">
          {time.format("ddd MMM D h:mm:ss A")}
        </span>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-900 hover:scale-110 transition"
        >
          {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="
            absolute top-full left-0 w-full md:hidden
            bg-white/90 backdrop-blur-xl shadow-lg
            flex flex-col items-center gap-5 py-6
          "
        >
          {navLinks.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveLink(item.id);
                setMenuOpen(false);
              }}
              className="
                text-gray-900 text-lg capitalize cursor-pointer
                hover:text-black transition
              "
            >
              {item.name}
            </div>
          ))}

          <div className="flex items-center gap-5">
            {navIcons.map((icon) => (
              <img
                key={icon.id}
                src={icon.img}
                alt={icon.name}
                className="
                  w-6 h-6 opacity-80 hover:opacity-100
                  transition transform hover:scale-110
                "
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
