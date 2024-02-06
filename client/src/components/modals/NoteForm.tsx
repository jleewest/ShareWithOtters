import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Transaction } from '../../index';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

type NoteFormProps = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
};

const NoteForm = ({ open, onClose, transaction }: NoteFormProps) => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const { user } = useUser();

  useEffect(() => {
    //set all fields
  });
  // Form submission handler (to be implemented)
  const handleSubmit = () => {
    console.log(transaction);
    // Placeholder for form submission logic
    console.log('Form submitted');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit and Add Notes</DialogTitle>
      <DialogContent>
        {/* Note form fields */}
        {user && transaction.transactor === user.id && (
          <div>
            <MobileDatePicker label='Date' value={date} onChange={setDate} />

            <TextField
              margin='dense'
              label='Amount'
              type='number'
              fullWidth
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        )}
        <TextField
          autoFocus
          margin='dense'
          label='Payment description'
          type='text'
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
