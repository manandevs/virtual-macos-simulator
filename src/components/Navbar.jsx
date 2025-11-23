import React from "react";
import { navLinks, navIcons } from "../constants/index"; // adjust path if needed

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 backdrop-blur-md bg-white/20 fixed top-0 left-0 z-50">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/macbook.png" alt="logo" className="w-8 h-8" />
        <span className="font-semibold text-gray-900">My Portfolio</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center gap-6">
        {navLinks.map((item) => (
          <li
            key={item.id}
            className="text-gray-800 font-medium hover:text-black cursor-pointer capitalize"
          >
            {item.name}
          </li>
        ))}
      </ul>

      {/* Right Icons */}
      <ul className="flex items-center gap-4">
        {navIcons.map((icon) => (
          <li key={icon.id}>
            <img
              src={icon.img}
              alt="icon"
              className="w-5 h-5 opacity-80 hover:opacity-100 cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
