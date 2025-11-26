import React, { useRef, useState } from "react";
import useWindowStore from "@store/window";
import { WindowControls } from "@components";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const ref = useRef(null);
    const { focusWindow, windows } = useWindowStore();
    const windowState = windows[windowKey] || { isOpen: false, zIndex: 0 };

    const [drag, setDrag] = useState({ x: 200, y: 150 });

    const posRef = useRef({ x: 0, y: 0 });
    const mouseRef = useRef({ x: 0, y: 0 });

    // ----- DRAGGING -----
    const handleMouseDown = (e) => {
      // only drag if clicking header
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

      setDrag({
        x: posRef.current.x + dx,
        y: posRef.current.y + dy,
      });
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
        className="bg-black h-2/3 w-1/2 rounded-lg shadow-xl select-none"
      >
        {/* This class enables dragging only on the header */}
        <WindowControls target={windowKey} className="window-drag-area" />

        <Component {...props} />
      </section>
    );
  };

  return Wrapped;
};

export default WindowWrapper;
