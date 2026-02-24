import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { blogPosts } from "@constants";
import {
  IoChevronBack, IoChevronForward, IoReload, IoShareOutline,
  IoLockClosed, IoSearch, IoShieldCheckmark, IoAdd, IoCopyOutline,
  IoSidebarOutline
} from "react-icons/io5";

const Safari = () => {
  const [url, setUrl] = useState("startpage");
  const [inputValue, setInputValue] = useState("");
  const [iframeSrc, setIframeSrc] = useState(null);

  const handleNavigate = (e) => {
    e.preventDefault();
    let query = inputValue.trim();

    if (!query || query === "startpage") {
      setIframeSrc(null);
      setUrl("startpage");
      setInputValue("");
      return;
    }

    const isUrl = /^https?:\/\//i.test(query) || (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/.test(query) && !query.includes(" "));

    if (isUrl) {
      let finalUrl = query;
      if (!/^https?:\/\//i.test(query)) {
        finalUrl = `https://${query}`;
      }
      setIframeSrc(finalUrl);
      setUrl(finalUrl);
      setInputValue(finalUrl);
    } else {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&igu=1`;
      setIframeSrc(searchUrl);
      setUrl(searchUrl);
    }
  };

  const loadBookmark = (link) => {
    setInputValue(link);
    setIframeSrc(link);
    setUrl(link);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f1f1f1] font-sans text-gray-800 select-none">

      {/* Title Bar / Browser Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f6f6f6] border-b border-gray-300/80 drag-handle">

        {/* Left Controls */}
        <div className="flex items-center gap-4 w-1/4">
          <IoSidebarOutline className="text-gray-500 text-lg hover:text-gray-800 cursor-pointer transition-colors" />
          <div className="flex items-center gap-3">
            <IoChevronBack className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg transition-colors" />
            <IoChevronForward className="text-gray-400 hover:text-gray-600 cursor-pointer text-lg transition-colors" />
          </div>
        </div>

        {/* Center: Smart Address Bar */}
        <div className="flex-1 flex justify-center max-w-2xl">
          <form onSubmit={handleNavigate} className="flex items-center bg-white border border-gray-200/80 rounded-md px-3 py-1.5 shadow-sm focus-within:ring-[3px] focus-within:ring-blue-400/30 focus-within:border-blue-400/50 transition-all w-full max-w-xl relative">
            <div className="flex items-center justify-center w-5">
              {iframeSrc ? (
                <IoLockClosed className="text-gray-600 text-[11px]" />
              ) : (
                <IoSearch className="text-gray-400 text-sm" />
              )}
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[13px] text-center focus:text-left text-gray-800 px-2 w-full placeholder-gray-400 font-medium transition-all"
              placeholder="Search Google or enter website name"
            />

            {iframeSrc && (
              <IoReload
                className="text-gray-500 hover:text-gray-800 cursor-pointer text-sm"
                onClick={() => setIframeSrc(iframeSrc)}
              />
            )}
          </form>
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <IoShareOutline className="text-gray-500 hover:text-gray-800 cursor-pointer text-lg transition-colors" />
          <IoAdd className="text-gray-500 hover:text-gray-800 cursor-pointer text-xl transition-colors" />
          <IoCopyOutline className="text-gray-500 hover:text-gray-800 cursor-pointer text-lg transition-colors" />
        </div>
      </div>

      {/* Browser Content Area */}
      <div className="flex-1 overflow-hidden relative bg-white">
        {iframeSrc ? (
          <iframe
            src={iframeSrc}
            title="browser-content"
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          // Safari MacOS Start Page
          <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-100 via-purple-50 to-orange-50">
            <div className="min-h-full w-full bg-white/40 backdrop-blur-xl p-8">
              <div className="max-w-4xl mx-auto pt-8 pb-20">

                {/* Favorites Grid */}
                <div className="mb-14">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 px-2">Favorites</h2>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-8 gap-x-4">
                    {[
                      { name: "Apple", url: "https://www.apple.com", icon: "🍎", bg: "bg-white" },
                      { name: "Google", url: "https://www.google.com/?igu=1", icon: "G", bg: "bg-white text-blue-500 font-bold" },
                      { name: "GitHub", url: "https://github.com", icon: "🐙", bg: "bg-white" },
                      { name: "YouTube", url: "https://www.youtube.com/embed/", icon: "▶️", bg: "bg-white text-red-500" },
                      { name: "Twitter", url: "https://twitter.com", icon: "🐦", bg: "bg-white" },
                      { name: "Wikipedia", url: "https://www.wikipedia.org", icon: "W", bg: "bg-white font-serif font-bold" },
                      { name: "LinkedIn", url: "https://www.linkedin.com", icon: "in", bg: "bg-white text-blue-700 font-bold" },
                      { name: "Netflix", url: "https://www.netflix.com", icon: "N", bg: "bg-white text-red-600 font-bold" }
                    ].map(bm => (
                      <button
                        key={bm.name}
                        onClick={() => loadBookmark(bm.url)}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className={`w-[60px] h-[60px] rounded-[18px] ${bm.bg} flex items-center justify-center text-2xl shadow-sm border border-gray-200/50 group-hover:shadow-md group-hover:scale-[1.05] transition-all duration-300 bg-white/70 backdrop-blur-md`}>
                          {bm.icon}
                        </div>
                        <span className="text-[11px] font-medium text-gray-700 drop-shadow-sm tracking-wide">{bm.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy Report */}
                <div className="mb-14 px-2">
                  <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-white/60 hover:bg-white/70 transition-colors cursor-default">
                    <IoShieldCheckmark className="text-4xl text-gray-700" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">Privacy Report</h3>
                      <p className="text-xs text-gray-600 mt-0.5">In the last seven days Safari has prevented 42 trackers from profiling you.</p>
                    </div>
                  </div>
                </div>

                {/* Reading List */}
                <div className="px-2">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Reading List</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {blogPosts && blogPosts.map(post => (
                      <div key={post.id} className="flex gap-4 p-4 bg-white/50 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 hover:bg-white/80 transition-all cursor-pointer group">
                        <img src={post.img || 'https://via.placeholder.com/150'} className="w-20 h-20 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300" alt="blog cover" />
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="font-semibold text-gray-800 text-[13px] leading-tight mb-1.5">{post.title}</h3>
                          <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">{post.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WindowWrapper(Safari, "safari");