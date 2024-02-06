import { useState, useEffect } from 'react';
import { useTransactionDataContext } from '../../../index';
import { getUserByClerkId } from '../../../apiServices/user';
import { Button } from '@mui/material';
import moment from 'moment';
import { useUser } from '@clerk/clerk-react';

type ReviewTransactionProps = {
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
  steps: string[];
  activeStep: number;
};

type userAmountSplit = {
  user: string;
  userId: string;
  amount: number;
};

const ReviewTransaction = ({
  handleBack,
  handleNext,
  handleSubmit,
  activeStep,
  steps,
}: ReviewTransactionProps) => {
  const [userAmountSplit, setUserAmountSplit] = useState<userAmountSplit[]>();
  const { transactionData } = useTransactionDataContext();
  const { user } = useUser();

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
            userId: userById.clerkId,
            amount: transactionData.amount[i],
          });
        }
      }
      setUserAmountSplit(userAmountArray);
    };
    getUserAmountSplit();
  }, [transactionData]);

  return (
    <div className='ReviewTransaction'>
      {/* Expense form fields */}
      <form action=''>
        {transactionData ? (
          <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '400' }}>
              Ready to Submit?
            </h2>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '400',
                color: 'var(--primary-color)',
                lineHeight: '1.3rem',
              }}
            >
              Date: {moment(transactionData.date).format('ll')}
            </div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '400',
                color: 'var(--primary-color)',
                lineHeight: '1.3rem',
              }}
            >
              Description: {transactionData.description}
            </div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: '400',
                color: 'var(--primary-color)',
                lineHeight: '1.3rem',
              }}
            >
              {userAmountSplit &&
                userAmountSplit.map((users) => {
                  return (
                    <div key={users.user}>
                      {user && users.userId === user.id ? 'You' : users.user}: $
                      {users.amount}
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
        <Button
          onClick={() => {
            handleBack();
          }}
        >
          BACK{' '}
        </Button>
        <>
          <button
            className='primary-btn'
            style={{ backgroundColor: 'var(--secondary-color)' }}
            onClick={() => {
              handleNext();
              handleSubmit();
            }}
          >
            {activeStep === steps.length ? 'Finish' : 'Submit'}
          </button>
        </>
      </div>
    </div>
  );
};

export default ReviewTransaction;
