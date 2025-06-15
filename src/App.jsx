import { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import { GlobalStyle } from './styles/globalStyles';
import { fetchTransactions } from './api/fetchData';

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
    key: 'transactionId',
    ellipsis: true,
    sorter: (a, b) => a.transactionId - b.transactionId,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    ellipsis: true,
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: 'Amount ($)',
    dataIndex: 'amount',
    key: 'amount',
    ellipsis: true,
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Reward Points',
    dataIndex: 'points',
    key: 'points',
    ellipsis: true,
    sorter: (a, b) => a.points - b.points,
    render: (_, record) => {
      let points = 0;
      const { amount } = record;
      if (amount > 100) {
        points += 2 * (amount - 100) + 50; // 2 points over $100, plus 1 point for $50-$100
      } else if (amount > 50) {
        points += amount - 50;
      }
      return Math.floor(points);
    },
  },
];

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoader, setTransactionsLoader] = useState([]);

  const getTransactions = async () => {
    try {
      setTransactionsLoader(true);
      const res = await fetchTransactions();
      setTransactions(res);
    } catch (error) {
      message.error(error.message || "Something went wrong while fetching transactions!")
    } finally {
      setTransactionsLoader(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey={(obj) => obj.transactionId}
        size='small'
        loading={transactionsLoader}
      />
    </>
  );
};

export default App;
