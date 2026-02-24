import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import { IoTrashOutline, IoRefreshOutline } from "react-icons/io5";

const initialTrash = [
  { id: 1, name: "Screenshot.png", meta: "Image • 2.4 MB" },
  { id: 2, name: "Resume.pdf", meta: "PDF • 312 KB" },
  { id: 3, name: "OldProject.zip", meta: "Archive • 18 MB" }
];

const Trash = () => {
  const [items, setItems] = useState(initialTrash);

  const clearTrash = () => setItems([]);
  const restoreItem = id =>
    setItems(items.filter(item => item.id !== id));

  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      {/* Header */}
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-gray-50">
        <div className="flex items-center gap-2">
          <IoTrashOutline className="text-gray-500" />
          <span className="text-sm font-medium">Trash</span>
        </div>

        <button
          onClick={clearTrash}
          className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
        >
          Empty Trash
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <IoTrashOutline size={48} />
            <p className="mt-2 text-sm">Trash is empty</p>
          </div>
        ) : (
          items.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-gray-400">{item.meta}</span>
              </div>

              <button
                onClick={() => restoreItem(item.id)}
                className="flex items-center gap-1 text-xs text-blue-500 hover:underline"
              >
                <IoRefreshOutline />
                Restore
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const TrashWindow = WindowWrapper(Trash, "trash");
export default TrashWindow;