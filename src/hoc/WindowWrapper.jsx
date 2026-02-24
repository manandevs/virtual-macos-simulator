import React, { useRef, useState, useEffect } from "react";
import { useWindowStore } from "@store/window";
import { WindowControls } from "@components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const ref = useRef(null);
    const { focusWindow, windows, toggleMaximizeWindow } = useWindowStore();
    const windowState = windows[windowKey];

    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    const dragOffset = useRef({ x: 0, y: 0 });

    useEffect(() => {
      if (windowState.isOpen && !isMounted) {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        
        const w = Math.max(winWidth * 0.99, 1000);
        const h = Math.max(winHeight * 0.99, 500);

        setPos({
          x: (winWidth - w) / 2,
          y: (winHeight - h) / 2,
        });
        
        setIsMounted(true);
      }
    }, [windowState.isOpen, isMounted]);

    useGSAP(() => {
      if (windowState.isOpen && ref.current && !windowState.isMinimized) {
        gsap.fromTo(
          ref.current,
          { scale: 0.95, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    }, [windowState.isOpen, windowState.isMinimized]);

    const handleMouseDown = (e) => {
      focusWindow(windowKey); 

      if (!e.target.closest(".window-drag-area") || windowState.isMaximized) return;

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
      let newX = e.clientX - dragOffset.current.x;
      let newY = e.clientY - dragOffset.current.y;

      if (newY < 0) newY = 0;

      const windowWidth = ref.current?.offsetWidth || 300;
      if (newX + windowWidth < 50) newX = 50 - windowWidth; 
      if (newX > window.innerWidth - 50) newX = window.innerWidth - 50; 

      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (!windowState.isOpen || windowState.isMinimized) return null;

    const maximizedStyle = {
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transform: "none", 
      borderRadius: 0,
    };

    const normalStyle = {
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
          borderRadius: windowState.isMaximized ? "0px" : "12px",
          top: 0,
          left: 0,
        }}
      >
        <div
          className="window-drag-area shrink-0 z-50 w-full"
          onMouseDown={handleMouseDown}
          onDoubleClick={() => toggleMaximizeWindow(windowKey)}
        >
          <WindowControls target={windowKey} />
        </div>

        <div className="flex-1 overflow-hidden relative flex flex-col">
          <Component {...props} />
        </div>
      </section>
    );
  };

  return Wrapped;
};

export default WindowWrapper;