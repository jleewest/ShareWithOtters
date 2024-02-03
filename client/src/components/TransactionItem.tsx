import '../css/TransactionItem.css';
import { TransactionWithRenderType } from '../index';
import NoteForm from './NoteForm';
import { updateTransactionStatus } from '../apiServices/transaction';
import { useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@clerk/clerk-react';

type TransactionItemProps = {
  transaction: TransactionWithRenderType;
  status: string;
};

const TransactionItem = ({ transaction, status }: TransactionItemProps) => {
  const [isNoteFormOpen, setNoteFormOpen] = useState(false);
  const openNoteForm = () => setNoteFormOpen(true);
  const closeNoteForm = () => setNoteFormOpen(false);
  const { user } = useUser();

  //set amount color and sign
  let sign;
  let amountColor;
  if (
    transaction.renderType === 'pendingExpense' ||
    transaction.renderType === 'awaitedPending' ||
    transaction.renderType === 'confirmedExpense'
  ) {
    sign = '-';
    amountColor = 'var(--dark-accent-color)';
  } else if (
    transaction.renderType === 'pendingPayment' ||
    transaction.renderType === 'received'
  ) {
    sign = '+';
    amountColor = 'var(--secondary-color)';
  } else if (
    transaction.renderType === 'paid' ||
    transaction.renderType === 'pendingPaid'
  ) {
    amountColor = 'var(--light-accent-color)';
  }

  //set user message
  let userMessage;
  if (user) {
    if (
      (transaction.renderType === 'confirmedExpense' &&
        user.id === transaction.transactor &&
        transaction.transactor !== transaction.transactee) ||
      transaction.renderType === 'awaitedPending'
    ) {
      userMessage = `You paid for ${transaction.userActee.firstName}`;
    } else if (
      transaction.renderType === 'pendingExpense' ||
      (transaction.renderType === 'confirmedExpense' &&
        user.id === transaction.transactee &&
        transaction.transactor !== transaction.transactee)
    ) {
      userMessage = `${transaction.userActor.firstName} paid for you`;
    } else if (
      transaction.renderType === 'pendingPayment' ||
      transaction.renderType === 'received'
    ) {
      userMessage = `${transaction.userActor.firstName} reimbursed you`;
    } else if (
      transaction.renderType === 'pendingPaid' ||
      transaction.renderType === 'paid'
    ) {
      userMessage = `You paid back ${transaction.userActee.firstName}`;
    } else if (
      transaction.renderType === 'confirmedExpense' &&
      transaction.transactor === transaction.transactee
    ) {
      userMessage = `Your own expense`;
    }
  }

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
          {status === 'pending' && (
            <button
              className='transaction-btn'
              onClick={handleAcceptTransaction}
            >
              <FontAwesomeIcon
                icon={faSquareCheck}
                style={{ color: '#FFD43B' }}
                size='2x'
              />
            </button>
          )}
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
          <div className='transaction-user'>{userMessage}</div>
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
