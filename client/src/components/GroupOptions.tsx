import logo from '../assets/logo.svg';
import "../css/GroupOptions.css";

type GroupOptionsProps = {
  onAddExpense: () => void;
  onAddPayment: () => void;
  onInviteFriends?: () => void;
};

const GroupOptions = ({ onAddExpense, onAddPayment, onInviteFriends }: GroupOptionsProps) => {
  return (
    <section className="group-options">
      <img className="logo" src={logo} alt='logo' />
      <section className="group-btns">
        <button onClick={onAddExpense}>Add expense</button>
        <button onClick={onAddPayment}>Add payment</button>
        <button onClick={onInviteFriends}>Invite friends</button>
      </section>
    </section>
  );
};

export default GroupOptions;
