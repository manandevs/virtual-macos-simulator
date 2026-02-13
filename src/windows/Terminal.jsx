import React, { useEffect, useRef, useState } from "react";
import useWindowStore from "@store/window";
import WindowWrapper from "@hoc/WindowWrapper";

const Terminal = () => {
  const { openWindow, closeWindow } = useWindowStore();
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [lines, setLines] = useState([
    "Last login: " + new Date().toUTCString() + " on ttys000",
    "Welcome to Virtual macOS. Type 'help' for commands.",
  ]);
  
  // History State
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const pushLine = (text) => setLines((prev) => [...prev, text]);

  // Mock File System
  const fileStructure = {
    "~": ["Desktop", "Documents", "Downloads", "Pictures"],
    "Desktop": ["project_files", "wallpaper.jpg"],
    "Documents": ["resume.pdf", "notes.txt"],
    "Downloads": ["installer.dmg"],
  };

  const commands = {
    help: () => {
      pushLine("Available commands:");
      pushLine("  open <app>     - Open app (safari, finder, calculator...)");
      pushLine("  cd <dir>       - Change directory");
      pushLine("  ls             - List files");
      pushLine("  pwd            - Print working directory");
      pushLine("  clear          - Clear screen");
      pushLine("  whoami         - Current user");
      pushLine("  echo <text>    - Print text");
    },
    clear: () => setLines([]),
    whoami: () => pushLine("guest"),
    pwd: () => pushLine(cwd === "~" ? "/Users/guest" : `/Users/guest/${cwd}`),
    ls: () => {
        const dirContent = fileStructure[cwd] || [];
        if(dirContent.length > 0) {
            pushLine(dirContent.join("   "));
        } else {
            pushLine(""); // Empty line if empty dir
        }
    },
    echo: (args) => pushLine(args.join(" ")),
    cd: (args) => {
        if (!args.length || args[0] === "~") {
            setCwd("~");
            return;
        }
        if (args[0] === "..") {
            setCwd("~"); // Simple mock implementation: always back to root
            return;
        }
        
        const target = args[0];
        const currentContent = fileStructure[cwd] || [];
        if (cwd === "~" && currentContent.includes(target)) {
            setCwd(target);
        } else {
            pushLine(`cd: no such file or directory: ${target}`);
        }
    },
    open: (args) => {
      if (!args.length) return pushLine("Usage: open <app_name>");
      const appMap = {
        finder: "finder",
        safari: "safari",
        photos: "photos",
        contact: "contact",
        resume: "resume",
        terminal: "terminal",
        calculator: "calculator",
        trash: "trash"
      };
      const target = args[0].toLowerCase();
      if (appMap[target]) {
        openWindow(appMap[target]);
        pushLine(`Opening ${target}...`);
      } else {
        pushLine(`Application '${target}' not found.`);
      }
    },
    exit: () => closeWindow("terminal")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Update History
    const newHistory = [...history, input];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length); // Reset index to end
    
    pushLine(`guest@macbook ${cwd} % ${input}`);
    
    const parts = input.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      pushLine(`zsh: command not found: ${cmd}`);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) {
            const newIdx = historyIndex - 1;
            setHistoryIndex(newIdx);
            setInput(history[newIdx]);
        } else if (historyIndex === 0 && history.length > 0) {
            // Reached start
            setHistoryIndex(0);
            setInput(history[0]);
        }
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < history.length - 1) {
            const newIdx = historyIndex + 1;
            setHistoryIndex(newIdx);
            setInput(history[newIdx]);
        } else {
            setHistoryIndex(history.length);
            setInput("");
        }
    }
  };

  return (
    <div 
        className="flex flex-col w-full h-full bg-[#1e1e1e] text-white font-mono text-[13px] p-2 overflow-hidden" 
        onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar" ref={outputRef}>
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap mb-0.5 leading-snug opacity-90">{line}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 pb-1 shrink-0">
        <span className="text-[#32d74b] font-bold">➜</span>
        <span className="text-blue-400 font-bold">{cwd}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-white caret-gray-400 ml-1"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default WindowWrapper(Terminal, "terminal");