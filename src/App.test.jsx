import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import axios from 'axios';
import App from './App.jsx';
vi.mock('axios');
beforeEach(() => vi.resetAllMocks());

it('submits decimal inputs and renders the API result', async () => {
  axios.post.mockResolvedValue({ data: { result: 3.75 } });
  render(<App />);
  fireEvent.change(screen.getByLabelText('First number'), { target: { value: '1.5' } });
  fireEvent.change(screen.getByLabelText('Second number'), { target: { value: '2.25' } });
  fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Result: 3.75'));
  expect(axios.post).toHaveBeenCalledWith('http://localhost:5001/calculate', { first_number: 1.5, second_number: 2.25, operation: '+' }, { timeout: 10000 });
});

it('clears a previous result when the next calculation fails', async () => {
  axios.post.mockResolvedValueOnce({ data: { result: 2 } }).mockRejectedValueOnce({ response: { data: { error: 'Division or modulo by zero is not allowed.' } } });
  render(<App />);
  fireEvent.change(screen.getByLabelText('First number'), { target: { value: '1' } });
  fireEvent.change(screen.getByLabelText('Second number'), { target: { value: '1' } });
  fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Result: 2'));
  fireEvent.change(screen.getByLabelText('Operation'), { target: { value: '/' } });
  fireEvent.change(screen.getByLabelText('Second number'), { target: { value: '0' } });
  fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('zero'));
  expect(screen.getByRole('status')).not.toHaveTextContent('Result: 2');
});
