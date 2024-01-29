import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import SubmitExpenseForm from './SubmitExpenseForm';

type AddSplitFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  transactionAmounts: number[];
};

const AddSplitForm = ({
  open,
  onClose,
  handleSubmit,
  transactionAmounts,
}: AddSplitFormProps) => {
  const [isSubmitExpenseFormOpen, setSubmitExpenseFormOpen] = useState(false);
  const openSubmitExpenseForm = () => setSubmitExpenseFormOpen(true);
  const closeSubmitExpenseForm = () => setSubmitExpenseFormOpen(false);

  //gets friend array from AddFriends
  //adds expenses for each friend in friend array
  //sends amount array to Expense form

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Split</DialogTitle>
        <DialogContent>
          {/* Split form fields */}
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
          <Button onClick={openSubmitExpenseForm}>Next</Button>
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
