import TransactionItem from './TransactionItem';
import '../css/TransactionTable.css';
import { TransactionTableProps } from '../index';
import NoteForm from './NoteForm';
import { useState } from 'react';
import { updateTransactionStatus } from '../apiServices/transaction'; // Import the API service for updating transaction status

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, status, refreshTransactions }) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);

  const openNoteForm = () => setNoteFormOpen(true);
  const closeNoteForm = () => setNoteFormOpen(false);

  const handleAcceptTransaction = async (transactionId: number) => {
    try {
      await updateTransactionStatus(transactionId); // Update transaction status in the backend
      await refreshTransactions(); // Refresh the transactions list
    } catch (error) {
      console.error('Error accepting transaction:', error);
    }
  };

  const handleAddNote = (id: number) => {
   //build this out
    openNoteForm();
  };

  const filteredTransactions = transactions.filter(tx => tx.status === status);

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
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              {...transaction}
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
