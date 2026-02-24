import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { navLinks, navIcons } from "../constants/index";
import { IoLogoApple } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useWindowStore } from "@store/window";

const menuData = {
  apple: ["About This Mac", "System Settings...", "App Store...", "divider", "Force Quit...", "divider", "Sleep", "Restart...", "Shut Down...", "divider", "Lock Screen", "Log Out User"],
  file: ["New Window", "New Folder", "divider", "Close Window", "Save", "divider", "Print"],
  edit: ["Undo", "Redo", "divider", "Cut", "Copy", "Paste", "Select All"],
  view: ["Show Toolbar", "Customize Toolbar...", "divider", "Enter Full Screen"],
  go: ["Back", "Forward", "Enclosing Folder", "divider", "Recent Folders", "divider", "Go to Folder..."],
  window: ["Minimize", "Zoom", "divider", "Bring All to Front"],
  help: ["Virtual macOS Help", "divider", "See What's New"],
};

const iconMenuData = {
  Wifi: ["Wi-Fi: Connected", "Virtual Network", "divider", "Network Settings..."],
  "Control Center": ["Display", "Sound", "divider", "Bluetooth: On"],
  Siri: ["Siri is not available right now."],
};

const Toolbar = () => {
  const [time, setTime] = useState(dayjs());
  const [activeMenu, setActiveMenu] = useState(null);
  const toolbarRef = useRef(null);

  const { toggleSystemOverlay } = useWindowStore();

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleMenuHover = (id) => {
    if (activeMenu) {
      setActiveMenu(id);
    }
  };

  const handleIconClick = (name) => {
    if (name === "Search") {
      toggleSystemOverlay("spotlight");
      setActiveMenu(null);
    } else {
      handleMenuClick(name);
    }
  };

  const Dropdown = ({ menuId, align = "left" }) => {
    const items = menuData[menuId] || iconMenuData[menuId] || [];
    if (!items.length) return null;

    const isOpen = activeMenu === menuId;

    return (
      <div
        className={`absolute top-full bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-lg min-w-[220px] transition-all duration-200 origin-top z-[9999] overflow-hidden ${align === "right" ? "right-0" : "left-0"
          } ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}
      >
        {items.map((item, i) =>
          item === "divider" ? (
            <div key={i} className="h-px bg-gray-300/60 my-1 mx-3" />
          ) : (
            <button
              key={i}
              onClick={() => setActiveMenu(null)}
              className="w-full text-left px-4 py-1 text-[13px] font-medium text-gray-800 hover:bg-blue-500 hover:text-white transition-colors cursor-default outline-none"
            >
              {item}
            </button>
          )
        )}
      </div>
    );
  };

  return (
    <nav
      ref={toolbarRef}
      className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/30 shadow-md px-6 py-2 flex items-center justify-between transition-all duration-300 select-none"
    >
      <div className="flex items-center gap-6">

        {/* Apple Logo */}
        <div
          className="relative"
          onMouseEnter={() => handleMenuHover("apple")}
        >
          <span
            onClick={() => handleMenuClick("apple")}
            className={`flex items-center gap-2 text-gray-900 text-lg sm:text-xl px-2 py-0.5 rounded-md transition-colors cursor-pointer ${activeMenu === "apple" ? "bg-black/10" : "hover:bg-black/5"
              }`}
          >
            <IoLogoApple className="w-[22px] h-[22px]" />
            <span className="font-semibold text-base hidden sm:block">Virtual macOS</span>
          </span>
          <Dropdown menuId="apple" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = activeMenu === item.id;
            return (
              <li
                key={item.id}
                onMouseEnter={() => handleMenuHover(item.id)}
                onClick={() => handleMenuClick(item.id)}
                className={`flex items-center gap-1 capitalize cursor-pointer relative transition-colors duration-200 px-3 py-1 rounded-md text-[14px] ${isActive
                    ? "text-black font-semibold bg-black/10"
                    : "text-gray-900 hover:bg-black/5"
                  }`}
              >
                <GoDotFill
                  className={`w-2 h-2 opacity-70 transition-transform duration-200 ${isActive ? "text-black rotate-90" : "rotate-0 hidden"
                    }`}
                />
                {item.name}

                {/* Individual Menu Dropdown */}
                <Dropdown menuId={item.id} />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">

        {/* Desktop Icons */}
        <ul className="hidden md:flex items-center gap-2">
          {navIcons.map((icon) => (
            <li
              key={icon.id}
              className="relative"
              onMouseEnter={() => handleMenuHover(icon.name)}
            >
              <div
                onClick={() => handleIconClick(icon.name)}
                className={`p-1.5 rounded-md cursor-pointer transition-all duration-200 ${activeMenu === icon.name ? "bg-black/10" : "hover:bg-black/5"
                  }`}
              >
                <img
                  src={icon.img}
                  alt={icon.name}
                  className="w-[18px] h-[18px] opacity-70 hover:opacity-100 transition transform hover:scale-110"
                />
              </div>
              <Dropdown menuId={icon.name} align="right" />
            </li>
          ))}
        </ul>

        {/* Desktop Badge with Time */}
        <div className="hidden md:flex items-center gap-3 bg-gray-200/80 hover:bg-gray-300/80 transition-colors cursor-pointer text-gray-800 px-3 py-1 rounded-full font-mono text-sm shadow-sm">
          <span>{time.format("ddd MMM D h:mm A")}</span>
        </div>
      </div>

      {/* Mobile Badge */}
      <span className="block md:hidden px-3 py-1 bg-red-500/80 backdrop-blur-md text-white rounded-full text-xs shadow-sm font-medium">
        Features Unavailable
      </span>
    </nav>
  );
};

export default Toolbar;