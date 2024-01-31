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
import { createTransaction } from '../../apiServices/transaction';
import { Transaction } from '../../index';

type AddSplitFormProps = {
  openSplitForm: boolean;
  onCloseSplitForm: () => void;
};

const AddSplitForm = ({
  openSplitForm,
  onCloseSplitForm,
}: AddSplitFormProps) => {
  const [isSubmitExpenseFormOpen, setSubmitExpenseFormOpen] = useState(false);
  const openSubmitExpenseForm = () => setSubmitExpenseFormOpen(true);
  const closeSubmitExpenseForm = () => setSubmitExpenseFormOpen(false);
  const [payees, setPayees] = useState<User[]>([]);
  const [defaultAmounts, setDefaultAmounts] = useState<number[]>([]);
  const [evenSplitAmount, setEvenSplitAmount] = useState<number>(0);
  const [customAmounts, setCustomAmounts] = useState<number[]>([]);
  const { transactionData, setTransactionData } = useTransactionDataContext();
  const [submissionResponse, setSubmissionResponse] = useState<Transaction[]>(
    []
  );

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
    setEvenSplitAmount(defaultEvenSplit);
    const defaultAmount = Array(payees.length).fill(defaultEvenSplit);
    setDefaultAmounts(defaultAmount);
  }, []);

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAmounts = [...customAmounts];
      newAmounts[index] = Number(e.target.value);
      setCustomAmounts(newAmounts);
    };

  const handleSubmission = async () => {
    console.log(transactionData);
    await createTransaction(transactionData).then((data) => {
      setSubmissionResponse(data);
    });
    openSubmitExpenseForm();
    onCloseSplitForm();
  };

  const handleNext = () => {
    let payeeAmounts;
    if (customAmounts.length > 0) {
      payeeAmounts = customAmounts;
    } else {
      payeeAmounts = defaultAmounts;
    }
    setTransactionData({
      ...transactionData,
      amount: payeeAmounts,
    });
    handleSubmission();
  };

  return (
    <div className='AddFriendsToExpenseForm'>
      <Dialog open={openSplitForm} onClose={onCloseSplitForm}>
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
                    value={customAmounts[index] || evenSplitAmount}
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
          <Button onClick={onCloseSplitForm}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>
      <SubmitExpenseForm
        openSubmitForm={isSubmitExpenseFormOpen}
        onCloseSubmitForm={closeSubmitExpenseForm}
        submissionResponse={submissionResponse}
      />
    </div>
  );
};

export default AddSplitForm;
