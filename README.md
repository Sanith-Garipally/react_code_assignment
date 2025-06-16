# Reward Points Dashboard

A modern React application to track and display customer reward points, featuring:
- Monthly reward summaries
- Transaction history
- UI built with Ant Design
- Unit-tested business logic using Vitest and React Testing Library

---

## 🚀 Features

- **Reward Points Calculation:** Calculates reward points based on transaction amounts with customizable slabs.
- **Monthly Summary:** View points earned per month, total points, and detailed transaction breakdown.
- **UI:** Clean, modern design using Ant Design components and Styling using Styled Components.
- **Unit Tested:** Core logic and UI tested with Vitest and Testing Library.

---

## 🖥️ Application Screenshots

![Application Screenshot](/public/screenshots/application/defaultScreen.png)

- This is the default view of the application. By default, the first customer's data and data from the last three months are displayed.

- Rewards Section Contains Consolidated Sum of Reward Points for the applied Filters.

- Data is Segregated into Monthly Wise Summary and Overall Transactions for the applied filter.

- View Transactions in Monthly Summary Opens a Drawer with Transactions of that Month

![Filter Transactions Form Screenshot](/public/screenshots/application/FilterTransactions.png)

- User Can Filter Data with Customer Name and Date - Year Range.
- Filters are non Mandatory, Filtering Data without any selections display overall transactions.

![Application with No Data](/public/screenshots/application/noData.png)

- When No Data Found for selected filters, No Data is Shown in Tables with Rewards as 0 points.


![Customer Filters Screenshot](/public/screenshots/application/customersFilter.png)

- Customer Dropdown has Search By Label Feature, All Partial Matches will be filtered.

![Date Range Filter Screenshot](/public/screenshots/application/dateRangeFilter.png)

- Both Months and Year Range Can be Selected, Reducing Additonal Dropdowns for improved UX.

![Monthly Transactions Screenshot](/public/screenshots/application/monthlyTransactions.png)

- View Transactions Button is Provided in Monthly wise Rewards Summary Tab. 
- Drawer holds transaction details for that particular month along with total rewards for that particular month.- Used Pagination to handle the data.

![Overall Transactions Screenshot](/public/screenshots/application/overAllTransactions.png)

- Transaction Details Tab Hold all the transactions for the selected filters.

- Used Pagination to handle the data.

---

## ✅ Test Cases Screenshot

![Test Success](/public/screenshots/unitTests/testCases.png)
- Test Files and Tests Status
---

## 📦 Getting Started

### 1. Clone the repository
`git clone https://github.com/your-username/reward-points-dashboard.git
cd reward-points-dashboard`

### 2. Install dependencies
`npm install`


### 3. Run the application
`npm run dev`

## 🧪 Running Tests
`npm run test`

## 📝 Project Structure
<pre>
src
├── api
│   └── fetchData.js
├── App.css
├── App.jsx
├── assets
│   └── react.svg
├── components
│   ├── rewardCard
│   │   ├── rewardCard.jsx
│   │   └── rewardCard.test.jsx
│   ├── rewardsSummary.jsx
│   ├── tableHeader.jsx
│   └── transactionsTable.jsx
├── index.css
├── lib
│   ├── customersData.json
│   └── transactions.json
├── main.jsx
├── styles
│   └── globalStyles.js
└── utils
    ├── calculatePoints.js
    └── calculatePoints.test.js

</pre>

## ⚙️ Technologies Used

- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Vitest](https://vitest.dev/)
- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)
- [styled-components](https://styled-components.com/) (for custom styling)

---

## 📚 Documentation

- **Reward Logic:**  
  - 2 points for every $1 spent over $100
  - 1 point for every $1 spent between $50 and $100
  - No points for $50 or less

- **Component Overview:**
  - `RewardCard`: Shows total points and the selected month/year.
  - `TransactionTable`: Displays all transactions for the user (Monthly/Overall).
  - `calculatePoints`: Utility to sum up reward points from transactions.

---