import axios from 'axios';
const API_BASE = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:5001' : 'https://calculator2.hypsster.com')).replace(/\/$/, '');

export default async function handleCalculate(firstNumber, secondNumber, operation, setResult, setError) {
  setResult(null);
  setError(null);
  const first = Number(firstNumber);
  const second = Number(secondNumber);
  if (!String(firstNumber).trim() || !String(secondNumber).trim() || !Number.isFinite(first) || !Number.isFinite(second)) {
    setError('Please enter two finite numbers.');
    return;
  }
  try {
    const response = await axios.post(API_BASE + '/calculate', { first_number: first, second_number: second, operation }, { timeout: 10000 });
    if (response.data.error) {
      setError(response.data.error);
    } else if (typeof response.data.result === 'number' && Number.isFinite(response.data.result)) {
      setResult(response.data.result);
    } else {
      setError('The service returned an invalid result.');
    }
  } catch (error) {
    setError(error.response?.data?.error || 'Unable to reach the calculator service. Try again.');
  }
}
