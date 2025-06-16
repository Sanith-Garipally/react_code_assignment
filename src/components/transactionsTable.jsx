import { useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import TransactionTableHeader from './tableHeader/tableHeader';
import { Section, StyledTable } from '../styles/globalStyles';
import RewardsSummary from './rewardsSummary';
import styled from 'styled-components';
import RewardCard from './rewardCard/rewardCard';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f6f8fb;
  min-height: 70vh;
`;

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
      <Section>
        <TransactionTableHeader
          filterTransactionsAndUpdateState={filterTransactionsAndUpdateState}
          setTransactionsLoader={setTransactionsLoader}
        />
      </Section>
      <Row justify={"space-between"}>
        <Col span={4}>
          <RewardCard transactions={transactions} heading={'Rewards'} />
        </Col>
        <Col span={19}>
          <Tabs
            defaultActiveKey='1'
            items={[
              {
                key: '1',
                label: 'Monthly Rewards Summary',
                children: (
                  <Section>
                    <RewardsSummary
                      transactions={transactions}
                      transactionsLoader={transactionsLoader}
                    />
                  </Section>
                ),
              },
              {
                key: '2',
                label: 'Transaction Details',
                children: (
                  <StyledTable
                    columns={columns}
                    dataSource={transactions}
                    rowKey={(obj) => obj.transactionId}
                    size='small'
                    loading={transactionsLoader}
                    style={{ width: '100%' }}
                    scroll={{
                      y: '320px',
                      x: 'max-content',
                    }}
                  />
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </>
  );
};

export default TransactionsTable;
