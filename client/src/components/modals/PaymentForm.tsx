import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { createTransaction } from '../../apiServices/transaction'
import { useUser } from '@clerk/clerk-react';

type PaymentFormProps = {
  open: boolean;
  onClose: () => void;
  refreshTransactions: () => void; // prop for refreshing transactions
};

const PaymentForm = ({ open, onClose, refreshTransactions }: PaymentFormProps) => {
  const { user } = useUser(); // Get the logged-in user's information
  const [transactee, setTransactee] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [paymentName, setPaymentName] = useState('')

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user || !user.id) {
      console.error('User ID is undefined');
      return;
    }

    const newTransaction = {
      transactor: user.id, // Assuming user.id is a string
      transactee: [transactee],
      amount: [parseFloat(amount)],
      date,
      description,
      type: 'payment',
      notes: '', // Initialize as empty string
    };

    try {
      await createTransaction(newTransaction);
      console.log('Payment posted successfully');
      onClose(); // Close the modal
      await refreshTransactions(); // Refresh the transactions list
    } catch (error) {
      console.error('Failed to create transaction', error);
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Payment</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="paymentName"
            label="What is it for?"
            type="text"
            fullWidth
            value={paymentName}
            onChange={(e) => setPaymentName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="transactee"
            label="Who do you owe?"
            type="text"
            fullWidth
            value={transactee}
            onChange={(e) => setTransactee(e.target.value)}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            id="date"
            label="Date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PaymentForm;
