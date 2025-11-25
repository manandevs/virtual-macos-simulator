import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "../constants/index";
import { IoLogoApple } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

const Toolbar = () => {
  const [time, setTime] = useState(dayjs());
  const [activeLink, setActiveLink] = useState(navLinks[0]?.id);

  // clock update
  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/30 border-b border-white/20 shadow-md px-6 py-1 flex items-center justify-between transition-all duration-300">
      {/* Left section */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <span className="flex items-center gap-2 font-xirstark text-gray-900 text-lg sm:text-xl pt-2.5">
          <IoLogoApple className="w-6 h-6 -mt-3" />
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
                className={`flex items-center gap-1 capitalize cursor-pointer relative transition-all duration-200 group ${isActive
                    ? "text-black font-semibold"
                    : "text-gray-900 hover:text-black"
                  }`}
              >
                <GoDotFill
                  className={`w-3 h-3 opacity-70 transition-all duration-200 ${isActive ? "text-black rotate-90 block" : "rotate-0 hidden"
                    }`}
                />
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
                className="w-4 h-4 opacity-70 hover:opacity-100 transition transform hover:scale-110 cursor-pointer"
              />
            </li>
          ))}
        </ul>

        {/* Desktop Badge with Features */}
        <div className="hidden md:flex items-center gap-3 bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-mono text-sm">
          <span>{time.format("ddd MMM D h:mm:ss A")}</span>
        </div>
      </div>
      <span className="block md:hidden px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
        Features Unabled
      </span>
    </nav>
  );
};

export default Toolbar;
