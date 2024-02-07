import logo from '../assets/otter-logo.svg';
import '../css/GroupOptions.css';
import { useState, useEffect } from 'react';
import AddPaymentForm from './modals/AddPaymentForm';
import ExpenseFormContext from './modals/expenseMultistep/ExpenseFormContext';
import InviteForm from './modals/InviteForm';
import { useParams } from 'react-router-dom';
import { getUsersByGroup } from '../apiServices/user-group';
import { User_GroupUsers } from '..';
import { useUser } from '@clerk/clerk-react';

const GroupOptions = () => {
  const params = useParams();
  const [allUsersInGroup, setAllUsersInGroup] = useState<User_GroupUsers[]>([]);
  const [currentOtters, setCurrentOtters] = useState<string[]>([]);
  const { user } = useUser();
  const [formState, setFormState] = useState({
    payment: false,
    expense: false,
    invite: false,
  });

  //get all members of group
  useEffect(() => {
    getUsersByGroup(Number(params.id)).then((data) => {
      setAllUsersInGroup(data);
    });
  }, [params]);

  //set list of users
  useEffect(() => {
    if (user) {
      const userGroup: string[] = [];
      allUsersInGroup.forEach((users) => {
        if (users.user.clerkId === user.id) {
          userGroup.push('You');
        } else {
          userGroup.push(users.user.firstName);
        }
      });
      setCurrentOtters(userGroup);
    }
  }, [user, allUsersInGroup]);

  // Handlers for opening and closing each modal
  const openForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [target.name]: true,
    }));
  };
  const closeForm = (name: string) =>
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: false,
    }));

  return (
    <div>
      <div className='GroupOptions'>
        <img className='logo' src={logo} alt='logo' />
        <section className='group-btns'>
          <button className='primary-btn' name='expense' onClick={openForm}>
            Add expense
          </button>
          <button className='primary-btn' name='payment' onClick={openForm}>
            Add payment
          </button>
          <button className='primary-btn' name='invite' onClick={openForm}>
            Add Otter
          </button>
        </section>
      </div>
      {currentOtters && (
        <div className='current-otters'>
          Current Otters:{' '}
          <span className='otter-list'>{currentOtters.join(', ')}</span>
        </div>
      )}
      {/* Modals for forms with refreshTransactions passed as a prop */}
      <AddPaymentForm
        open={formState['payment']}
        onClose={() => closeForm('payment')}
      />
      <ExpenseFormContext
        open={formState['expense']}
        onClose={() => closeForm('expense')}
      />
      <InviteForm
        open={formState['invite']}
        onClose={() => closeForm('invite')}
      />
    </div>
  );
};

export default GroupOptions;
