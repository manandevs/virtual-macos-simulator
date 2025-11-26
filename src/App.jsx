import React from "react";
import { Desktop, Toolbar, Dock } from "@components";
import { TerminalWindow } from "@windows";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Toolbar />
      <Desktop />
      <Dock />

      {/* Terminal Window is wrapped by WindowWrapper */}
      <TerminalWindow />
    </div>
  );
};

export default App;
