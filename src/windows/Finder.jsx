import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";
import { 
  IoChevronBack, IoChevronForward, IoSearchOutline, IoGridOutline, IoListOutline 
} from "react-icons/io5";

// Generic File System Data
const FILE_SYSTEM = {
  "Recents": [
    { id: 10, name: "Sunset.jpg", type: "img", size: "892 KB", modified: "Today" },
    { id: 7, name: "Getting_Started.pdf", type: "pdf", size: "1.2 MB", modified: "Yesterday" },
  ],
  "Desktop": [
    { id: 5, name: "Project_Assets", type: "folder", size: "--", modified: "Today" },
    { id: 1, name: "Wallpaper.jpg", type: "img", size: "2.4 MB", modified: "Yesterday" },
    { id: 90, name: "Notes.txt", type: "txt", size: "1 KB", modified: "Today" }
  ],
  "Documents": [
    { id: 14, name: "System_Manual.pdf", type: "pdf", size: "1.2 MB", modified: "Apr 2" },
    { id: 6, name: "Logs", type: "folder", size: "--", modified: "Apr 25" },
    { id: 13, name: "Config.txt", type: "txt", size: "2 KB", modified: "Apr 5" },
  ],
  "Downloads": [
    { id: 2, name: "Installer.dmg", type: "zip", size: "145 MB", modified: "May 12" },
    { id: 88, name: "Archive.zip", type: "zip", size: "45 MB", modified: "May 10" },
  ],
  "Project_Assets": [
    { id: 11, name: "Icon.png", type: "img", size: "12 KB", modified: "Apr 15" },
    { id: 12, name: "Banner.jpg", type: "img", size: "3.5 MB", modified: "Apr 10" },
  ],
  "Logs": [
    { id: 101, name: "error.log", type: "txt", size: "45 KB", modified: "Apr 5" },
  ],
  "Trash": [
    { id: 99, name: "Untitled.txt", type: "txt", size: "0 KB", modified: "Jan 10" },
  ]
};

const SIDEBAR_ITEMS = [
  { group: "Favorites", items: ["Desktop", "Documents", "Downloads", "Recents"] },
  { group: "Locations", items: ["iCloud Drive", "Trash"] }
];

const Finder = () => {
  const { openWindow } = useWindowStore();
  
  // Navigation State
  const [currentPath, setCurrentPath] = useState("Desktop");
  const [history, setHistory] = useState(["Desktop"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewMode, setViewMode] = useState("grid");

  // Derive files from currentPath - no useEffect needed
  const files = FILE_SYSTEM[currentPath] || [];

  // Navigate Folder
  const navigateTo = (folderName) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderName);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(folderName);
    setSelectedFile(null); // Reset selection
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedFile(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedFile(null);
    }
  };

  const handleDoubleClick = (file) => {
    if (file.type === 'folder') {
      navigateTo(file.name);
    } else if (file.type === 'img') {
      openWindow("imgfile", {
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + file.id}?auto=format&fit=crop&w=800&q=80`,
        name: file.name
      });
    } else if (file.type === 'pdf') {
      openWindow("resume", { fileName: file.name });
    } else if (file.type === 'txt') {
      openWindow("txtfile", { content: "This is a mock text file content for " + file.name });
    }
  };

  const getFileIcon = (type) => {
    switch(type) {
      case 'folder': return "/images/folder.png";
      case 'pdf': return "/images/pdf.png";
      case 'img': return "/images/image.png";
      case 'zip': return "/icons/file.svg"; 
      case 'txt': return "/images/txt.png"; 
      default: return "/icons/file.svg";
    }
  };

  return (
    <div className="flex h-full w-full bg-white text-sm font-sans select-none overflow-hidden">
      {/* Sidebar */}
      <div className="w-[180px] flex-shrink-0 bg-[#f3f4f6] border-r border-gray-200 flex flex-col pt-4 backdrop-blur-xl">
        {SIDEBAR_ITEMS.map((group, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
              {group.group}
            </h3>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li 
                  key={item}
                  onClick={() => navigateTo(item)}
                  className={`flex items-center gap-2 px-4 py-1 cursor-pointer ${
                    currentPath === item 
                      ? 'bg-gray-300/60 rounded mx-2' 
                      : 'hover:bg-gray-200/50 mx-2 rounded'
                  }`}
                >
                  <span className="opacity-70 text-base">
                     {item === "Trash" ? "🗑️" : "📁"}
                  </span>
                  <span className="text-[13px] text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-[#fbfbfb]">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <button onClick={goBack} disabled={historyIndex === 0} className="p-1 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-30">
                <IoChevronBack size={18} />
              </button>
              <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-1 rounded text-gray-500 hover:bg-gray-200 disabled:opacity-30">
                <IoChevronForward size={18} />
              </button>
            </div>
            <span className="font-semibold text-gray-700">{currentPath}</span>
          </div>

          <div className="flex items-center gap-2">
            <IoSearchOutline className="text-gray-400" size={18} />
            <div className="bg-gray-200/50 rounded-md flex p-0.5">
                <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}><IoGridOutline /></button>
                <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}><IoListOutline /></button>
            </div>
          </div>
        </div>

        {/* File Area */}
        <div className="flex-1 overflow-y-auto p-4" onClick={() => setSelectedFile(null)}>
          {files.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <span className="text-4xl opacity-20 mb-2">📂</span>
              <p>Folder is empty</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(file.id); }}
                  onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(file); }}
                  className={`flex flex-col items-center p-2 rounded-md border border-transparent ${
                    selectedFile === file.id ? 'bg-blue-100 border-blue-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <img src={getFileIcon(file.type)} alt={file.type} className="w-16 h-16 object-contain drop-shadow-sm" />
                  <span className={`text-xs mt-2 text-center w-full truncate px-1 ${selectedFile === file.id ? 'bg-blue-500 text-white rounded px-2' : 'text-gray-700'}`}>
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
                 <div className="grid grid-cols-12 border-b border-gray-100 pb-2 text-xs text-gray-400">
                    <span className="col-span-6 pl-2">Name</span>
                    <span className="col-span-3">Date Modified</span>
                    <span className="col-span-3">Size</span>
                 </div>
                 {files.map((file) => (
                    <div 
                        key={file.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(file.id); }}
                        onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(file); }}
                        className={`grid grid-cols-12 py-1 items-center cursor-default ${
                            selectedFile === file.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                        <div className="col-span-6 flex items-center gap-2 pl-2">
                             <img src={getFileIcon(file.type)} className="w-4 h-4" />
                             <span className="text-sm truncate">{file.name}</span>
                        </div>
                        <span className="col-span-3 text-xs opacity-70">{file.modified}</span>
                        <span className="col-span-3 text-xs opacity-70">{file.size}</span>
                    </div>
                 ))}
            </div>
          )}
        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-gray-50 border-t border-gray-200 flex items-center px-4 text-[10px] text-gray-500">
           {files.length} items, {files.reduce((acc, f) => f.type !== 'folder' ? acc + 1 : acc, 0) * 45} MB available
        </div>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;