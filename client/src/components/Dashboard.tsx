import React from 'react';
import GroupOptions from './GroupOptions';
import WaveChart from './WaveChart';
import TransactionTable from './TransactionTable';
import PieChart from './PieChart';
import { Transaction } from './TransactionTable';

const Dashboard = () => {
  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: 0,
      creator: 'Alice',
      date: '01-26-2024',
      description: 'Lunch',
      amount: 20.00,
      status: 'approved',
      type: 'income'
    },
    {
      id: 1,
      creator: 'Bob',
      date: '01-20-2024',
      description: 'Groceries',
      amount: 45.50,
      status: 'disputed',
      type: 'expense'
    },
  ];

  return (
    <div>
      <GroupOptions/>
      <TransactionTable transactions={transactions}/>
      <WaveChart/>
      <TransactionTable transactions={transactions}/>
      <PieChart/>
    </div>
  );
};

export default Dashboard;
