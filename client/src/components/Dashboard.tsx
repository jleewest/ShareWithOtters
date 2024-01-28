import '../css/Dashboard.css';
import { useState } from 'react';
import GroupOptions from './GroupOptions';
import WaveChart from './WaveChart';
import TransactionTable from './TransactionTable';
import PieChart from './PieChart';
import NoteForm from './NoteForm';
import TransactionItem from './TransactionItem';
import { Transaction } from './TransactionTable';
import LendingSummary from './LendingSummary';

const Dashboard = () => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);

  // Handlers for opening each modal
  const openNoteForm = () => setNoteFormOpen(true);

  // Handlers for closing each modal
  const closeNoteForm = () => setNoteFormOpen(false);

  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: 0,
      creator: 'Alice',
      date: '01-26-2024',
      description: 'Lunch',
      amount: 20.0,
      status: 'approved',
      type: 'income',
    },
    {
      id: 1,
      creator: 'Bob',
      date: '01-20-2024',
      description: 'Groceries',
      amount: 45.5,
      status: 'pending',
      type: 'expense',
    },
  ];

  // Function to handle the acceptance of a transaction
  const handleAcceptTransaction = (id: number) => {
    // Placeholder function to update status to 'approved'
    console.log('Transaction accepted with ID:', id);
    // Call a backend API to update the transaction status
  };

  // Function to handle adding a note to a transaction
  const handleAddNote = (id: number) => {
    openNoteForm();
    // open a modal here to add a note
  };
  return (
    <div>
      <GroupOptions />

      {/* Render only pending transactions here */}
      <table className='table-container'>
        <tbody>
          {transactions
            .filter((tx) => tx.status === 'pending')
            .map((transaction) => (
              <TransactionItem
                key={transaction.id}
                id={transaction.id}
                status={transaction.status}
                type={transaction.type}
                creator={transaction.creator}
                date={transaction.date}
                description={transaction.description}
                amount={transaction.amount}
                onAccept={handleAcceptTransaction}
                onAddNote={handleAddNote}
              />
            ))}
        </tbody>
      </table>

      <WaveChart />
      <LendingSummary />

      {/* Render only approved transactions here */}
      <table className='table-container'>
        <tbody>
          {transactions
            .filter((tx) => tx.status === 'approved')
            .map((transaction) => (
              <TransactionItem
                key={transaction.id}
                id={transaction.id}
                status={transaction.status}
                type={transaction.type}
                creator={transaction.creator}
                date={transaction.date}
                description={transaction.description}
                amount={transaction.amount}
                onAccept={() => {}} // Empty function since no action on approved
                onAddNote={handleAddNote}
              />
            ))}
        </tbody>
      </table>

      <PieChart />

      {/* Modals for forms */}
      <NoteForm open={isNoteFormOpen} onClose={closeNoteForm} />
    </div>
  );
};

export default Dashboard;
