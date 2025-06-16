import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RewardCard from './rewardCard';

describe('RewardCard', () => {
  // --- Positive test cases for transactions ---
  it('renders total points correctly for a valid transactions array', () => {
    render(
      <RewardCard
        transactions={[{ points: 10 }, { points: 20 }]}
        heading='Test Heading'
      />
    );
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText(/pts/i)).toBeInTheDocument();
  });

  it('renders 0 pts when transactions array is empty', () => {
    render(<RewardCard transactions={[]} heading='No Transactions' />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText(/pts/i)).toBeInTheDocument();
  });

  it('renders 0 pts when transactions is undefined', () => {
    render(<RewardCard heading='Undefined Transactions' />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // --- Positive/negative test cases for heading ---
  it('renders the correct heading', () => {
    render(<RewardCard transactions={[]} heading='Monthly Summary' />);
    expect(screen.getByText('Monthly Summary')).toBeInTheDocument();
  });

  it('renders an empty heading if heading is empty string', () => {
    render(<RewardCard transactions={[]} heading='' />);
    const heading = screen.getByTestId('reward-heading');
    expect(heading.textContent).toBe('');
  });

  it('renders nothing or default when heading is undefined', () => {
    render(<RewardCard transactions={[]} />);
    const heading = screen.getByTestId('reward-heading');
    expect(heading.textContent).toBe('');
  });
});
