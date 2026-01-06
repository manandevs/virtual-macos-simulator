import React from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { IoDownloadOutline, IoPrintOutline, IoDocumentTextOutline } from "react-icons/io5";

const Resume = () => {
  return (
    <div className="flex flex-col h-full bg-[#525659] overflow-hidden">
      {/* PDF Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#323639] text-gray-200 shadow-md z-10">
         <span className="text-sm font-medium">Getting_Started.pdf</span>
         <div className="flex items-center gap-4">
            <div className="flex bg-[#202124] rounded px-2 py-0.5 items-center gap-2 text-sm">
                <button className="hover:text-white text-gray-400 font-bold">-</button>
                <span className="w-10 text-center">100%</span>
                <button className="hover:text-white text-gray-400 font-bold">+</button>
            </div>
            <IoDownloadOutline className="cursor-pointer hover:text-white text-gray-400" />
            <IoPrintOutline className="cursor-pointer hover:text-white text-gray-400" />
         </div>
      </div>
      
      {/* PDF Body (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-[#525659]">
         <div className="bg-white w-[595px] min-h-[842px] shadow-2xl p-10 text-gray-800 transition-transform origin-top">
            <header className="border-b border-gray-200 pb-6 mb-8 flex items-center gap-4">
                <IoDocumentTextOutline size={50} className="text-gray-400"/>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Virtual macOS Simulator</h1>
                    <p className="text-lg text-gray-600 mt-1">User Guide & Manual</p>
                </div>
            </header>
            
            <div className="space-y-8">
                <section>
                    <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-200 pb-2 mb-4">Introduction</h2>
                    <p className="text-sm leading-relaxed text-gray-700">
                        Welcome to the virtual macOS simulator. This web-based environment allows you to experience the look and feel of a desktop operating system directly within your browser. 
                        It is built using modern web technologies including React and Tailwind CSS.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-200 pb-2 mb-4">Features</h2>
                    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-2">
                        <li><strong>Window Management:</strong> Drag, drop, minimize, and maximize windows just like a real OS.</li>
                        <li><strong>Dock System:</strong> Launch applications quickly from the dock at the bottom of the screen.</li>
                        <li><strong>Finder:</strong> Navigate through a simulated file system.</li>
                        <li><strong>Apps:</strong> Includes simulated versions of Safari, Photos, Contacts, Terminal, and more.</li>
                    </ul>
                </section>
                
                <section>
                    <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-200 pb-2 mb-4">Shortcuts</h2>
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
                        <span>Terminal: <code className="bg-gray-100 px-1 rounded">ctrl + L</code></span>
                        <span>Clear terminal screen</span>
                        <span>Finder: <code className="bg-gray-100 px-1 rounded">dbl-click</code></span>
                        <span>Open files or folders</span>
                    </div>
                </section>

                <div className="mt-10 pt-10 border-t border-gray-200 text-center text-xs text-gray-500">
                    <p>Version 1.0.0 • © 2025 Simulator Inc.</p>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;