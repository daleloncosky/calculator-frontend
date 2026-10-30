import React, { useState } from 'react';
import handleCalculate from './utils/handleCalculate';
import './App.css';

export default function CalculatorApp() {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  async function calculate(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try { await handleCalculate(first, second, operation, setResult, setError); }
    finally { setLoading(false); }
  }
  return (
    <main className="calculator">
      <h1>Web Calculator</h1>
      <p>Arithmetic through a React interface and Python API.</p>
      <form onSubmit={calculate} aria-busy={loading}>
        <label htmlFor="first-number">First number</label>
        <input id="first-number" type="number" step="any" value={first} onChange={event => setFirst(event.target.value)} disabled={loading} required />
        <label htmlFor="operation">Operation</label>
        <select id="operation" value={operation} onChange={event => setOperation(event.target.value)} disabled={loading}>
          <option value="+">Add (+)</option><option value="-">Subtract (-)</option><option value="*">Multiply (×)</option><option value="/">Divide (÷)</option><option value="%">Modulo (%)</option><option value="**">Power (^)</option>
        </select>
        <label htmlFor="second-number">Second number</label>
        <input id="second-number" type="number" step="any" value={second} onChange={event => setSecond(event.target.value)} disabled={loading} required />
        <button type="submit" disabled={loading}>{loading ? 'Calculating…' : 'Calculate'}</button>
      </form>
      <output aria-live="polite">{result !== null && 'Result: ' + result}</output>
      {error && <p role="alert">{error}</p>}
      <small>Uses floating-point arithmetic. Operands are limited to ±1e12; powers require an integer exponent from -1000 to 1000.</small>
    </main>
  );
}
