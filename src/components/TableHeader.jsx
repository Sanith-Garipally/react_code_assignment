import React, { useEffect } from 'react';
import { Form, Select, Button, Divider, DatePicker, message } from 'antd';
import customersData from '../lib/customersData.json';
import { fetchTransactions } from '../api/fetchData';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
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
        let points = 0;
        const { amount } = obj;
        if (amount > 100) {
          points += 2 * (amount - 100) + 50; // 2 points over $100, plus 1 point for $50-$100
        } else if (amount > 50) {
          points += amount - 50;
        }
        return { ...obj, points: Math.floor(points) };
      });
      let startRange = '';
      let endRange = '';
      let updatedState = data;

      if (!customers && !months) {
        updatedState = data;
      } else if (customers && !months.length) {
        updatedState = data.filter((obj) => obj.customerId === customers);
      } else if (!customers && months.length) {
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
    <>
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
      <Divider />
    </>
  );
};

export default TransactionTableHeader;
