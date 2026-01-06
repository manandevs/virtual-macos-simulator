import React, { useState } from "react";
import { Desktop, Toolbar, Dock } from "@components";
import Spotlight from "./components/Spotlight";
import { 
  TerminalWindow, 
  Finder, 
  Contact, 
  Safari, 
  Photos, 
  Resume, 
  ImgFile, 
  TxtFile,
  Calculator 
} from "@windows";
import useWindowStore from "@store/window";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const ContextMenu = ({ x, y, close }) => {
    return (
        <div 
            className="fixed z-[99999] bg-white/90 backdrop-blur-md w-48 rounded-lg shadow-xl border border-gray-200 py-1 flex flex-col select-none"
            style={{ top: y, left: x }}
            onMouseLeave={close}
        >
             <button className="text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-sm">New Folder</button>
             <div className="h-[1px] bg-gray-300 my-1"></div>
             <button className="text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-sm">Get Info</button>
             <button className="text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-sm">Change Wallpaper...</button>
             <div className="h-[1px] bg-gray-300 my-1"></div>
             <button className="text-left px-4 py-1 hover:bg-blue-500 hover:text-white text-sm">Clean Up</button>
        </div>
    );
};

const App = () => {
  const { closeAllOverlays } = useWindowStore();
  const [contextMenu, setContextMenu] = useState(null);

  const handleRightClick = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleClick = () => {
    if (contextMenu) setContextMenu(null);
    closeAllOverlays();
  };

  return (
    <div 
        className="w-full h-screen overflow-hidden relative" 
        onContextMenu={handleRightClick} 
        onClick={handleClick}
    >
      <Toolbar />
      <Desktop />
      <Dock />
      <Spotlight />

      {contextMenu && <ContextMenu {...contextMenu} close={() => setContextMenu(null)} />}

      <div className="absolute inset-0 pointer-events-none [&>section]:pointer-events-auto">
        <Finder />
        <Safari />
        <Photos />
        <Contact />
        <TerminalWindow />
        <Calculator />
        <Resume />
        
        <ImgFile />
        <TxtFile />
      </div>
    </div>
  );
};

export default App;