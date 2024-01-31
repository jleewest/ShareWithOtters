import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SubmitExpenseForm from './SubmitExpenseForm';
import { useTransactionDataContext } from '../../index';
import { useEffect } from 'react';
import { getUserByClerkId } from '../../apiServices/user';
import { User } from '../../index';

//should get array of friends and single amount from TransactionData context and update amount of TransactionData with array of amounts

type AddSplitFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const AddSplitForm = ({ open, onClose, handleSubmit }: AddSplitFormProps) => {
  const [isSubmitExpenseFormOpen, setSubmitExpenseFormOpen] = useState(false);
  const openSubmitExpenseForm = () => setSubmitExpenseFormOpen(true);
  const closeSubmitExpenseForm = () => setSubmitExpenseFormOpen(false);
  const [payees, setPayees] = useState<User[]>([]);
  const [amounts, setAmounts] = useState<number[]>([]);
  const { transactionData, setTransactionData } = useTransactionDataContext();

  useEffect(() => {
    const fetchData = async () => {
      const payeesData = [];

      for (const clerkId of transactionData.transactee) {
        try {
          const userData = await getUserByClerkId(clerkId);
          payeesData.push(userData);
        } catch (error) {
          console.log('Error fetching user');
        }
      }
      setPayees(payeesData);
    };
    fetchData();
  }, [transactionData]);

  useEffect(() => {
    const transactionDataAmount = transactionData.amount[0];
    const defaultEvenSplit =
      Math.round((transactionDataAmount / payees.length) * 100) / 100;
    const defaultAmounts = Array(payees.length).fill(defaultEvenSplit);
    setAmounts(defaultAmounts);
  }, [payees]);

  //calculate default even split value

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAmounts = [...amounts];
      newAmounts[index] = Number(e.target.value);
      setAmounts(newAmounts);
    };

  //default value is even split
  //need to get amount here from transactionData...
  //sends amount array to Expense form

  const handleNext = () => {
    console.log(amounts);
    //add inputs to setTransactions body
    openSubmitExpenseForm();
    onClose();
  };

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Split: ${transactionData.amount[0]}</DialogTitle>
        <DialogContent>
          {payees.length > 0 ? (
            payees.map((payee: User, index: number) => {
              return (
                <div key={index}>
                  <label>{payee.firstName}</label>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='Amount'
                    type='number'
                    fullWidth
                    name='amount'
                    value={amounts[index] || amounts}
                    onChange={handleChange(index)}
                  />
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>
      <SubmitExpenseForm
        open={isSubmitExpenseFormOpen}
        onClose={closeSubmitExpenseForm}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddSplitForm;
