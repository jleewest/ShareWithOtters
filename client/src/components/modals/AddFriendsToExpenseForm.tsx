import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import AddSplitForm from './AddSplitForm';

type AddFriendsToExpenseFormProps = {
  open: boolean;
  onClose: () => void;
};

const AddFriendsToExpenseForm = ({
  open,
  onClose,
}: AddFriendsToExpenseFormProps) => {
  const [isAddSplitFormOpen, setAddSplitFormOpen] = useState(false);
  const openAddSplitForm = () => setAddSplitFormOpen(true);
  const closeAddSplitForm = () => setAddSplitFormOpen(false);

  //filterFriends (getUsers --> filter by firstName, lastName, email?) and add to Friends array (setState) that will be sent to AddSplit form and expense from

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Friends</DialogTitle>
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
          <Button onClick={openAddSplitForm}>Next</Button>
        </DialogActions>
      </Dialog>
      <AddSplitForm open={isAddSplitFormOpen} onClose={closeAddSplitForm} />
    </div>
  );
};

export default AddFriendsToExpenseForm;
