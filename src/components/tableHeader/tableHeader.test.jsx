import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import TransactionTableHeader from './tableHeader';
import * as fetchDataModule from '../../api/fetchData';
import * as pointsUtil from '../../utils/calculatePoints';

vi.mock('antd', async () => {
  const antd = await vi.importActual('antd');
  return {
    ...antd,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('TransactionTableHeader', () => {
  const mockTransactions = [
    { id: 1, customerId: 1, amount: 120, date: '2025-04-15' },
    { id: 2, customerId: 2, amount: 80, date: '2025-05-20' },
    { id: 3, customerId: 1, amount: 200, date: '2025-06-10' },
  ];

  beforeEach(() => {
    // Mock fetchTransactions
    vi.spyOn(fetchDataModule, 'fetchTransactions').mockResolvedValue([
      ...mockTransactions,
    ]);
    // Mock calculateRewardPointsWithSlabs
    vi.spyOn(pointsUtil, 'calculateRewardPointsWithSlabs').mockImplementation(
      (amount) => amount
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // 1. Renders all form fields and button
  it('renders form fields and filter button', () => {
    render(
      <TransactionTableHeader
        filterTransactionsAndUpdateState={vi.fn()}
        setTransactionsLoader={vi.fn()}
      />
    );
    expect(screen.getByText(/filter transactions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/customers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date range/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
  });

  // 2. Calls filterTransactionsData and sets default values on mount
  it('calls filterTransactionsData and sets default form values on mount', async () => {
    const filterFn = vi.fn();
    const loaderFn = vi.fn();

    render(
      <TransactionTableHeader
        filterTransactionsAndUpdateState={filterFn}
        setTransactionsLoader={loaderFn}
      />
    );

    await waitFor(() => {
      expect(loaderFn).toHaveBeenCalledWith(true);
      expect(loaderFn).toHaveBeenCalledWith(false);
      expect(filterFn).toHaveBeenCalled();
    });

    expect(screen.getByText('Customer 1')).toBeInTheDocument();
  });

  // 3. Filters by customer only
  it('filters transactions by customer only', async () => {
    const filterFn = vi.fn();
    render(
      <TransactionTableHeader
        filterTransactionsAndUpdateState={filterFn}
        setTransactionsLoader={vi.fn()}
      />
    );

    // Select customer 2
    fireEvent.mouseDown(screen.getByLabelText(/customers/i));
    fireEvent.click(screen.getByText('Customer 2'));

    // Submit
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));

    await waitFor(() => {
      expect(filterFn).toHaveBeenCalledWith([
        expect.objectContaining({ customerId: 2 }),
      ]);
    });
  });
});
