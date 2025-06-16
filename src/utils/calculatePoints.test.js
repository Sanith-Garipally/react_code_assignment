import { describe, it, expect } from 'vitest';
import { calculatePoints, calculateRewardPointsWithSlabs } from './calculatePoints'; // adjust the path as needed

describe('calculatePoints', () => {
  it('returns correct total points for positive points', () => {
    const data = [{ points: 10 }, { points: 20 }, { points: 5 }];
    expect(calculatePoints(data)).toBe(35);
  });

  it('returns 0 when all points are zero', () => {
    const data = [{ points: 0 }, { points: 0 }];
    expect(calculatePoints(data)).toBe(0);
  });

  it('returns 0 for empty array (negative case)', () => {
    expect(calculatePoints([])).toBe(0);
  });
});


describe('calculateRewardPointsWithSlabs', () => {
  it('calculates points correctly for amount > 100 (whole number)', () => {
    expect(calculateRewardPointsWithSlabs(120)).toBe(90);
  });

  it('calculates points correctly for amount between 50 and 100 (fraction)', () => {
    expect(calculateRewardPointsWithSlabs(75.5)).toBe(25);
  });

  it('returns 0 for amount <= 50 (negative case)', () => {
    expect(calculateRewardPointsWithSlabs(49.99)).toBe(0);
  });
});


