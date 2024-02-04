import { useState } from 'react';
import { useTransactionDataContext } from '../../../index';
import TextField from '@mui/material/TextField';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { useUser } from '@clerk/clerk-react';

type StepOneProps = {
  handleNext: () => void;
  steps: string[];
  activeStep: number;
};

const StepOne = ({ handleNext, activeStep, steps }: StepOneProps) => {
  const { setTransactionData } = useTransactionDataContext();
  const [description, setDescription] = useState<string>();
  const [date, setDate] = useState<string>(new Date().toString());
  const [amount, setAmount] = useState<string>();

  const { user } = useUser();
  if (!user) return null;

  const setTransaction = () => {
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
  };

  //date change handling
  //@ts-expect-error date is coming from Day.js
  function handleDateChange(date) {
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
    <div className='StepOne'>
      {/* Expense form fields */}
      <form action=''>
        <MobileDatePicker
          onChange={handleDateChange}
          //value={date}
          defaultValue={dayjs(Date.now())}
        />
        <TextField
          style={{ margin: '1rem auto' }}
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
      </form>
      <div>
        <>
          {date && description && amount && (
            <button
              className='primary-btn'
              style={{ backgroundColor: 'var(--secondary-color)' }}
              onClick={() => {
                handleNext();
                setTransaction();
              }}
            >
              {activeStep === steps.length ? 'Finish' : 'Next'}
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default StepOne;
