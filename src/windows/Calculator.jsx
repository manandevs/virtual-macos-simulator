import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const calculate = (a, b, operator) => {
      switch (operator) {
          case "+": return a + b;
          case "-": return a - b;
          case "×": return a * b;
          case "÷": return b !== 0 ? a / b : "Error";
          default: return b;
      }
  };

  const handleNum = (num) => {
    if (shouldResetDisplay) {
      setDisplay(num.toString());
      setShouldResetDisplay(false);
    } else {
      setDisplay(display === "0" ? num.toString() : display + num);
    }
  };

  const handleOp = (operator) => {
    const current = parseFloat(display);
    
    if (prev !== null && op && !shouldResetDisplay) {
        // Calculate intermediate result
        const result = calculate(prev, current, op);
        setDisplay(String(result));
        setPrev(result);
    } else {
        setPrev(current);
    }
    
    setOp(operator);
    setShouldResetDisplay(true);
  };

  const handleEquals = () => {
    if (prev === null || op === null) return;
    const current = parseFloat(display);
    const result = calculate(prev, current, op);
    setDisplay(String(result));
    setPrev(null);
    setOp(null);
    setShouldResetDisplay(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setShouldResetDisplay(false);
  };

  const toggleSign = () => {
      setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
      setDisplay(String(parseFloat(display) / 100));
  };

  // Styles
  const btnBase = "h-12 w-12 rounded-full font-medium text-lg transition-all active:scale-90 flex items-center justify-center select-none";
  const grayBtn = "bg-[#a5a5a5] text-black hover:bg-[#d4d4d2]";
  const orangeBtn = "bg-[#ff9f0a] text-white hover:bg-[#ffb340]";
  const darkBtn = "bg-[#333333] text-white hover:bg-[#737373]";
  const activeOp = "bg-white text-[#ff9f0a]"; // Style for active operator

  return (
    <div className="flex flex-col h-full bg-black p-4 items-center justify-end rounded-b-xl">
      <div className="w-full text-right text-white text-5xl font-light mb-4 px-2 truncate tracking-tight">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className={`${btnBase} ${grayBtn}`}>{display === "0" ? "AC" : "C"}</button>
        <button onClick={toggleSign} className={`${btnBase} ${grayBtn}`}>+/-</button>
        <button onClick={percentage} className={`${btnBase} ${grayBtn}`}>%</button>
        <button onClick={() => handleOp("÷")} className={`${btnBase} ${op === "÷" ? activeOp : orangeBtn}`}>÷</button>

        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNum(n)} className={`${btnBase} ${darkBtn}`}>{n}</button>)}
        <button onClick={() => handleOp("×")} className={`${btnBase} ${op === "×" ? activeOp : orangeBtn}`}>×</button>

        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNum(n)} className={`${btnBase} ${darkBtn}`}>{n}</button>)}
        <button onClick={() => handleOp("-")} className={`${btnBase} ${op === "-" ? activeOp : orangeBtn}`}>-</button>

        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNum(n)} className={`${btnBase} ${darkBtn}`}>{n}</button>)}
        <button onClick={() => handleOp("+")} className={`${btnBase} ${op === "+" ? activeOp : orangeBtn}`}>+</button>

        <button onClick={() => handleNum(0)} className={`${btnBase} ${darkBtn} col-span-2 w-auto rounded-full pl-6 !justify-start`}>0</button>
        <button onClick={() => setDisplay(display.includes(".") ? display : display + ".")} className={`${btnBase} ${darkBtn}`}>.</button>
        <button onClick={handleEquals} className={`${btnBase} ${orangeBtn}`}>=</button>
      </div>
    </div>
  );
};

export default WindowWrapper(Calculator, "calculator");