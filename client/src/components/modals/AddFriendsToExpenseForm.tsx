import { useEffect, useState } from 'react';
import { User } from '../../index';
import { useTransactionDataContext } from '../../index';
import { getAllUsers } from '../../apiServices/user';
import { useUser } from '@clerk/clerk-react';
import AddSplitForm from './AddSplitForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';

type AddFriendsToExpenseFormProps = {
  openFriendForm: boolean;
  onCloseFriendForm: () => void;
};

const AddFriendsToExpenseForm = ({
  openFriendForm,
  onCloseFriendForm,
}: AddFriendsToExpenseFormProps) => {
  const [isAddSplitFormOpen, setAddSplitFormOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [newFriendList, setNewFriendList] = useState<User[]>([]);
  const openAddSplitForm = () => setAddSplitFormOpen(true);
  const closeAddSplitForm = () => setAddSplitFormOpen(false);
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

  const handleNext = () => {
    const clerkIds = newFriendList.map((friend) => friend.clerkId);
    const newFriendIds = [...transactionData.transactee, ...clerkIds];

    setTransactionData({
      ...transactionData,
      transactee: newFriendIds,
    });
    setNewFriendList([]);
    openAddSplitForm();
    onCloseFriendForm();
  };

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={openFriendForm} onClose={onCloseFriendForm}>
        <DialogTitle>Add Friends</DialogTitle>
        <DialogContent>
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
            renderInput={(params) => (
              <TextField {...params} label='Add Friend' />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseFriendForm}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>
      <AddSplitForm
        openSplitForm={isAddSplitFormOpen}
        onCloseSplitForm={closeAddSplitForm}
      />
    </div>
  );
};

export default AddFriendsToExpenseForm;
