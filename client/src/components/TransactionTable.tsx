import React, { useContext, useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import '../css/TransactionTable.css';
import NoteForm from './NoteForm';
import { TransactionsContext } from '../index'; // Import the TransactionsContext
import { updateTransactionStatus } from '../apiServices/transaction';

const TransactionTable = ({ status, refreshTransactions }) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);
  // Use the transactions from context if available, otherwise use mock data
  const { transactions: contextTransactions, setTransactions } = useContext(TransactionsContext);
  const [transactions, setTransactionsLocal] = useState([]);

  // This effect sets the transactions state to the context's transactions if available,
  // otherwise it falls back to mock data.
  useEffect(() => {
    if (contextTransactions && contextTransactions.length > 0) {
      setTransactionsLocal(contextTransactions.filter(tx => tx.status === status));
    } else {
      // Mock transactions to display in the table
      setTransactionsLocal([
        {
          id: 0,
          transactor: 'Alice',
          transactee: 'Bob',
          date: '2024-01-26',
          description: 'Lunch',
          amount: 20.0,
          type: 'income',
          status: status,
          notes: '',
          groupId: 1,
        },
        {
          id: 1,
          transactor: 'Bob',
          transactee: 'Alice',
          date: '2024-01-20',
          description: 'Groceries',
          amount: 45.5,
          type: 'expense',
          status: status,
          notes: '',
          groupId: 1,
        },
      ]);
    }
  }, [contextTransactions, status]);

  const handleAcceptTransaction = async (transactionId) => {
    try {
      await updateTransactionStatus(transactionId); // Update transaction status in the backend
      await refreshTransactions(); // Refresh the transactions list
    } catch (error) {
      console.error('Error accepting transaction:', error);
    }
  };

  const handleAddNote = (transactionId) => {
    // Implement the logic for adding a note here
    openNoteForm();
    // You might want to use transactionId for something related to notes
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionItem
              key={transactions.id}
              {...transaction}
              onAccept={handleAcceptTransaction}
              onAddNote={handleAddNote}
            />
          ))}
        </tbody>
      </table>
      <NoteForm open={isNoteFormOpen} onClose={setNoteFormOpen} />
    </div>
  );
};

export default TransactionTable;
