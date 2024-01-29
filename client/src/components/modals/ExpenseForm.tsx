import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import AddFriendsToExpenseForm from './AddFriendsToExpenseForm';
import { useState } from 'react';
import { createTransaction } from '../../apiServices/transaction';
import { useUser } from '@clerk/clerk-react';

type ExpenseFormProps = {
  open: boolean;
  onClose: () => void;
};

const ExpenseForm = ({ open, onClose }: ExpenseFormProps) => {
  const { user } = useUser();
  const [isAddFriendsFormOpen, setAddFriendsFormOpen] = useState(false);
  const openAddFriendsForm = () => setAddFriendsFormOpen(true);
  const closeAddFriendsForm = () => setAddFriendsFormOpen(false);

  const handleSubmit = async () => {
    // postTransaction will happen here!
    console.log('Form submitted');
    onClose();

    const transactionData = {
      type: 'expense',
      date: '', //e.target.date
      transactor: user.id,
      transactee: [user.id], //import from AddFriends
      description: '', //e.target.description
      amount: [], //import from AddSplit
      notes: '',
    };

    createTransaction(transactionData);
  };

  const handleNext = () => {
    //add inputs to setTransactions body
    openAddFriendsForm();
    onClose(); //move to close in AddFriends or have back button to return? then close all in submit?
  };

  return (
    <div className='ExpenseForm'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add an Expense</DialogTitle>
        <DialogContent>
          {/* Expense form fields */}
          <DatePicker />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Expense description'
            type='text'
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Amount'
            type='text'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      <AddFriendsToExpenseForm
        open={isAddFriendsFormOpen}
        onClose={closeAddFriendsForm}
      />
    </div>
  );
};

export default ExpenseForm;
