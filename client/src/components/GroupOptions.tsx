import logo from '../assets/otter-logo.svg';
import '../css/GroupOptions.css';
import { useState } from 'react';
import PaymentForm from './PaymentForm';
import ExpenseForm from './ExpenseForm';
import InviteForm from './InviteForm';

const GroupOptions = () => {
  const [isPaymentFormOpen, setPaymentFormOpen] = useState(false);
  const [isExpenseFormOpen, setExpenseFormOpen] = useState(false);
  const [isInviteFormOpen, setInviteFormOpen] = useState(false);

  // Handlers for opening each modal
  const openPaymentForm = () => setPaymentFormOpen(true);
  const openExpenseForm = () => setExpenseFormOpen(true);
  const openInviteForm = () => setInviteFormOpen(true);

  // Handlers for closing each modal
  const closePaymentForm = () => setPaymentFormOpen(false);
  const closeExpenseForm = () => setExpenseFormOpen(false);
  const closeInviteForm = () => setInviteFormOpen(false);

  return (
    <div className='group-options'>
      <img className='logo' src={logo} alt='logo' />
      <section className='group-btns'>
        <button onClick={openExpenseForm}>Add expense</button>
        <button onClick={openPaymentForm}>Add payment</button>
        <button onClick={openInviteForm}>Invite friends</button>
      </section>
      {/* Modals for forms */}
      <PaymentForm open={isPaymentFormOpen} onClose={closePaymentForm} />
      <ExpenseForm open={isExpenseFormOpen} onClose={closeExpenseForm} />
      <InviteForm open={isInviteFormOpen} onClose={closeInviteForm} />
    </div>
  );
};

export default GroupOptions;
