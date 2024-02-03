import { useState, useEffect } from 'react';
import { useTransactionDataContext, User } from '../../../index';
import { getUserByClerkId } from '../../../apiServices/user';
import { Button } from '@mui/material';
import moment from 'moment';

type ReviewTransactionProps = {
  handleNext: () => void;
  steps: string[];
  activeStep: number;
};

type userAmountSplit = {
  user: string;
  amount: number;
};

const ReviewTransaction = ({
  handleNext,
  activeStep,
  steps,
}: ReviewTransactionProps) => {
  //const [isSubmissionResponseOpen, setSubmissionResponseOpen] =
  //  useState(false);
  ////const openSubmissionResponse = () => setSubmissionResponseOpen(true);
  ////const closeSubmissionResponse = () => setSubmissionResponseOpen(false);
  //const [submissionResponse, setSubmissionResponse] = useState<Transaction[]>(
  //  []
  //);
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

  //const handleSubmission = () => {
  //  console.log(transactionData);
  //  createTransaction(transactionData).then((data) => {
  //    setSubmissionResponse(data);
  //  });
  //  openSubmissionResponse();
  //  onCloseSubmitForm();
  //};

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
              //handleSubmit();
            }}
          >
            Submit
          </Button>
        </>
      </div>
    </div>
  );
};

export default ReviewTransaction;
