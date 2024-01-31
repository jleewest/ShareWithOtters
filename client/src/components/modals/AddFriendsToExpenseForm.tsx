import { useEffect, useState } from 'react';
import { User } from '../../index';
import { useTransactionDataContext } from '../../index';
import { getAllUsers } from '../../apiServices/user';
import AddSplitForm from './AddSplitForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useUser } from '@clerk/clerk-react';

//Should add friends to TransactionData context

type AddFriendsToExpenseFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const AddFriendsToExpenseForm = ({
  open,
  onClose,
  handleSubmit,
}: AddFriendsToExpenseFormProps) => {
  const [isAddSplitFormOpen, setAddSplitFormOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const openAddSplitForm = () => setAddSplitFormOpen(true);
  const closeAddSplitForm = () => setAddSplitFormOpen(false);
  const [newFriendList, setNewFriendList] = useState<User[]>([]);
  const { user } = useUser();
  if (!user) return null;

  useEffect(() => {
    getAllUsers().then((data) => {
      const filteredUsers = data.filter((users) => users.clerkId !== user.id);
      setAllUsers(filteredUsers);
    });
  }, []);

  const { transactionData, setTransactionData } = useTransactionDataContext();

  let allUsersWithLabels = allUsers.map((user) => ({
    ...user,
    label: `${user.firstName} ${user.lastName}`,
  }));

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: any
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

    //add inputs to setTransactions body
    setTransactionData({
      ...transactionData,
      transactee: newFriendIds,
    });
    setNewFriendList([]);
    openAddSplitForm();
    onClose(); //move to close in AddFriends or have back button to return? then close all in submit?
  };

  //if newFriends.length > 0 display friends added on top of TextField (newFriends)

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={open} onClose={onClose}>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>
      <AddSplitForm
        open={isAddSplitFormOpen}
        onClose={closeAddSplitForm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddFriendsToExpenseForm;
