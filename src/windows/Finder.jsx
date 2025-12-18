import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";
import { locations } from "@constants";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const [activeSide, setActiveSide] = useState("work");
  const [currentDir, setCurrentDir] = useState(locations.work);
  const [history, setHistory] = useState([locations.work]);

  const handleSidebarClick = (key) => {
    const loc = locations[key];
    if (loc) {
      setActiveSide(key);
      setCurrentDir(loc);
      setHistory([loc]);
    }
  };

  const handleFileClick = (item) => {
    if (item.kind === "folder") {
      setCurrentDir(item);
      setHistory((prev) => [...prev, item]);
    } else {
      // Open specific file types
      if (item.fileType === "txt") {
        openWindow("txtfile", item);
      } else if (item.fileType === "img") {
        openWindow("imgfile", item);
      } else if (item.fileType === "url") {
        window.open(item.href, "_blank");
      } else if (item.fileType === "pdf") {
        openWindow("resume", item);
      } else if (item.fileType === "fig") {
        window.open(item.href, "_blank");
      }
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCurrentDir(newHistory[newHistory.length - 1]);
    }
  };

  return (
    <div className="flex h-full w-full bg-white text-sm text-gray-700 font-medium">
      {/* Sidebar */}
      <div className="sidebar w-48 bg-gray-50/90 border-r border-gray-200 p-4 flex flex-col gap-4 backdrop-blur-sm">
        <div>
          <h3 className="text-xs text-gray-400 font-semibold mb-2 px-2">Favorites</h3>
          <ul className="space-y-1">
            {Object.keys(locations).map((key) => (
              <li
                key={key}
                onClick={() => handleSidebarClick(key)}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors ${
                  activeSide === key ? "bg-blue-200/50 text-blue-700" : "hover:bg-gray-200"
                }`}
              >
                <img src={locations[key].icon} alt={key} className="w-4 h-4" />
                <span className="capitalize">{locations[key].name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Navigation Bar inside Finder */}
        <div className="flex items-center gap-4 p-3 border-b border-gray-200 bg-white">
            <div className="flex gap-2">
                <button 
                    onClick={goBack} 
                    disabled={history.length <= 1}
                    className="p-1 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <svg className="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <span className="font-semibold text-gray-600">{currentDir.name}</span>
            </div>
        </div>

        {/* Files Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          {currentDir.children && currentDir.children.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {currentDir.children.map((child) => (
                <div
                  key={child.id}
                  onDoubleClick={() => handleFileClick(child)}
                  className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <img
                    src={child.icon}
                    alt={child.name}
                    className="w-14 h-14 object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                  />
                  <span className="text-center text-xs w-full truncate px-1 rounded group-hover:text-blue-600 group-hover:font-semibold">
                    {child.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Folder is empty
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WindowWrapper(Finder, "finder");