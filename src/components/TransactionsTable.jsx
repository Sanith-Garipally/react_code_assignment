import { useState } from 'react';
import { Card, Tabs } from 'antd';
import TransactionTableHeader from './TableHeader';
import { Section, StyledTable } from '../styles/globalStyles';
import RewardsSummary from './RewardsSummary';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f6f8fb;
  min-height: 70vh;
`;

// Styled for the points
const Points = styled.span`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1677ff; /* Ant Design primary blue */
  letter-spacing: 1px;
`;

const SectionWrapper = styled.div`
  padding: 32px 24px 24px 24px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.04);
  min-width: 300px;
`;
// Styled heading
const StyledHeading = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  color: #1d3557;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
`;

const StyledSpan = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const RewardCard = ({ transactions }) => {
  const total = transactions.reduce(
    (pre, cur) => {
      pre.points += cur.points;
      return pre;
    },
    { points: 0 }
  );
  return (
    <Card
      style={{
        maxWidth: 340,
        borderRadius: 12,
        boxShadow: '0 2px 8px #f0f1f2',
      }}
    >
      <Points>
        {total.points} <StyledSpan>pts</StyledSpan>
      </Points>
    </Card>
  );
};

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

      <FlexContainer>
        <SectionWrapper>
          <StyledHeading>Rewards</StyledHeading>
          <RewardCard transactions={transactions} />
        </SectionWrapper>
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
                />
              ),
            },
          ]}
        />
      </FlexContainer>
    </>
  );
};

export default TransactionsTable;
