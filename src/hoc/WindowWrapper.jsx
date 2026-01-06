import React, { useRef, useState, useLayoutEffect } from "react";
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

    // Initial Random Placement
    useLayoutEffect(() => {
        if (windowState.isOpen && !isMounted) {
            const winWidth = window.innerWidth;
            const winHeight = window.innerHeight;
            const targetWidth = Math.min(winWidth * 0.6, 900); 
            const targetHeight = Math.min(winHeight * 0.6, 650);
            
            setDrag({
                x: (winWidth - targetWidth) / 2 + (Math.random() * 40 - 20),
                y: (winHeight - targetHeight) / 2 + (Math.random() * 40 - 20)
            });
            setIsMounted(true);
        }
    }, [windowState.isOpen, isMounted]);

    // GSAP Animations
    useGSAP(() => {
        if (!ref.current) return;

        // Opening Animation
        if (windowState.isOpen && !windowState.isMinimized) {
            gsap.to(ref.current, { 
                scale: 1, 
                opacity: 1, 
                y: 0, 
                duration: 0.3, 
                ease: "back.out(1.2)" 
            });
        }
        
        // Minimizing Animation
        if (windowState.isMinimized) {
            const winHeight = window.innerHeight;
            gsap.to(ref.current, {
                scale: 0,
                opacity: 0,
                y: winHeight / 2, // Move towards dock
                duration: 0.4,
                ease: "power3.in"
            });
        }
    }, [windowState.isOpen, windowState.isMinimized]);

    // ----- DRAG LOGIC -----
    const handleMouseDown = (e) => {
      if (windowState.isMaximized) return; // Disable drag if maximized
      focusWindow(windowKey);
      
      if (!e.target.closest(".window-drag-area")) return;
      
      posRef.current = { x: drag.x, y: drag.y };
      mouseRef.current = { x: e.clientX, y: e.clientY };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      
      let newX = posRef.current.x + dx;
      let newY = posRef.current.y + dy;

      // Constraints
      const toolbarHeight = 32;
      if (newY < toolbarHeight) newY = toolbarHeight; 
      const screenWidth = window.innerWidth;
      // Prevent dragging completely off-screen
      if (newX < -300) newX = -300; 
      if (newX > screenWidth - 100) newX = screenWidth - 100;

      setDrag({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    if (!windowState.isOpen) return null;

    // Dynamic Styles for Maximize
    const layoutStyle = windowState.isMaximized 
    ? {
        top: "32px",
        left: 0,
        width: "100%",
        height: "calc(100vh - 100px)", // Leave room for Dock
        transform: "none",
        borderRadius: 0
    }
    : {
        transform: `translate(${drag.x}px, ${drag.y}px)`,
        width: "60vw",
        height: "65vh",
        borderRadius: "0.75rem"
    };

    return (
      <section
        id={windowKey}
        ref={ref}
        onMouseDown={(e) => {
             focusWindow(windowKey);
             handleMouseDown(e);
        }}
        style={{
          zIndex: windowState.zIndex,
          position: "fixed",
          minWidth: "350px",
          minHeight: "250px",
          ...layoutStyle
        }}
        className={`flex flex-col bg-[#f5f5f7]/95 backdrop-blur-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border border-white/20 select-none overflow-hidden transition-all duration-200 ${windowState.isMinimized ? 'pointer-events-none' : ''}`}
      >
        <WindowControls target={windowKey} className="window-drag-area shrink-0 z-50 cursor-grab active:cursor-grabbing border-b border-gray-300/50" />
        <div className="flex-1 overflow-hidden relative bg-white">
             <Component {...props} />
        </div>
      </section>
    );
  };
  
  Wrapped.displayName = `WindowWrapper(${windowKey})`;
  return Wrapped;
};

export default WindowWrapper;