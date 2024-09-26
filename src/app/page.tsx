"use client";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [result, setResult] = useState<string>("");
  const [expression, setExpression] = useState<string>("");
  const [history, setHistory] = useState<
    { expression: string; result: string }[]
  >([]);

  const handleButtonClick = (value: string) => {
    // Validation logic
    if (value === "0") {
      if (expression.trim() === "" || expression === ".") return; // Prevent "0" at the beginning or after a dot
    }
    if (value === ".") {
      if (expression.trim() === "") {
        setExpression("0."); // If expression is empty, set it to "0."
        return;
      }
      if (expression.endsWith(".")) return; // Prevent multiple dots
    }

    if (value === "=") {
      if (expression.trim() === "") return; // Prevent evaluation of empty expression
      try {
        const evalResult = eval(expression).toString();
        setResult(evalResult);
        setHistory((prevHistory) => [
          ...prevHistory,
          { expression, result: evalResult },
        ]);
        setExpression(""); // Clear the input expression after calculating
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setResult("");
      setExpression("");
    } else if (value === "DEL") {
      setExpression((prevExpression) => prevExpression.slice(0, -1));
    } else {
      setExpression((prevExpression) => prevExpression + value);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    const validKeys = "0123456789+-*/.=C";

    if (validKeys.includes(key)) {
      event.preventDefault();
      if (key === "C") {
        handleButtonClick("C");
      } else if (key === "DEL") {
        handleButtonClick("DEL");
      } else {
        handleButtonClick(key);
      }
    } else if (key === "Backspace") {
      event.preventDefault();
      handleButtonClick("DEL");
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      handleButtonClick("=");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const buttons = [
    "C",
    "DEL",
    "/",
    "*",
    "9",
    "8",
    "7",
    "-",
    "6",
    "5",
    "4",
    "+",
    "3",
    "2",
    "1",
    "=",
    "0",
    ",",
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 items-center p-24">
      <h1 className="text-3xl font-bold mb-10">My Calculator</h1>
      <div className="flex space-x-4">
        {/* History Section */}
        <div className="bg-gray-200 p-4 rounded-lg shadow-lg w-1/4">
          <h2 className="text-2xl font-bold mb-2">History</h2>
          <ul className="list-disc pl-5 max-h-64 overflow-y-auto">
            {history.map((entry, index) => (
              <li key={index}>
                {entry.expression} = {entry.result}
              </li>
            ))}
          </ul>
        </div>

        {/* Calculator Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
          <input
            type="text"
            className="w-full mb-2 text-3xl border-b-2 border-gray-400 focus:outline-none"
            value={expression}
            readOnly
          />
          <input
            type="text"
            className="w-full text-4xl font-bold mb-4 focus:outline-none"
            value={result}
            readOnly
          />
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButtonClick(btn)}
                className="text-4xl bg-gray-300 hover:bg-gray-400 p-2 rounded-lg"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
