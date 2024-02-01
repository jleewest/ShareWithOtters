import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useTransactionDataContext } from '../../index';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Autocomplete } from '@mui/material';
import { getAllUsers } from '../../apiServices/user';
import { User } from '../../index';
import dayjs from 'dayjs';

type AddPaymentFormProps = {
  openPayment: boolean;
  onClosePayment: () => void;
};

const AddPaymentForm: React.FC<AddPaymentFormProps> = ({
  openPayment,
  onClosePayment,
}) => {
  const { setTransactionData } = useTransactionDataContext();
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [amount, setAmount] = useState<string>('');
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users.filter(u => u.clerkId !== user?.id));
    };

    fetchUsers();
  }, [user]);

  const handleSubmit = () => {
    if (!date || !description || !amount || !user) {
      console.error("Missing information");
      return;
    }

    setTransactionData({
      type: 'payment',
      date: date.toISOString(),
      transactor: user.id,
      transactee: selectedFriends.map(friend => friend.clerkId),
      description,
      amount: [parseFloat(amount)],
      notes: '',
    });

    onClosePayment(); // Close the modal after setting the transaction data
  };

  return (
    <Dialog open={openPayment} onClose={onClosePayment}>
      <DialogTitle>Add a Payment</DialogTitle>
      <DialogContent>
        <MobileDatePicker
          label="Date"
          value={date}
          onChange={setDate}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Payment description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Autocomplete
          multiple
          options={allUsers}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={(event, newValue) => {
            setSelectedFriends(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Select friends" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClosePayment}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPaymentForm;
