import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

//when addSplit is submitted, should submit request. Submit modal returns response to request (if successful or not)

type SubmitExpenseFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const SubmitExpenseForm = ({
  open,
  onClose,
  handleSubmit,
}: SubmitExpenseFormProps) => {
  handleSubmit = () => {
    // send cue for expense form to submit form
    console.log('Form submitted');
    onClose();
  };

  return (
    <div className='SubmitExpenseForm'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Submit your Expense!</DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubmitExpenseForm;
