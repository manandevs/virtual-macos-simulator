import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { dockApps } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Dock = ({ openWindow, activeWindow }) => {
  const dockRef = useRef(null);

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
        const intensity = Math.exp(-(distance ** 2) / 200);

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

    // Cleanup
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  });

  const toggleApp = (app) => {
    if (openWindow) openWindow(app.id);
  };

  return (
    <section id="dock" ref={dockRef}>
      <div className="dock-container px-2 scale-[0.75]">
        {dockApps.map((app) => (
          <button
            type="button"
            key={app.id}
            className="dock-icon"
            aria-label={app.name}
            data-tooltip-id="dock-tooltip"
            data-tooltip-content={app.name}
            data-tooltip-delay-show="150"
            disabled={!app.canOpen}
            onClick={() => toggleApp(app)}
          >
            <img
              src={`/images/${app.icon}`}
              alt={app.name}
              className={`transition-transform duration-200 ${
                activeWindow === app.id
                  ? "ring-2 ring-blue-400 rounded-full"
                  : ""
              }`}
            />
          </button>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
