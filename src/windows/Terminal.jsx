import React, { useEffect, useRef, useState } from "react";
import useWindowStore from "@store/window";
import WindowWrapper from "@hoc/WindowWrapper";

const MOCK_FILES = ["README.md", "notes.txt", "app.log", "photos", "projects"];

const Terminal = () => {
  const { openWindow, closeWindow } = useWindowStore();
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "Welcome to virtual-macOS terminal. Type `help` to see available commands.",
  ]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);

  // Auto scroll
  useEffect(() => {
    outputRef.current &&
      (outputRef.current.scrollTop = outputRef.current.scrollHeight);
  }, [lines]);

  // Autofocus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const pushLine = (text) => setLines((prev) => [...prev, text]);

  const commands = {
    help: () => {
      pushLine("Available commands:");
      pushLine("  help         - show this help");
      pushLine("  clear        - clear the terminal");
      pushLine("  echo <text>  - echo text");
      pushLine("  date         - show current date/time");
      pushLine("  ls           - list files");
      pushLine("  pwd          - show current directory");
      pushLine("  whoami       - current user");
      pushLine("  open <appId> - open another window");
    },
    clear: () => setLines([]),
    echo: (args) => pushLine(args.join(" ")),
    date: () => pushLine(new Date().toString()),
    ls: () => pushLine(MOCK_FILES.join("  ")),
    pwd: () => pushLine("/home/user"),
    whoami: () => pushLine("user"),
    open: (args) => {
      if (!args.length) return pushLine("Usage: open <appId>");
      const appId = args[0];
      openWindow(appId);
      pushLine(`Opening '${appId}'...`);
    },
  };

  const runCommand = (cmdLine) => {
    const trimmed = cmdLine.trim();
    if (!trimmed) return;

    pushLine(`$ ${trimmed}`);
    const [cmd, ...args] = trimmed.split(/\s+/);

    commands[cmd] ? commands[cmd](args) : pushLine(`command not found: ${cmd}`);
  };

  const onClose = () => closeWindow("terminal");

  const handleSubmit = () => {
    if (!input.trim()) return setInput("");

    setHistory((h) => [...h, input]);
    setHistoryIndex(null);
    runCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }

    // Up/Down history
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIndex === null
        ? history.length - 1
        : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] || "");
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return setInput("");
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    }

    // Ctrl+L
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      commands.clear();
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100%-40px)] bg-neutral-900 text-neutral-100 font-mono">
      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.length === 0 && (
          <div className="text-neutral-600 italic">[terminal cleared]</div>
        )}
        {lines.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
      </div>

      {/* Terminal Input */}
      <div className="px-4 py-2 border-t border-neutral-800 flex items-center gap-3">
        <span className="text-sm text-neutral-400">user@virtual:$</span>

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-sm caret-white"
          placeholder="Type a command..."
          spellCheck={false}
        />

        <button
          onClick={handleSubmit}
          className="px-3 py-1 text-xs bg-neutral-700 rounded hover:bg-neutral-600"
        >
          Run
        </button>
      </div>

    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");
export default TerminalWindow;
