import { useCallback, useState } from 'react';
import { Table, Typography } from 'antd';
import TransactionTableHeader from './TableHeader';
const { Text } = Typography;
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
  },
];

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoader, setTransactionsLoader] = useState(false);

  const filterTransactionsAndUpdateState = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey={(obj) => obj.transactionId}
        size='small'
        loading={transactionsLoader}
        title={() => (
          <TransactionTableHeader
            filterTransactionsAndUpdateState={filterTransactionsAndUpdateState}
            setTransactionsLoader={setTransactionsLoader}
          />
        )}
        summary={() => {
          const total = transactions.reduce(
            (pre, cur) => {
              pre.points += cur.points;
              return pre;
            },
            { points: 0 }
          );
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell></Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text>Total</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type='success'>{total.points}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </>
  );
};

export default TransactionsTable;
