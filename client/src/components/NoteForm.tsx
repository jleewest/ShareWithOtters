import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Transaction } from '../index';

type NoteFormProps = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
};

const NoteForm = ({ open, onClose, transaction }: NoteFormProps) => {
  // Form submission handler (to be implemented)
  const handleSubmit = () => {
    console.log(transaction);
    // Placeholder for form submission logic
    console.log('Form submitted');
    onClose();
  };

  //FIELDS SHOULD POPULATE CONDITIONALLY BASED ON WHETHER USER IS TRANSACTOR OR TRANSACTEE
  //HANDLE SUBMIT SHOULD SEND POST REQUEST: EDITTRANSACTION(TRANSACTION.ID)

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Note</DialogTitle>
      <DialogContent>
        {/* Note form fields */}
        <TextField
          autoFocus
          margin='dense'
          id='note'
          label='Note'
          type='text'
          fullWidth
          multiline
          rows={4}
        />
        {/* more fields here*/}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteForm;
