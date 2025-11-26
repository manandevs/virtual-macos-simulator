import React from "react";
import useWindowStore from "@store/window";

const WindowControls = ({ target, className = "" }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div className={`h-10 flex items-center gap-3 px-3 py-2 bg-neutral-800 border-b border-neutral-700 ${className}`}>
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer w-3 h-3 rounded-full bg-red-500 hover:bg-red-400"
          onClick={(e) => {
            e.stopPropagation(); // prevents starting a drag
            closeWindow(target);
          }}
        />
        <div className="cursor-pointer w-3 h-3 rounded-full bg-yellow-500" />
        <div className="cursor-pointer w-3 h-3 rounded-full bg-green-500" />
      </div>

      <div className="ml-3 text-sm font-medium text-white">{target}</div>

      <div className="ml-auto mr-2 text-xs text-neutral-400" />
    </div>
  );
};

export default WindowControls;
