// src/windows/ImgFile.jsx
import React from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

const ImgFile = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return <div className="p-4">No image loaded</div>;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
        <div className="h-full w-full flex items-center justify-center p-4">
            <img 
                src={data.imageUrl} 
                alt={data.name} 
                className="max-w-full max-h-full object-contain shadow-2xl" 
            />
        </div>
    </div>
  );
};

const ImgFileWindow = WindowWrapper(ImgFile, "imgfile");
export default ImgFileWindow;