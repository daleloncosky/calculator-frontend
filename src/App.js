import React, { useState } from "react";
import axios from "axios";

function App() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    setError(null); // Reset error message

    try {
      const response = await axios.post("hhttps://calculator-oxw4.onrender.com/app", {
        first_number: firstNumber,
        second_number: secondNumber,
        operation: operation,
      });

      if (response.data.error) {
        setError(response.data.error);
        setResult(null);
      } else {
        setResult(response.data.result);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setResult(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Web Calculator</h1>

      <input
        type="number"
        value={firstNumber}
        onChange={(e) => setFirstNumber(e.target.value)}
        placeholder="First Number"
      />

      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">×</option>
        <option value="/">÷</option>
        <option value="%">%</option>
        <option value="**">^</option>
      </select>

      <input
        type="number"
        value={secondNumber}
        onChange={(e) => setSecondNumber(e.target.value)}
        placeholder="Second Number"
      />

      <button onClick={handleCalculate}>Calculate</button>

      {result !== null && <h2>Result: {result}</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}
    </div>
  );
}

export default App;
