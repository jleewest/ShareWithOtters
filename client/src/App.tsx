import React from 'react';
import GroupOptions from './components/GroupOptions';
import WaveChart from './components/WaveChart';
import TransactionItem from './components/TransactionItem';
import TransactionTable from './components/TransactionTable';
import PieChart from './components/PieChart';
import PendingTransactions from './components/PendingTransactions';

function App() {
  // Sample transactions data
  const transactions = [
    { creator: 'Alice', date: '01-26-2024', description: 'Lunch', amount: 20.00 },
    { creator: 'Bob', date: '01-20-2024', description: 'Groceries', amount: 45.50 },
  ];
  return (
    <div>
      <GroupOptions/>
      <PendingTransactions/>
      <WaveChart/>
      <TransactionTable transactions={transactions}/>
      <PieChart/>
    </div>
  );
}

export default App;
