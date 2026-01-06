import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { gallery, photosLinks } from "@constants";
import {
  IoGridOutline,
  IoAlbumsOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoTimeOutline,
  IoHeartOutline,
  IoHeart,
  IoShareOutline,
  IoChevronDown,
  IoSearch,
  IoAdd,
  IoPlay,
  IoInformationCircleOutline
} from "react-icons/io5";

const Albums = [
  { id: 1, name: "Vacation 2024", count: 48, cover: gallery[0].src, date: "Last month" },
  { id: 2, name: "Family Photos", count: 156, cover: gallery[1].src, date: "2 months ago" },
  { id: 3, name: "Nature Walks", count: 89, cover: gallery[2].src, date: "3 months ago" },
  { id: 4, name: "Work Events", count: 23, cover: gallery[3].src, date: "Yesterday" },
  { id: 5, name: "Personal Favorites", count: 67, cover: gallery[4].src, date: "Last week" },
];

const Memories = [
  { id: 1, title: "Best of 2024", description: "Your year in photos", count: 156, cover: gallery[5].src },
  { id: 2, title: "Trip to Hawaii", description: "Aloha memories", count: 89, cover: gallery[6].src },
  { id: 3, title: "Birthday Celebration", description: "Special moments", count: 45, cover: gallery[7].src },
];

const Photos = () => {
  const [activeSection, setActiveSection] = useState("library");
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [favorites, setFavorites] = useState([2, 5, 7]);

  const toggleFavorite = (photoId) => {
    setFavorites(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const toggleSelectPhoto = (photoId) => {
    setSelectedPhotos(prev =>
      prev.includes(photoId)
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const getPhotoIcon = (section) => {
    switch(section) {
      case "library": return IoGridOutline;
      case "memories": return IoAlbumsOutline;
      case "people": return IoPersonOutline;
      case "places": return IoLocationOutline;
      case "recents": return IoTimeOutline;
      default: return IoGridOutline;
    }
  };

  return (
    <div className="flex h-full w-full bg-white">
      {/* Sidebar */}
      <div className="w-60 flex-shrink-0 bg-gray-50/80 border-r border-gray-200 flex flex-col p-4">
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Photos</h2>
          <p className="text-xs text-gray-500">1,245 items • 45.2 GB</p>
        </div>

        <nav className="space-y-1">
          {photosLinks.map((link) => {
            const Icon = getPhotoIcon(link.id);
            return (
              <button
                key={link.id}
                onClick={() => setActiveSection(link.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full transition-colors ${
                  activeSection === link.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="text-lg" />
                <span className="text-sm font-medium">{link.name}</span>
                {link.id === "recents" && (
                  <span className="ml-auto text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                    324
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-8">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">My Albums</h3>
          <div className="space-y-2">
            {Albums.slice(0, 3).map(album => (
              <button
                key={album.id}
                className="flex items-center gap-3 px-2 py-2 rounded-lg w-full hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                  <img src={album.cover} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{album.name}</p>
                  <p className="text-xs text-gray-500">{album.count} photos</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white/80">
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === "grid" 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === "list" 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                List
              </button>
            </div>
            
            {selectedPhotos.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-700">{selectedPhotos.length} selected</span>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Share
                </button>
                <button className="text-sm text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <IoSearch className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <IoAdd className="text-gray-600" />
            </button>
            <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              Import
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === "library" && (
            <>
              {/* Memories Section */}
              {activeSection === "library" && (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Memories</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      <IoPlay className="inline mr-1" />
                      Play All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Memories.map(memory => (
                      <div key={memory.id} className="group relative rounded-xl overflow-hidden cursor-pointer">
                        <div className="aspect-video relative">
                          <img 
                            src={memory.cover} 
                            alt={memory.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h4 className="font-bold text-lg">{memory.title}</h4>
                            <p className="text-sm opacity-90">{memory.description}</p>
                            <p className="text-xs mt-1">{memory.count} photos</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Albums Grid */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Albums</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {Albums.map(album => (
                    <div key={album.id} className="group cursor-pointer">
                      <div className="aspect-square rounded-xl overflow-hidden mb-2 relative">
                        <img 
                          src={album.cover} 
                          alt={album.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {album.count}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 truncate">{album.name}</h4>
                        <p className="text-xs text-gray-500">{album.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photos Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">All Photos</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <IoChevronDown className="text-xs" />
                    <span>Sorted by Date</span>
                  </div>
                </div>
                
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                    {gallery.map((photo, index) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                        onClick={() => toggleSelectPhoto(photo.id)}
                      >
                        <img 
                          src={photo.src} 
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        
                        {/* Selection Overlay */}
                        {selectedPhotos.includes(photo.id) && (
                          <div className="absolute inset-0 bg-blue-500/20 border-2 border-blue-500" />
                        )}
                        
                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(photo.id);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full backdrop-blur-sm hover:bg-black/60 transition-colors"
                        >
                          {favorites.includes(photo.id) ? (
                            <IoHeart className="text-red-500" />
                          ) : (
                            <IoHeartOutline className="text-white" />
                          )}
                        </button>
                        
                        {/* Selection Checkbox */}
                        {selectedPhotos.includes(photo.id) && (
                          <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                        
                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                            <button className="p-1.5 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white">
                              <IoShareOutline className="text-gray-700" />
                            </button>
                            <button className="p-1.5 bg-white/90 rounded-full backdrop-blur-sm hover:bg-white">
                              <IoInformationCircleOutline className="text-gray-700" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-2">
                    {gallery.map((photo, index) => (
                      <div
                        key={photo.id}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200"
                        onClick={() => toggleSelectPhoto(photo.id)}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={photo.src} 
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">Photo_{index + 1}.jpg</p>
                          <p className="text-sm text-gray-500">JPEG • 2.4 MB • Today</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(photo.id);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            {favorites.includes(photo.id) ? (
                              <IoHeart className="text-red-500" />
                            ) : (
                              <IoHeartOutline className="text-gray-400" />
                            )}
                          </button>
                          {selectedPhotos.includes(photo.id) && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;