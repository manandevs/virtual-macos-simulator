import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { blogPosts } from "@constants";
import { 
  IoChevronBack, IoChevronForward, IoReload, IoShareOutline, 
  IoHomeOutline, IoSearch, IoEllipsisHorizontal,
  IoLockClosed, IoGlobeOutline
} from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";

const Safari = () => {
  const [url, setUrl] = useState("https://www.apple.com/startpage");
  const [bookmarks, setBookmarks] = useState([
    { name: "Apple", url: "https://apple.com", icon: "🍎" },
    { name: "iCloud", url: "https://icloud.com", icon: "☁️" },
    { name: "Wikipedia", url: "https://wikipedia.org", icon: "📖" },
    { name: "News", url: "https://news.com", icon: "📰" },
  ]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Browser Bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100/80 border-b border-gray-200">
        <div className="flex gap-1">
          <button className="p-2 rounded-full hover:bg-gray-300/50 transition-colors">
            <IoChevronBack className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-300/50 transition-colors">
            <IoChevronForward className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-300/50 transition-colors">
            <IoReload className="text-gray-600" />
          </button>
        </div>

        {/* URL Bar */}
        <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2 mx-2 shadow-sm border border-gray-300">
          <IoLockClosed className="text-green-500 mr-2" />
          <IoGlobeOutline className="text-gray-400 mr-2" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button className="p-1 hover:bg-gray-100 rounded">
            <IoSearch className="text-gray-500" />
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-300/50 rounded-full transition-colors">
            <IoShareOutline className="text-gray-600" />
          </button>
          <button 
            onClick={() => setBookmarks(prev => [...prev, { name: "New Bookmark", url, icon: "⭐" }])}
            className="p-2 hover:bg-gray-300/50 rounded-full transition-colors"
          >
            <FiBookmark className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-300/50 rounded-full transition-colors">
            <IoEllipsisHorizontal className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50/50 hidden md:flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
          <IoHomeOutline className="text-gray-600" />
          <span className="text-sm">Favorites</span>
        </button>
        {bookmarks.map((bookmark, idx) => (
          <button
            key={idx}
            onClick={() => setUrl(bookmark.url)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white transition-colors"
          >
            <span>{bookmark.icon}</span>
            <span className="text-sm text-gray-700">{bookmark.name}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 p-8 text-center min-h-full">
          <div className="max-w-5xl mx-auto pt-10">
            <img src="/icons/search.svg" className="w-16 h-16 mx-auto mb-6 opacity-20" alt="logo" />
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Start Page</h1>
            
            {/* Quick Links / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow text-left">
                        <div className="h-40 overflow-hidden">
                             <img src={post.img} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"/>
                        </div>
                        <div className="p-5">
                            <span className="text-xs text-blue-500 font-bold uppercase tracking-wide">News</span>
                            <h3 className="font-bold text-gray-900 mt-2 mb-2">{post.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2">{post.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-gray-400 text-sm">
                <p>Privacy Report: 0 trackers prevented</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;