import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Opencage example', () => {
  render(<App />);
  const textElement = screen.getByText(/Opencage GeoSearch/i);
  expect(textElement).toBeInTheDocument();
});
