import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { blogPosts } from "@constants";
import { 
  IoChevronBack, IoChevronForward, IoReload, IoShareOutline, 
  IoHomeOutline, IoSearch, IoLockClosed
} from "react-icons/io5";

const Safari = () => {
  const [url, setUrl] = useState("startpage");
  const [inputValue, setInputValue] = useState("startpage");
  const [iframeSrc, setIframeSrc] = useState(null);

  const handleNavigate = (e) => {
    e.preventDefault();
    if (inputValue === "startpage" || inputValue === "") {
        setIframeSrc(null);
        setUrl("startpage");
    } else if (inputValue.startsWith("http")) {
        setIframeSrc(inputValue);
        setUrl(inputValue);
    } else {
        // Mock search
        const searchUrl = `https://www.bing.com/search?q=${inputValue}`;
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
    <div className="flex flex-col h-full bg-white">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#f5f5f7] border-b border-gray-300">
        <div className="flex gap-2">
          <IoChevronBack className="text-gray-400" />
          <IoChevronForward className="text-gray-400" />
          <IoReload className="text-gray-600 cursor-pointer" onClick={() => setIframeSrc(iframeSrc)} />
        </div>

        <form onSubmit={handleNavigate} className="flex-1 flex items-center bg-white rounded-md px-3 py-1.5 shadow-sm border border-gray-300 focus-within:ring-2 ring-blue-400/50 transition-all">
          <IoLockClosed className="text-gray-400 text-xs mr-2" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            placeholder="Search or enter website name"
          />
        </form>

        <IoShareOutline className="text-gray-600" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-white relative">
        {iframeSrc ? (
            <iframe 
                src={iframeSrc} 
                title="browser" 
                className="w-full h-full border-none" 
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
        ) : (
            // Start Page
            <div className="h-full overflow-y-auto bg-[#fbfbfd]">
                <div className="max-w-4xl mx-auto py-16 px-8">
                    <div className="flex flex-col items-center mb-12">
                         <img src="/images/safari.png" className="w-20 h-20 mb-4 drop-shadow-md" alt="Safari" />
                         <h1 className="text-3xl font-bold text-gray-800">Favorites</h1>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                         {[
                             { name: "Apple", url: "https://www.apple.com", icon: "🍎", bg: "bg-gray-800" },
                             { name: "Bing", url: "https://www.bing.com", icon: "🔍", bg: "bg-blue-600" },
                             { name: "Wiki", url: "https://www.wikipedia.org", icon: "📚", bg: "bg-gray-200" },
                             { name: "News", url: "https://www.cnn.com", icon: "📰", bg: "bg-red-600" }
                         ].map(bm => (
                             <button key={bm.name} onClick={() => loadBookmark(bm.url)} className="flex flex-col items-center gap-2 group">
                                 <div className={`w-16 h-16 rounded-xl ${bm.bg} flex items-center justify-center text-3xl shadow-md group-hover:scale-105 transition-transform`}>
                                     {bm.icon}
                                 </div>
                                 <span className="text-sm font-medium text-gray-600">{bm.name}</span>
                             </button>
                         ))}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-6">Privacy Report</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogPosts.map(post => (
                            <div key={post.id} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                                <img src={post.img} className="w-24 h-16 object-cover rounded-lg" alt="" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 leading-tight">{post.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{post.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default WindowWrapper(Safari, "safari");