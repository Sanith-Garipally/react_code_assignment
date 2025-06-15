import transactions from '../lib/transactions.json';

export const fetchTransactions = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      //   Simulate error randomly
      //   reject(new Error('Failed to fetch transactions'));
      resolve(transactions);
    }, 2000);
  });
