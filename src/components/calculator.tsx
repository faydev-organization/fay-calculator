// components/Calculator.js
"use client";
import { useState, useEffect } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");

  const handleClick = (value: any) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  // Menangani event keydown
  const handleKeyDown = (event: any) => {
    const key = event.key;
    if (/[0-9/*+-]/.test(key)) {
      handleClick(key);
    } else if (key === "Enter") {
      handleCalculate();
    } else if (key === "Backspace") {
      handleClear();
    } else if (key === "Escape") {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
        <div className="text-right text-2xl mb-4">{input}</div>
        <div className="grid grid-cols-4 gap-4">
          {["7", "8", "9", "/"].map((item) => (
            <button
              key={item}
              className="bg-gray-700 text-white p-2 rounded-lg"
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
          {["4", "5", "6", "*"].map((item) => (
            <button
              key={item}
              className="bg-gray-700 text-white p-2 rounded-lg"
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
          {["1", "2", "3", "-"].map((item) => (
            <button
              key={item}
              className="bg-gray-700 text-white p-2 rounded-lg"
              onClick={() => handleClick(item)}
            >
              {item}
            </button>
          ))}
          {["0", ".", "=", "+"].map((item) => (
            <button
              key={item}
              className="bg-gray-700 text-white p-2 rounded-lg"
              onClick={item === "=" ? handleCalculate : () => handleClick(item)}
            >
              {item}
            </button>
          ))}
          <button
            className="col-span-4 bg-red-600 text-white p-2 rounded-lg"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
