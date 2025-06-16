import { useEffect } from 'react';
import { Form, Select, Button, DatePicker, message, Card } from 'antd';
import customersData from '../lib/customersData.json';
import { fetchTransactions } from '../api/fetchData';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { calculateRewardPointsWithSlabs } from '../utils/calculatePoints';
import PropTypes from 'prop-types';
const { RangePicker } = DatePicker;
dayjs.extend(isBetween);

const TransactionTableHeader = ({
  filterTransactionsAndUpdateState,
  setTransactionsLoader,
}) => {
  const [form] = Form.useForm();

  const filterTransactionsData = async (values) => {
    try {
      setTransactionsLoader(true);
      const { customers, months } = values;

      let data = await fetchTransactions();
      data = data.map((obj) => {
        const { amount } = obj;
        const earnedPoints = calculateRewardPointsWithSlabs(amount);
        return { ...obj, points: earnedPoints };
      });
      let startRange = '';
      let endRange = '';
      let updatedState = data;

      if (!customers && !months) {
        updatedState = data;
      } else if (customers && !months) {
        updatedState = data.filter((obj) => obj.customerId === customers);
      } else if (!customers && months) {
        startRange = dayjs(dayjs(months[0], 'YYYY-MM').startOf('month')).format(
          'YYYY-MM-DD'
        );
        endRange = dayjs(months[1], 'YYYY-MM').format('YYYY-MM-DD');
        updatedState = data.filter((obj) =>
          dayjs(obj.date).isBetween(startRange, endRange, 'day', '[]')
        );
      } else {
        startRange = dayjs(dayjs(months[0], 'YYYY-MM').startOf('month')).format(
          'YYYY-MM-DD'
        );
        endRange = dayjs(months[1], 'YYYY-MM').format('YYYY-MM-DD');
        updatedState = data.filter((obj) =>
          dayjs(obj.date).isBetween(startRange, endRange, 'day', '[]')
        );
        updatedState = data.filter(
          (obj) =>
            obj.customerId === customers &&
            dayjs(obj.date).isBetween(startRange, endRange, 'day', '[]')
        );
      }

      filterTransactionsAndUpdateState(updatedState);
      message.success('Transactions Fetched Successfully');
    } catch (error) {
      message.error(error.message || 'Failed to Fetch Transactions');
    } finally {
      setTransactionsLoader(false);
    }
  };

  //   By default picking first customer and last three months
  useEffect(() => {
    // Calculate start and end months
    const endMonth = dayjs(); // current month
    const startMonth = endMonth.subtract(3, 'month');

    // For RangePicker in month mode:
    const monthRange = [startMonth, endMonth];
    filterTransactionsData({ customers: 1, months: monthRange });
    form.setFieldsValue({
      customers: 1,
      months: monthRange,
    });
  }, []);

  return (
    <Card title='Filter Transactions'>
      <Form
        form={form}
        onFinish={filterTransactionsData}
        layout='inline'
        size='small'
      >
        <Form.Item label='Customers' name={'customers'}>
          <Select
            size='small'
            options={customersData}
            style={{ minWidth: 200 }}
            placeholder='select customers'
            showSearch
            optionFilterProp='label'
            allowClear
          />
        </Form.Item>
        <Form.Item label='Date Range' name={'months'}>
          <RangePicker picker='month' allowClear />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' size='small'>
            Filter
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TransactionTableHeader;

TransactionTableHeader.propTypes = {
  filterTransactionsAndUpdateState: PropTypes.func.isRequired,
  setTransactionsLoader: PropTypes.func.isRequired
};