import { useState, useEffect } from 'react';
import { useTransactionDataContext, User } from '../../../index';
import { getUserByClerkId } from '../../../apiServices/user';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useUser } from '@clerk/clerk-react';
import _ from 'lodash';

type StepThreeProps = {
  handleBack: () => void;
  handleNext: () => void;
  steps: string[];
  activeStep: number;
};

const StepThree = ({
  handleNext,
  activeStep,
  steps,
  handleBack,
}: StepThreeProps) => {
  const [payees, setPayees] = useState<User[]>([]);
  const [defaultAmounts, setDefaultAmounts] = useState<number[]>([]);
  const [evenSplitAmount, setEvenSplitAmount] = useState<number>(0);
  const [customAmounts, setCustomAmounts] = useState<number[]>([]);
  const { user } = useUser();

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
    setEvenSplitAmount(defaultEvenSplit);
    const defaultAmount = Array(payees.length).fill(defaultEvenSplit);
    setDefaultAmounts(defaultAmount);
  }, [payees.length, transactionData.amount]);

  // Form field change handling
  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAmounts = [...customAmounts];
      newAmounts[index] = Number(e.target.value);
      setCustomAmounts(newAmounts);
    };

  const setTransaction = () => {
    let payeeAmounts;
    if (customAmounts.length > 0) {
      payeeAmounts = _.defaults(customAmounts, defaultAmounts);
    } else {
      payeeAmounts = defaultAmounts;
    }
    setTransactionData({
      ...transactionData,
      amount: payeeAmounts,
    });
  };

  return (
    <div className='StepThree'>
      {/* Expense form fields */}
      <form action=''>
        {payees.length > 0 ? (
          payees.map((payee: User, index: number) => {
            return (
              <div style={{ margin: '1rem auto' }} key={index}>
                <label style={{ fontSize: '1.25rem', fontWeight: '400' }}>
                  {user && payee.clerkId === user.id ? 'You' : payee.firstName}
                </label>
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
      </form>
      <div>
        <Button
          onClick={() => {
            handleBack();
          }}
        >
          BACK{' '}
        </Button>
        <>
          {payees.length > 0 && (
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

export default StepThree;
