import { render, screen } from '@testing-library/react';
import StatsDisplay from './StatsDisplay';

test('displays correct stats values', () => {
  const stats = { mean: 1.23, median: 1.00, std: 0.45 };
  render(<StatsDisplay stats={stats} />);
  expect(screen.getByText(/Mean: 1\.23/)).toBeInTheDocument();
  expect(screen.getByText(/Median: 1\.00/)).toBeInTheDocument();
  expect(screen.getByText(/Standard Deviation: 0\.45/)).toBeInTheDocument();
});
