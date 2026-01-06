import React from "react";
import WindowWrapper from "@hoc/WindowWrapper";
import useWindowStore from "@store/window";

const TxtFile = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  return (
    <div className="flex flex-col h-full bg-white text-gray-800 font-mono text-sm">
       <div className="p-6 whitespace-pre-wrap leading-relaxed outline-none h-full overflow-y-auto" contentEditable suppressContentEditableWarning>
         {data?.content || "No content loaded."}
       </div>
    </div>
  );
};

const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");
export default TxtFileWindow;