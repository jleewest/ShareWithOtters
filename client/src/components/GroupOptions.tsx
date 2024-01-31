import logo from '../assets/otter-logo.svg';
import '../css/GroupOptions.css';
import { useState } from 'react';
import PaymentForm from './modals/PaymentForm';
import ExpenseForm from './modals/ExpenseForm';
import InviteForm from './modals/InviteForm';

type GroupOptionsProps = {
  refreshTransactions: () => void;
};

const GroupOptions = ({ refreshTransactions }: GroupOptionsProps) => {
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
        <button onClick={openExpenseForm}>Add expense</button>
        <button onClick={openPaymentForm}>Add payment</button>
        <button onClick={openInviteForm}>Invite friends</button>
      </section>
      {/* Modals for forms with refreshTransactions passed as a prop */}
      <PaymentForm
        open={isPaymentFormOpen}
        onClose={closePaymentForm}
        refreshTransactions={refreshTransactions}
      />
      <ExpenseForm
        open={isExpenseFormOpen}
        onClose={closeExpenseForm} /*refreshTransactions={refreshTransactions}*/
      />
      <InviteForm open={isInviteFormOpen} onClose={closeInviteForm} />
    </div>
  );
};

export default GroupOptions;
