import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { dockApps } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "@store/window";

const Dock = () => {
  const dockRef = useRef(null);
  const { openWindow, windows } = useWindowStore();

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        
        const intensity = Math.max(0, 1 - distance / 150);
        const scale = 1 + 0.3 * Math.sin(intensity * Math.PI / 2);

        gsap.to(icon, {
          scale: scale,
          y: -10 * intensity,
          duration: 0.1,
          overwrite: true,
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.2,
          overwrite: true,
        });
      });
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  });

  const toggleApp = (app) => {
    if (!app.canOpen) return;
    
    // Add bounce animation
    const btn = document.getElementById(`dock-btn-${app.id}`);
    if (btn) {
        gsap.to(btn, { y: -20, duration: 0.2, yoyo: true, repeat: 1 });
    }

    // Always use openWindow to handle opening, bringing to front, AND restoring from minimize
    openWindow(app.id);
  };

  return (
    <section id="dock" ref={dockRef} className="fixed bottom-4 left-1/2  flex justify-center z-[9999]">
      <div className="dock-container px-4 pb-2 pt-3 bg-white/30 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl flex gap-3 items-end h-auto transition-all">
        {dockApps.map((app) => (
          <button
            id={`dock-btn-${app.id}`}
            type="button"
            key={app.id}
            className="dock-icon group relative flex flex-col items-center justify-end w-12 sm:w-14 transition-all duration-100 origin-bottom"
            aria-label={app.name}
            data-tooltip-id="dock-tooltip"
            data-tooltip-content={app.name}
            onClick={() => toggleApp(app)}
          >
            <img
              src={`/images/${app.icon}`}
              alt={app.name}
              className="w-full h-auto object-contain drop-shadow-md"
            />
            
            <div
              className={`absolute -bottom-1.5 w-1 h-1 rounded-full bg-gray-800 transition-all duration-300 ${
                windows[app.id]?.isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
              }`}
            />
          </button>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="!px-2 !py-1 !text-xs !bg-gray-800 !text-white !rounded shadow-lg z-[10000]" offset={15} />
      </div>
    </section>
  );
};

export default Dock;