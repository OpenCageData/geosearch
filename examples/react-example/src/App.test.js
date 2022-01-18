import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// eslint-disable-next-line jest/no-disabled-tests
test.skip('renders Opencage example', () => {
  render(<App />);
  const textElement = screen.getByText(/Opencage GeoSearch/i);
  expect(textElement).toBeInTheDocument();
});
