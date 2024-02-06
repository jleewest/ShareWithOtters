import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Autocomplete } from '@mui/material';
import { getAllUsers } from '../../apiServices/user';
import { User, TransactionData } from '../../index'; // Ensure TransactionData is correctly imported
import { createTransaction } from '../../apiServices/transaction';
import dayjs from 'dayjs';
import { Params, useParams } from 'react-router-dom';

type AddPaymentFormProps = {
  open: boolean;
  onClose: () => void;
};

const AddPaymentForm: React.FC<AddPaymentFormProps> = ({ open, onClose }) => {
  const { user } = useUser();
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [amount, setAmount] = useState<string>('');
  const [selectedFriends, setSelectedFriends] = useState<User | null>();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const params = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users.filter((u) => u.clerkId !== user?.id));
    };
    fetchUsers();
  }, [user]);

  const handleSubmit = async () => {
    if (!date || !description || !amount || !user) {
      console.error('Missing information');
      return;
    }

    const newTransaction: TransactionData = {
      type: 'payment',
      date: date.toISOString(),
      transactor: user.id,
      transactee: [selectedFriends?.clerkId || 'No transactee yet'],
      description,
      groupId: Number(params.id),
      amount: [parseFloat(amount)],
      notes: '',
    };

    try {
      await createTransaction(newTransaction);
      console.log('Payment successfully created');
      setDescription('');
      setDate(dayjs());
      setAmount('');
      setSelectedFriends(null);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Failed to create payment transaction', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Payment</DialogTitle>
      <DialogContent>
        <MobileDatePicker label='Date' value={date} onChange={setDate} />
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
          margin='dense'
          label='Amount'
          type='number'
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Autocomplete
          options={allUsers}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(_, newValue) => setSelectedFriends(newValue)}
          renderInput={(params) => (
            <TextField {...params} label='Select friends' />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPaymentForm;
