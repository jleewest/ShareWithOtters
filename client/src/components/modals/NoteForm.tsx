import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Transaction } from '../../index';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { editTransaction } from '../../apiServices/transaction';

type NoteFormProps = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction;
};

const NoteForm = ({ open, onClose, transaction }: NoteFormProps) => {
  const [date, setDate] = useState<string>(transaction.date);
  const [amount, setAmount] = useState<number>(transaction.amount);
  const [description, setDescription] = useState<string>(
    transaction.description
  );
  const [note, setNote] = useState<string>(transaction.notes);
  const { user } = useUser();

  //date change handling
  //@ts-expect-error date is coming from Day.js
  const handleChangeDate = (date) => {
    if (date && typeof date === 'object' && '$d' in date) {
      const newDate = new Date(date);
      setDate(newDate.toString());
    }
  };

  // Form submission handler
  const handleSubmit = () => {
    const updatedTransaction = {
      date: date,
      amount: amount,
      description: description,
      notes: note,
    };
    editTransaction(updatedTransaction, transaction.id);
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
            <MobileDatePicker
              label='Date'
              value={dayjs(date)}
              onChange={handleChangeDate}
            />

            <TextField
              margin='dense'
              label='Amount'
              type='number'
              fullWidth
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
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
          value={note}
          onChange={(e) => setNote(e.target.value)}
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
