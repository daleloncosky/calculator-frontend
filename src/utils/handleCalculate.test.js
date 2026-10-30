import { beforeEach, expect, it, vi } from 'vitest';
import axios from 'axios';
import handleCalculate from './handleCalculate';
vi.mock('axios');
beforeEach(() => vi.resetAllMocks());

it('rejects empty or non-finite values before sending a request', async () => {
  for (const value of ['', ' ', 'Infinity', 'abc']) {
    const result = vi.fn();
    const error = vi.fn();
    await handleCalculate(value, '1', '+', result, error);
    expect(error).toHaveBeenLastCalledWith('Please enter two finite numbers.');
  }
  expect(axios.post).not.toHaveBeenCalled();
});

it('rejects malformed service responses', async () => {
  axios.post.mockResolvedValue({ data: { result: 'unexpected' } });
  const result = vi.fn();
  const error = vi.fn();
  await handleCalculate('1', '2', '+', result, error);
  expect(result).toHaveBeenCalledWith(null);
  expect(error).toHaveBeenLastCalledWith('The service returned an invalid result.');
});
