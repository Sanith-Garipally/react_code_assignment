export const fetchTransactions = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      //   Simulate error randomly

    //   reject(new Error('Failed to fetch transactions'));
      resolve([
        // customerId, transactionId, amount, date (YYYY-MM-DD)
        { customerId: 1, transactionId: 101, amount: 120, date: '2025-06-10' },
        { customerId: 1, transactionId: 102, amount: 75.5, date: '2025-05-15' },
        { customerId: 1, transactionId: 103, amount: 200, date: '2025-04-20' },
        {
          customerId: 2,
          transactionId: 201,
          amount: 99.99,
          date: '2025-06-12',
        },
        { customerId: 2, transactionId: 202, amount: 150, date: '2025-05-18' },
        {
          customerId: 3,
          transactionId: 301,
          amount: 49.99,
          date: '2025-04-25',
        },
        { customerId: 3, transactionId: 302, amount: 110, date: '2025-05-05' },
        // Add more for pagination
        ...Array.from({ length: 30 }, (_, i) => ({
          customerId: 1,
          transactionId: 104 + i,
          amount: 60 + i,
          date: `2025-06-${(i % 28) + 1}`,
        })),
      ]);
    }, 2000);
  });
