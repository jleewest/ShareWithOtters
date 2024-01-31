import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useTransactionDataContext } from '../../index';
import AddFriendsToExpenseForm from './AddFriendsToExpenseForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

type AddExpenseFormProps = {
  openExpense: boolean;
  onCloseExpense: () => void;
};

const AddExpenseForm = ({
  openExpense,
  onCloseExpense,
}: AddExpenseFormProps) => {
  const { setTransactionData } = useTransactionDataContext();
  const { user } = useUser();
  if (!user) return null;
  const [date, setDate] = useState<string>(new Date().toString());
  const [description, setDescription] = useState<string>();
  const [amount, setAmount] = useState<string>();

  const [isAddFriendsFormOpen, setAddFriendsFormOpen] = useState(false);
  const openAddFriendsForm = () => setAddFriendsFormOpen(true);
  const closeAddFriendsForm = () => setAddFriendsFormOpen(false);

  const handleNext = () => {
    if (!date || !description || !amount) {
      return;
    }
    //add inputs to setTransactions body
    setTransactionData({
      type: 'expense',
      date: date,
      transactor: user.id,
      transactee: [user.id],
      description: description,
      amount: [Number(amount)],
      notes: '',
    });
    setDate('');
    setDescription('');
    setAmount('');
    openAddFriendsForm();
    onCloseExpense();
  };
  //date change handling
  function handleDateChange(date: any) {
    if (date && typeof date === 'object' && '$d' in date) {
      const newDate = new Date(date);
      setDate(newDate.toString());
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
    <div className='AddExpenseForm'>
      <Dialog
        open={openExpense}
        onClose={() => {
          setDate('');
          setDescription('');
          setAmount('');
          onCloseExpense();
        }}
      >
        <DialogTitle>Add an Expense</DialogTitle>
        <DialogContent>
          {/* Expense form fields */}
          <MobileDatePicker
            onChange={handleDateChange}
            defaultValue={dayjs(Date.now())}
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Expense description'
            type='text'
            name='description'
            fullWidth
            value={description}
            onChange={handleInputChange}
            required
          />
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Amount'
            type='number'
            fullWidth
            name='amount'
            value={amount}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseExpense}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>
      <AddFriendsToExpenseForm
        openFriendForm={isAddFriendsFormOpen}
        onCloseFriendForm={closeAddFriendsForm}
      />
    </div>
  );
};

export default AddExpenseForm;
