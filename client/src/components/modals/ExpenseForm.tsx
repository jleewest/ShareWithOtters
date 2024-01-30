import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import AddFriendsToExpenseForm from './AddFriendsToExpenseForm';
import { useState } from 'react';
import { createTransaction } from '../../apiServices/transaction';
import { useUser } from '@clerk/clerk-react';
import { TransactionData, TransactionsDataContext } from '../../index';

type ExpenseFormProps = {
  open: boolean;
  onClose: () => void;
};

const ExpenseForm = ({ open, onClose }: ExpenseFormProps) => {
  const { user } = useUser();
  const [transactionData, setTransactionData] = useState<TransactionData>();
  const [date, setDate] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<string>();

  const [isAddFriendsFormOpen, setAddFriendsFormOpen] = useState(false);
  const openAddFriendsForm = () => setAddFriendsFormOpen(true);
  const closeAddFriendsForm = () => setAddFriendsFormOpen(false);

  const transactionAmounts: number[] = [];
  const transactionFriends: string[] = [user.id];

  const handleSubmit = async () => {
    // postTransaction will happen here!
    console.log('Form submitted');
    onClose();

    createTransaction(transactionData!);
  };

  const handleNext = () => {
    //add inputs to setTransactions body
    setTransactionData({
      type: 'expense',
      date: date!,
      transactor: user.id,
      transactee: [user.id], //import from AddFriends
      description: description!, //e.target.description
      amount: [Number(amount)], //import from AddSplit
      notes: '',
    });
    openAddFriendsForm();
    onClose(); //move to close in AddFriends or have back button to return? then close all in submit?
  };

  function handleDateChange(date: string | null) {
    if (date && typeof date === 'object' && '$d' in date) {
      setDate(date.$d);
    }
  }

  // Form field change handling
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className='ExpenseForm'>
      <TransactionsDataContext.Provider
        value={{ transactionData, setTransactionData }}
      >
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>Add an Expense</DialogTitle>
          <DialogContent>
            {/* Expense form fields */}
            <DatePicker value={date} onChange={handleDateChange} />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Expense description'
              type='text'
              fullWidth
              value={description}
              onChange={handleInputChange}
            />
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Amount'
              type='number'
              fullWidth
              value={amount}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleNext}>Next</Button>
          </DialogActions>
        </Dialog>
        <AddFriendsToExpenseForm
          open={isAddFriendsFormOpen}
          onClose={closeAddFriendsForm}
          handleSubmit={handleSubmit}
          transactionAmounts={transactionAmounts}
          transactionFriends={transactionFriends}
        />
      </TransactionsDataContext.Provider>
    </div>
  );
};

export default ExpenseForm;
