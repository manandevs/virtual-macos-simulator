// src/hoc/WindowWrapper.jsx
import React, { useRef, useState, useEffect } from "react";
import useWindowStore from "@store/window";
import { WindowControls } from "@components";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const ref = useRef(null);
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows[windowKey] || { isOpen: false, zIndex: 0 };
    
    const [drag, setDrag] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);

    const posRef = useRef({ x: 0, y: 0 });
    const mouseRef = useRef({ x: 0, y: 0 });

    // Open in Center Logic
    useEffect(() => {
        if (windowState.isOpen && !isMounted) {
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            // Default estimated size (60% width/height)
            const targetWidth = Math.min(winWidth * 0.6, 900); 
            const targetHeight = Math.min(winHeight * 0.6, 650);
            
            setDrag({
                x: (winWidth - targetWidth) / 2 + (Math.random() * 30 - 15), // Slight offset for stacking
                y: (winHeight - targetHeight) / 2 + (Math.random() * 30 - 15)
            });
            setIsMounted(true);
        }
    }, [windowState.isOpen, isMounted]);

    // Animate opening
    useGSAP(() => {
        if (windowState.isOpen && ref.current) {
            gsap.fromTo(ref.current, 
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" }
            );
        }
    }, [windowState.isOpen]);

    // ----- DRAGGING -----
    const handleMouseDown = (e) => {
      if (!e.target.closest(".window-drag-area")) return;
      focusWindow(windowKey);
      if (!ref.current) return;
      posRef.current = { x: drag.x, y: drag.y };
      mouseRef.current = { x: e.clientX, y: e.clientY };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      setDrag({ x: posRef.current.x + dx, y: posRef.current.y + dy });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (!windowState.isOpen) return null;

    return (
      <section
        id={windowKey}
        ref={ref}
        onMouseDown={handleMouseDown}
        style={{
          zIndex: windowState.zIndex,
          transform: `translate(${drag.x}px, ${drag.y}px)`,
          position: "absolute",
        }}
        className="flex flex-col bg-white/75 backdrop-blur-2xl rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white/20 select-none overflow-hidden h-[65vh] w-[60vw] min-w-[350px] min-h-[250px]"
      >
        {/* Header/Drag Area */}
        <WindowControls target={windowKey} className="window-drag-area shrink-0 z-50" />

        {/* Content Area with specified padding */}
        <div className="flex-1 overflow-hidden relative">
             <Component {...props} />
        </div>
      </section>
    );
  };

  return Wrapped;
};

export default WindowWrapper;