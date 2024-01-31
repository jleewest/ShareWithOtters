import React, { useContext } from 'react';
import TransactionItem from './TransactionItem';
import '../css/TransactionTable.css';
import NoteForm from './NoteForm';
import { TransactionsContext } from '../index'; // Import the TransactionsContext
import { updateTransactionStatus } from '../apiServices/transaction';

const TransactionTable = ({ status, refreshTransactions }) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);
  const { transactions } = useContext(TransactionsContext); // Use the transactions from context

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
  };

  const openNoteForm = () => setNoteFormOpen(true);
  const closeNoteForm = () => setNoteFormOpen(false);

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
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                {...transaction}
                onAccept={handleAcceptTransaction}
                onAddNote={() => handleAddNote(transaction.id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
      <NoteForm open={isNoteFormOpen} onClose={closeNoteForm} />
    </div>
  );
};

export default TransactionTable;
