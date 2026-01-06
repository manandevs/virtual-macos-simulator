import React, { useState, useEffect, useRef } from "react";
import useWindowStore from "@store/window";
import { IoSearch } from "react-icons/io5";
import { dockApps } from "@constants";

const Spotlight = () => {
  const { systemOverlay, toggleSystemOverlay, openWindow } = useWindowStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (systemOverlay.spotlight) {
        setTimeout(() => inputRef.current?.focus(), 100);
    } else {
        setQuery("");
    }
  }, [systemOverlay.spotlight]);

  const filteredApps = dockApps.filter(app => 
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleLaunch = (id) => {
    openWindow(id);
    toggleSystemOverlay('spotlight');
  };

  if (!systemOverlay.spotlight) return null;

  return (
    <div 
        className="absolute inset-0 z-[10000] bg-black/20 backdrop-blur-[1px]"
        onClick={() => toggleSystemOverlay('spotlight')}
    >
      <div 
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] bg-[#f5f5f7]/80 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-300/50">
          <IoSearch className="text-xl text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent outline-none text-xl text-gray-800 placeholder:text-gray-400"
          />
        </div>
        
        {query && (
          <div className="max-h-[400px] overflow-y-auto py-2">
            {filteredApps.length > 0 ? (
                <>
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase">Applications</div>
                {filteredApps.map(app => (
                <button
                    key={app.id}
                    onClick={() => handleLaunch(app.id)}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors group"
                >
                    <img src={`/images/${app.icon}`} className="w-6 h-6" alt="" />
                    <span className="text-sm font-medium">{app.name}</span>
                    <span className="ml-auto text-xs opacity-0 group-hover:opacity-100">Open</span>
                </button>
                ))}
                </>
            ) : (
                <div className="px-4 py-4 text-center text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;