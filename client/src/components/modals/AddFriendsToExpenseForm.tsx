import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import AddSplitForm from './AddSplitForm';
import { useTransactionDataContext } from '../../index';

//Should add friends to TransactionData context

type AddFriendsToExpenseFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  transactionAmounts: number[];
  transactionFriends: string[];
};

const AddFriendsToExpenseForm = ({
  open,
  onClose,
  handleSubmit,
  transactionAmounts,
  transactionFriends,
}: AddFriendsToExpenseFormProps) => {
  const [isAddSplitFormOpen, setAddSplitFormOpen] = useState(false);
  const openAddSplitForm = () => setAddSplitFormOpen(true);
  const closeAddSplitForm = () => setAddSplitFormOpen(false);
  //const [transactionFriendsArray,setTransactionFriendsArray] = useState([]);
  const [newFriend, setNewFriend] = useState('');

  const { transactionData } = useTransactionDataContext();

  const newFriends: string[] = [];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //filterFriends (getUsers --> filter by firstName, lastName, email?) and add to Friends array (setState) that will be sent to AddSplit form and expense from
    console.log(transactionData, 'ADDFRIEND');
    setNewFriend(e.target.value);
  };
  const handleAddFriend = () => {
    newFriends.push(newFriend);
    setNewFriend('');
  };

  const handleNext = () => {
    //add inputs to setTransactions body
    transactionFriends = [...transactionFriends, ...newFriends];
    openAddSplitForm();
    onClose(); //move to close in AddFriends or have back button to return? then close all in submit?
  };

  //if newFriends.length > 0 display friends added on top of TextField (newFriends)

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Friends</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Add friend'
            type='text'
            fullWidth
            onChange={onChange}
            value={newFriend}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFriend}>Add Friend</Button>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>
      <AddSplitForm
        open={isAddSplitFormOpen}
        onClose={closeAddSplitForm}
        handleSubmit={handleSubmit}
        transactionAmounts={transactionAmounts}
      />
    </div>
  );
};

export default AddFriendsToExpenseForm;
