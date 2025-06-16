import { useState } from 'react';
import { Button, Card, Drawer } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { StyledTable } from '../styles/globalStyles';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Styled container for the two sections
const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Styled for the points
const Points = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1677ff; /* Ant Design primary blue */
  letter-spacing: 1px;
`;

// Styled for the month/year
const MonthYear = styled.span`
  font-size: 1.1rem;
  color: #64748b;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const SectionWrapper = styled.div`
  background: #f6f8fb;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(22, 119, 255, 0.04);
`;
// Styled heading
const StyledHeading = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  color: #1d3557;
  letter-spacing: 0.5px;
`;

const RewardCard = ({ points, month, year }) => (
  <Card
    style={{ maxWidth: 340, borderRadius: 12, boxShadow: '0 2px 8px #f0f1f2' }}
  >
    <FlexContainer>
      <Points>{points} pts</Points>
      <MonthYear>
        {month} {year}
      </MonthYear>
    </FlexContainer>
  </Card>
);

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

export default function RewardsSummary({ transactions, transactionsLoader }) {
  const [open, setOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const monthlyMap = {};

  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // e.g., "07"
    let monthLabel = '';
    switch (month) {
      case '01':
        monthLabel = 'January';
        break;
      case '02':
        monthLabel = 'February';
        break;
      case '03':
        monthLabel = 'March';
        break;
      case '04':
        monthLabel = 'April';
        break;
      case '05':
        monthLabel = 'May';
        break;
      case '06':
        monthLabel = 'June';
        break;
      case '07':
        monthLabel = 'July';
        break;
      case '08':
        monthLabel = 'August';
        break;
      case '09':
        monthLabel = 'September';
        break;
      case '10':
        monthLabel = 'October';
        break;
      case '11':
        monthLabel = 'November';
        break;
      case '12':
        monthLabel = 'December';
        break;
      default:
        monthLabel = '';
        break;
    }

    const key = `${year}-${month}`;
    const points = txn.points;

    if (!monthlyMap[key]) {
      monthlyMap[key] = {
        month,
        monthLabel,
        year,
        points: 0,
        transactions: [],
      };
    }
    monthlyMap[key].points += points;
    monthlyMap[key].transactions.push({ ...txn, points });
  });

  const months = Object.values(monthlyMap).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  const summaryColumns = [
    {
      title: 'Month',
      dataIndex: 'monthLabel',
      key: 'monthLabel',
      ellipsis: true,
      sorter: (a, b) => a.month - b.month,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      ellipsis: true,
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      ellipsis: true,
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: 'View Transactions',
      dataIndex: 'view',
      key: 'view',
      render: (_, record) => {
        return (
          <Button
            size='small'
            icon={<EyeOutlined />}
            onClick={() => {
              setCurrentRecord(record);
              setOpen(true);
            }}
          />
        );
      },
    },
  ];

  return (
    <Card>
      <StyledTable
        size='small'
        columns={summaryColumns}
        dataSource={months}
        loading={transactionsLoader}
        rowKey={(obj) => obj.month + obj.year}
      />
      <Drawer
        width={940}
        placement='right'
        closable={false}
        open={open}
        onClose={() => {
          setOpen(false);
          setCurrentRecord({});
        }}
      >
        <SectionWrapper>
          <StyledHeading>Transactions</StyledHeading>
          <RewardCard
            points={currentRecord.points}
            month={currentRecord.monthLabel}
            year={currentRecord.year}
          />
        </SectionWrapper>
        <StyledTable
          size='small'
          columns={columns}
          dataSource={currentRecord.transactions || []}
          rowKey={(obj) => obj.transactionId}
          scroll={{
            y: '320px',
          }}
        />
      </Drawer>
    </Card>
  );
}

RewardsSummary.propTypes = {
  transactions: PropTypes.array.isRequired,
  transactionsLoader: PropTypes.bool.isRequired
}