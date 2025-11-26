import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { dockApps } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "@store/window";

const Dock = () => {
  const dockRef = useRef(null);

  // ❗ DO NOT TOUCH — as you requested
  const { openWindow, closeWindow, windows } = useWindowStore();

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
        const intensity = Math.exp(-(distance ** 2) / 2000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          duration: 0.2,
          ease: "power1.out",
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
          duration: 0.3,
          ease: "power1.out",
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

  const win = windows[app.id]; // <-- correct variable
  if (win?.isOpen) {
    closeWindow(app.id);
  } else {
    openWindow(app.id);
  }

  console.log(win, app);
};


  return (
    <section id="dock" ref={dockRef}>
      <div className="dock-container px-2 scale-[0.75]">
        {dockApps.map((app) => (
          <button
            type="button"
            key={app.id}
            className="dock-icon group"

            aria-label={app.name}
            data-tooltip-id="dock-tooltip"
            data-tooltip-content={app.name}
            data-tooltip-delay-show="150"
            disabled={!app.canOpen}
            onClick={() => toggleApp(app)}
          >
            <div className="relative flex flex-col items-center">
              <img
                src={`/images/${app.icon}`}
                alt={app.name}
                className="transition-transform duration-200"
              />

              {windows[app.id]?.isOpen && (
                <div
                  className={`
          absolute -bottom-0.5 h-1 rounded-full transition-all duration-150 
          shadow-[0_0_6px_rgba(66,133,244,0.9)]
          w-3 bg-gray-200 group-hover:w-8 group-hover:bg-blue-400
          ${windows[app.id]?.isOpen ? "w-6 bg-blue-400" : ""}
        `}
                />
              )}
            </div>
          </button>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section >
  );
};

export default Dock;
