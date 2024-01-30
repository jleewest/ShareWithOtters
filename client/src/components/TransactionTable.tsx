import TransactionItem from './TransactionItem';
import '../css/TransactionTable.css';
import { Transaction, TransactionTableProps } from '../index';
import NoteForm from './NoteForm';
import { useState } from 'react';

const TransactionTable: React.FC<TransactionTableProps> = ({ status, refreshTransactions }) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);

  // Handlers for opening each modal
  const openNoteForm = () => setNoteFormOpen(true);

  // Handlers for closing each modal
  const closeNoteForm = () => setNoteFormOpen(false);
  // Function to handle the acceptance of a transaction

  const handleAcceptTransaction = async (transactionId: number) => {
    // Placeholder function to update status to 'active'
    console.log(`Transaction accepted with ID:'${transactionId}`);
    // Call a backend API to update the transaction status
    await refreshTransactions();
  };

  // Function to handle adding a note to a transaction
  const handleAddNote = (id: number) => {
    openNoteForm();
    // open a modal here to add a note
  };
  // Sample transaction data
  const transactions: Transaction[] = [
    {
      id: 0,
      transactor: 'Alice',
      transactee: 'Bob',
      status: 'pending',
      date: '01-26-2024',
      description: 'Lunch',
      amount: 20.0,
      type: 'income',
      notes: '',
      groupId: 1,
    },
    {
      id: 1,
      transactor: 'Bob',
      transactee: 'Alice',
      status: 'active',
      date: '01-20-2024',
      description: 'Groceries',
      amount: 45.5,
      type: 'expense',
      notes: '',
      groupId: 1,
    },
  ];

  const filteredTransactions = transactions.filter(tx => tx.status === status);
  // Populates table with transactions by table status
  // if (status === 'pending') {
  //  transactions = transactions.pending
  // } else {
  //  transactions = transactions.active
  // }

  return (
    <div className='TransactionTable'>
      <table className='transaction-table'>
        <thead>
          <tr>
            <th>Status</th>
            <th>Transactor</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th> {/* Column for Accept and Add Note buttons */}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              status={transaction.status}
              type={transaction.type}
              transactor={transaction.transactor}
              date={transaction.date}
              description={transaction.description}
              amount={transaction.amount}
              notes={transaction.notes}
              onAccept={handleAcceptTransaction}
              onAddNote={handleAddNote}
            />
          ))}
        </tbody>

      </table>
      <NoteForm open={isNoteFormOpen} onClose={closeNoteForm} />
    </div>
  );
};

export default TransactionTable;
