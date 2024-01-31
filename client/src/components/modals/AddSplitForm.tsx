import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SubmitExpenseForm from './SubmitExpenseForm';
import { useTransactionDataContext } from '../../index';

//should get array of friends and single amount from TransactionData context and update amount of TransactionData with array of amounts

type AddSplitFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const AddSplitForm = ({ open, onClose, handleSubmit }: AddSplitFormProps) => {
  const [isSubmitExpenseFormOpen, setSubmitExpenseFormOpen] = useState(false);
  const openSubmitExpenseForm = () => setSubmitExpenseFormOpen(true);
  const closeSubmitExpenseForm = () => setSubmitExpenseFormOpen(false);

  const { transactionData, setTransactionData } = useTransactionDataContext();
  console.log(transactionData);
  //gets friend array from AddFriends
  //creates TextField for each friend in array
  //adds expenses for each friend in friend array
  //need to get amount here from transactionData...
  //sends amount array to Expense form
  const handleNext = () => {
    //add inputs to setTransactions body
    openSubmitExpenseForm();
    onClose(); //move to close in AddFriends or have back button to return? then close all in submit?
  };

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Split</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
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
        </DialogActions>
      </Dialog>
      <SubmitExpenseForm
        open={isSubmitExpenseFormOpen}
        onClose={closeSubmitExpenseForm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddSplitForm;
