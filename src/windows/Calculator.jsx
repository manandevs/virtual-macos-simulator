import React, { useState } from "react";
import WindowWrapper from "@hoc/WindowWrapper";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState(null);
  const [op, setOp] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNum = (num) => {
    if (newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num.toString() : display + num);
    }
  };

  const handleOp = (operator) => {
    setOp(operator);
    setPrev(parseFloat(display));
    setNewNumber(true);
  };

  const calculate = () => {
    if (prev === null || op === null) return;
    const current = parseFloat(display);
    let result = 0;
    switch (op) {
      case "+": result = prev + current; break;
      case "-": result = prev - current; break;
      case "×": result = prev * current; break;
      case "÷": result = prev / current; break;
    }
    setDisplay(result.toString());
    setPrev(null);
    setOp(null);
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setNewNumber(true);
  };

  const btnClass = "h-12 w-12 rounded-full font-medium text-lg transition-colors active:scale-95 flex items-center justify-center select-none";
  const grayBtn = "bg-gray-300 text-black hover:bg-gray-400";
  const orangeBtn = "bg-orange-500 text-white hover:bg-orange-600";
  const darkBtn = "bg-gray-700 text-white hover:bg-gray-600";

  return (
    <div className="flex flex-col h-full bg-black p-4 items-center justify-center">
      <div className="w-full text-right text-white text-5xl font-light mb-4 px-2 truncate">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className={`${btnClass} ${grayBtn}`}>AC</button>
        <button onClick={() => setDisplay((parseFloat(display) * -1).toString())} className={`${btnClass} ${grayBtn}`}>+/-</button>
        <button onClick={() => setDisplay((parseFloat(display) / 100).toString())} className={`${btnClass} ${grayBtn}`}>%</button>
        <button onClick={() => handleOp("÷")} className={`${btnClass} ${orangeBtn}`}>÷</button>

        {[7, 8, 9].map(n => <button key={n} onClick={() => handleNum(n)} className={`${btnClass} ${darkBtn}`}>{n}</button>)}
        <button onClick={() => handleOp("×")} className={`${btnClass} ${orangeBtn}`}>×</button>

        {[4, 5, 6].map(n => <button key={n} onClick={() => handleNum(n)} className={`${btnClass} ${darkBtn}`}>{n}</button>)}
        <button onClick={() => handleOp("-")} className={`${btnClass} ${orangeBtn}`}>-</button>

        {[1, 2, 3].map(n => <button key={n} onClick={() => handleNum(n)} className={`${btnClass} ${darkBtn}`}>{n}</button>)}
        <button onClick={() => handleOp("+")} className={`${btnClass} ${orangeBtn}`}>+</button>

        <button onClick={() => handleNum(0)} className={`${btnClass} ${darkBtn} col-span-2 w-auto rounded-2xl`}>0</button>
        <button onClick={() => setDisplay(display + ".")} className={`${btnClass} ${darkBtn}`}>.</button>
        <button onClick={calculate} className={`${btnClass} ${orangeBtn}`}>=</button>
      </div>
    </div>
  );
};

export default WindowWrapper(Calculator, "calculator");