import { useState, useEffect } from 'react';
import { useTransactionDataContext, User } from '../../../index';
import { getAllUsers } from '../../../apiServices/user';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { Button } from '@mui/material';
import { useUser } from '@clerk/clerk-react';

type StepTwoProps = {
  handleNext: () => void;
  steps: string[];
  activeStep: number;
};

const StepTwo = ({ handleNext, activeStep, steps }: StepTwoProps) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [newFriendList, setNewFriendList] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getAllUsers().then((data) => {
        const filteredUsers = data.filter((users) => users.clerkId !== user.id);
        setAllUsers(filteredUsers);
      });
    }
  }, [user]);

  const { transactionData, setTransactionData } = useTransactionDataContext();

  let allUsersWithLabels = allUsers.map((user) => ({
    ...user,
    label: `${user.firstName} ${user.lastName}`,
  }));
  // Form field change handling
  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    //@ts-expect-error newValue from autocomplete
    newValue
  ) => {
    allUsersWithLabels = allUsersWithLabels.filter(
      (user) => user !== newValue[0]
    );
    allUsersWithLabels = [];
    setNewFriendList(newValue);
  };

  const setTransaction = () => {
    const clerkIds = newFriendList.map((friend) => friend.clerkId);
    const newFriendIds = [...transactionData.transactee, ...clerkIds];

    setTransactionData({
      ...transactionData,
      transactee: newFriendIds,
    });
    setNewFriendList([]);
  };

  return (
    <div className='AddExpenseForm'>
      {/* Expense form fields */}
      <form action=''>
        <Autocomplete
          disablePortal
          multiple
          id='add-friends-selector'
          options={allUsersWithLabels.filter(
            (user) => !newFriendList.includes(user)
          )}
          value={newFriendList}
          sx={{ width: 300 }}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label='Add Friend' />}
        />
      </form>
      <div>
        <>
          {newFriendList.length > 0 && (
            <Button
              onClick={() => {
                handleNext();
                setTransaction();
              }}
            >
              {activeStep === steps.length ? 'Finish' : 'Next'}
            </Button>
          )}
        </>
      </div>
    </div>
  );
};

export default StepTwo;
