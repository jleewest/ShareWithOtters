import { useState, useEffect } from 'react';
import { useTransactionDataContext, User_GroupUsers } from '../../../index';
import { getUsersByGroup } from '../../../apiServices/user-group';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { Button } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';

type StepTwoProps = {
  handleBack: () => void;
  handleNext: () => void;
  steps: string[];
  activeStep: number;
};

type UsersWithLabels = User_GroupUsers & {
  label: string;
};

const StepTwo = ({
  handleNext,
  activeStep,
  handleBack,
  steps,
}: StepTwoProps) => {
  const [allUsers, setAllUsers] = useState<User_GroupUsers[]>([]);
  const [newFriendList, setNewFriendList] = useState<UsersWithLabels[]>([]);
  const { user } = useUser();
  const params = useParams();

  useEffect(() => {
    if (user) {
      getUsersByGroup(Number(params.id)).then((data) => {
        const filteredUsers = data.filter(
          (users) => users.user.clerkId !== user.id
        );
        setAllUsers(filteredUsers);
      });
    }
  }, [user, params]);

  const { transactionData, setTransactionData } = useTransactionDataContext();

  let allUsersWithLabels = allUsers.map((users) => ({
    ...users,
    label: `${users.user.firstName} ${users.user.lastName}`,
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
    const clerkIds = newFriendList.map((friend) => friend.user.clerkId);
    const newFriendIds = [...transactionData.transactee, ...clerkIds];
    setTransactionData({
      ...transactionData,
      transactee: newFriendIds,
    });
    setNewFriendList([]);
  };

  return (
    <div className='StepTwo'>
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
        <Button
          onClick={() => {
            handleBack();
          }}
        >
          BACK{' '}
        </Button>
        <>
          {newFriendList.length > 0 && (
            <button
              className='primary-btn'
              style={{ backgroundColor: 'var(--secondary-color)' }}
              onClick={() => {
                handleNext();
                setTransaction();
              }}
            >
              {activeStep === steps.length ? 'Finish' : 'Next'}
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default StepTwo;
