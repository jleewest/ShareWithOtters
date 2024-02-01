import '../css/TransactionItem.css';
import { TransactionWithRenderType } from '../index';
import NoteForm from './NoteForm';
import { updateTransactionStatus } from '../apiServices/transaction';
import { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

type TransactionItemProps = {
  transaction: TransactionWithRenderType;
};

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);
  const openNoteForm = () => setNoteFormOpen(true);
  const closeNoteForm = () => setNoteFormOpen(false);
  const sign = transaction.type === 'expense' ? '-' : '+';
  const amountColor = transaction.type === 'payment' ? 'green' : 'purple';
  //const sign = if (transaction.type === 'expense'){return '-'} else if (transaction.type === 'payment' ){ }

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
      <div className='buttons-and-descriptions'>
        <div>
          <button className='transaction-btn' onClick={handleAcceptTransaction}>
            <FontAwesomeIcon
              icon={faSquareCheck}
              style={{ color: '#FFD43B' }}
              size='2x'
            />
          </button>
        </div>
        <div>
          <button className='transaction-btn' onClick={openNoteForm}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ color: '#ffd43b' }}
              size='2x'
            />
          </button>
        </div>
        <div>
          <div className='transaction-user'>
            {transaction.userActor.firstName}
          </div>
          <div className='transaction-description'>
            {transaction.description}
          </div>
        </div>
        <div className='transaction-note'>{transaction.notes}</div>
      </div>
      <div>
        <div className='amount-with-date'>
          <div
            className='transaction-amount'
            style={{ color: amountColor, fontWeight: 'bold' }}
          >
            {sign}${transaction.amount.toFixed(2)}
          </div>
          <div className='transaction-date'>
            {moment(transaction.date).format('ll')}
          </div>
        </div>
      </div>
      <NoteForm
        open={isNoteFormOpen}
        onClose={closeNoteForm}
        transaction={transaction}
      />
    </div>
  );
};

export default TransactionItem;
