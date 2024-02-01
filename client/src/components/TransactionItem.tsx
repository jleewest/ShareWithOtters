import '../css/TransactionItem.css';
import { TransactionWithUser } from '../index';
import NoteForm from './NoteForm';
import { updateTransactionStatus } from '../apiServices/transaction';
import { useState } from 'react';
import moment from 'moment';

type TransactionItemProps = {
  transaction: TransactionWithUser;
};

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);
  const openNoteForm = () => setNoteFormOpen(true);
  const closeNoteForm = () => setNoteFormOpen(false);
  const sign = transaction.type === 'expense' ? '-' : '+';
  const amountColor = transaction.type === 'income' ? 'green' : 'purple';

  const handleAcceptTransaction = async () => {
    try {
      await updateTransactionStatus(transaction.id); // Update transaction status in the backend
      //await refreshTransactions(); // Refresh the transactions list
    } catch (error) {
      console.error('Error accepting transaction:', error);
    }
  };

  return (
    <div className='TransactionItem'>
      <tr className={`table-row ${transaction.notes ? 'has-note' : ''}`.trim()}>
        {transaction.status === 'pending' && (
          <td>
            <button onClick={handleAcceptTransaction}>Accept</button>
          </td>
        )}
        <td>
          <button onClick={openNoteForm}>Add Note</button>
        </td>
        <td>{transaction.userActor.firstName}</td>
        <td>{moment(transaction.date).format('ll')}</td>
        <td>{transaction.description}</td>
        <td style={{ color: amountColor, fontWeight: 'bold' }}>
          {sign}${transaction.amount.toFixed(2)}
        </td>
      </tr>
      <NoteForm
        open={isNoteFormOpen}
        onClose={closeNoteForm}
        transaction={transaction}
      />
    </div>
  );
};

export default TransactionItem;
