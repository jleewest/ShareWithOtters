import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type InviteFormProps = {
  open: boolean;
  onClose: () => void;
};

const InviteForm = ({ open, onClose }: InviteFormProps) => {
  // Form submission handler (to be implemented)
  const handleSubmit = () => {
    // Placeholder for form submission logic
    console.log('Form submitted');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Invite a Friend</DialogTitle>
      <DialogContent>
        {/* Payment form fields */}
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Invitee Name'
          type='text'
          fullWidth
        />
        {/* more fields as here */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteForm;
