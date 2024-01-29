import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type ExpenseFormProps = {
  open: boolean;
  onClose: () => void;
};

const ExpenseForm = ({ open, onClose }: ExpenseFormProps) => {
  // Form submission handler (to be implemented)
  const handleSubmit = () => {
    // Placeholder for form submission logic
    console.log('Form submitted');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add an Expense</DialogTitle>
      <DialogContent>
        {/* Expense form fields */}
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Expense Name'
          type='text'
          fullWidth
        />
        {/*more fields here*/}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseForm;
