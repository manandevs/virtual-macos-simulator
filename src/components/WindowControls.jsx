import React from "react";
import useWindowStore from "@store/window";

const WindowControls = ({ target, className = "" }) => {
  const { closeWindow, minimizeWindow, toggleMaximizeWindow } = useWindowStore();

  return (
    <div className={`h-10 flex items-center gap-3 px-3 py-2 bg-transparent w-full ${className}`}>
      <div className="flex items-center gap-2 group">
        <button
          className="flex items-center justify-center w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] hover:bg-[#ff5f57]/80 text-[8px] text-black/50 opacity-100 transition-all"
          onClick={(e) => { e.stopPropagation(); closeWindow(target); }}
        >
          <span className="opacity-0 group-hover:opacity-100">✕</span>
        </button>
        <button
          className="flex items-center justify-center w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:bg-[#ffbd2e]/80 text-[8px] text-black/50 opacity-100 transition-all"
          onClick={(e) => { e.stopPropagation(); minimizeWindow(target); }}
        >
          <span className="opacity-0 group-hover:opacity-100">−</span>
        </button>
        <button
          className="flex items-center justify-center w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] hover:bg-[#27c93f]/80 text-[6px] text-black/50 opacity-100 transition-all"
          onClick={(e) => { e.stopPropagation(); toggleMaximizeWindow(target); }}
        >
          <span className="opacity-0 group-hover:opacity-100">sw</span>
        </button>
      </div>
      <div className="ml-2 text-sm font-medium text-gray-700 select-none flex-1 text-center capitalize">
          {target}
      </div>
      <div className="w-12"></div>
    </div>
  );
};

export default WindowControls;