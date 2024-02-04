import logo from '../assets/otter-logo.svg';
import '../css/GroupOptions.css';
import { useState } from 'react';
import AddPaymentForm from './modals/AddPaymentForm';
import ExpenseFormContext from './modals/expenseMultistep/ExpenseFormContext';
import InviteForm from './modals/InviteForm';

const GroupOptions = () => {
  const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
  const [isInviteFormOpen, setInviteFormOpen] = useState(false);

  // Handlers for opening and closing each modal
  const openPaymentForm = () => setPaymentFormOpen(true);
  const openExpenseForm = () => setExpenseFormOpen(true);
  const openInviteForm = () => setInviteFormOpen(true);
  const closePaymentForm = () => setPaymentFormOpen(false);
  const closeExpenseForm = () => setExpenseFormOpen(false);
  const closeInviteForm = () => setInviteFormOpen(false);

  return (
    <div className='GroupOptions'>
      <img className='logo' src={logo} alt='logo' />
      <section className='group-btns'>
        <button className='primary-btn' onClick={openExpenseForm}>
          Add expense
        </button>
        <button className='primary-btn' onClick={openPaymentForm}>
          Add payment
        </button>
        <button className='primary-btn' onClick={openInviteForm}>
          Invite friends
        </button>
      </section>
      {/* Modals for forms with refreshTransactions passed as a prop */}
      <AddPaymentForm
        open={isPaymentFormOpen}
        onClose={closePaymentForm}
        // SetTransactions={refreshTransactions}
      />
      <ExpenseFormContext
        open={isExpenseFormOpen}
        onClose={closeExpenseForm} /*refreshTransactions={refreshTransactions}*/
      />
      <InviteForm open={isInviteFormOpen} onClose={closeInviteForm} />
    </div>
  );
};

export default GroupOptions;
