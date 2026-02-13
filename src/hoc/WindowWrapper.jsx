import React, { useRef, useState, useEffect } from "react";
import useWindowStore from "@store/window";
import { WindowControls } from "@components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const ref = useRef(null);
    const { focusWindow, windows, toggleMaximizeWindow } = useWindowStore();
    const windowState = windows[windowKey];

    // Current position state
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    // Store the distance between the mouse and the top-left corner of the window
    const dragOffset = useRef({ x: 0, y: 0 });

    // 1. Initial Centering Logic
    useEffect(() => {
      if (windowState.isOpen && !isMounted) {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        // Default window size assumption (matches CSS min-widths)
        const w = Math.min(winWidth * 0.6, 900);
        const h = Math.min(winHeight * 0.6, 600);

        setPos({
          x: (winWidth - w) / 2 + (Math.random() * 40 - 20),
          y: (winHeight - h) / 2 + (Math.random() * 40 - 20),
        });
        setIsMounted(true);
      }
    }, [windowState.isOpen, isMounted]);

    // 2. Open Animation
    useGSAP(() => {
      if (windowState.isOpen && ref.current && !windowState.isMinimized) {
        gsap.fromTo(
          ref.current,
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }, [windowState.isOpen, windowState.isMinimized]);

    // 3. Dragging Logic
    const handleMouseDown = (e) => {
      focusWindow(windowKey); // Bring to front on click

      // Only allow drag if target is the header area and NOT maximized
      if (!e.target.closest(".window-drag-area") || windowState.isMaximized) return;

      // Calculate the offset: Mouse Position - Window Top-Left Position
      // This ensures the window stays exactly where it is relative to the cursor
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        dragOffset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
      // New Position = Current Mouse - Initial Offset
      let newX = e.clientX - dragOffset.current.x;
      let newY = e.clientY - dragOffset.current.y;

      // Boundary Check: Prevent window from going above the screen (cannot reach close buttons)
      if (newY < 0) newY = 0;
      
      // (Optional) Horizontal boundary check to keep some part of window on screen
      const windowWidth = ref.current?.offsetWidth || 300;
      if (newX + windowWidth < 50) newX = 50 - windowWidth; // Keep right edge visible
      if (newX > window.innerWidth - 50) newX = window.innerWidth - 50; // Keep left edge visible

      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (!windowState.isOpen || windowState.isMinimized) return null;

    // 4. Styles based on State
    const maximizedStyle = {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transform: "none", // Reset transform when maximized
      borderRadius: 0,
    };

    const normalStyle = {
      // Use standard top/left for positioning to ensure getBoundingClientRect works predictably next time,
      // or use translate. Translate is usually more performant.
      transform: `translate(${pos.x}px, ${pos.y}px)`,
      width: "60vw",
      height: "65vh",
      minWidth: "350px",
      minHeight: "250px",
    };

    const currentStyle = windowState.isMaximized ? maximizedStyle : normalStyle;

    return (
      <section
        id={windowKey}
        ref={ref}
        onMouseDown={() => focusWindow(windowKey)}
        className="absolute flex flex-col bg-white/80 backdrop-blur-2xl shadow-2xl overflow-hidden border border-white/40 transition-all duration-75 ease-out will-change-transform"
        style={{
          zIndex: windowState.zIndex,
          ...currentStyle,
          // If maximized, remove border radius, otherwise use standard
          borderRadius: windowState.isMaximized ? "0px" : "12px",
          // Ensure initial position is top-left so translate works from 0,0
          top: 0,
          left: 0, 
        }}
      >
        {/* Header/Drag Area */}
        <div
          className="window-drag-area shrink-0 z-50 w-full"
          onMouseDown={handleMouseDown}
          onDoubleClick={() => toggleMaximizeWindow(windowKey)}
        >
          <WindowControls target={windowKey} />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          <Component {...props} />
        </div>
      </section>
    );
  };

  return Wrapped;
};

export default WindowWrapper;