import { useState, useEffect } from 'react';
import { useTransactionDataContext } from '../../../index';
import { getUserByClerkId } from '../../../apiServices/user';
import { Button } from '@mui/material';
import moment from 'moment';

type ReviewTransactionProps = {
  handleNext: () => void;
  handleSubmit: () => void;
  steps: string[];
  activeStep: number;
};

type userAmountSplit = {
  user: string;
  amount: number;
};

const ReviewTransaction = ({
  handleNext,
  handleSubmit,
  activeStep,
  steps,
}: ReviewTransactionProps) => {
  const [userAmountSplit, setUserAmountSplit] = useState<userAmountSplit[]>();
  const { transactionData } = useTransactionDataContext();

  useEffect(() => {
    const getUserAmountSplit = async () => {
      const userAmountArray = [];
      if (transactionData) {
        for (let i = 0; i < transactionData.transactee.length; i++) {
          const userById = await getUserByClerkId(
            transactionData.transactee[i]
          );
          userAmountArray.push({
            user: userById.firstName,
            amount: transactionData.amount[i],
          });
        }
      }
      setUserAmountSplit(userAmountArray);
    };
    getUserAmountSplit();
  }, []);

  return (
    <div className='AddExpenseForm'>
      {/* Expense form fields */}
      <form action=''>
        {transactionData ? (
          <div>
            <h2>Ready to Submit?</h2>
            <div>Date: {moment(transactionData.date).format('ll')}</div>
            <div>Description: {transactionData.description}</div>
            <div>
              Split:{' '}
              {userAmountSplit &&
                userAmountSplit.map((user) => {
                  return (
                    <div key={user.user}>
                      {user.user}: ${user.amount}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </form>
      <div>
        <>
          <Button
            onClick={() => {
              handleNext();
              handleSubmit();
            }}
          >
            {activeStep === steps.length ? 'Finish' : 'Submit'}
          </Button>
        </>
      </div>
    </div>
  );
};

export default ReviewTransaction;
