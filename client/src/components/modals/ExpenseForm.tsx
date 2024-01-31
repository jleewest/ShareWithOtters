import { useState, useEffect } from 'react';
import { TransactionData, TransactionsDataContext } from '../../index';
import AddExpenseForm from './AddExpenseFrom';
import { useUser } from '@clerk/clerk-react';
import { createTransaction } from '../../apiServices/transaction';

type ExpenseFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const ExpenseForm = ({ open, onClose }: ExpenseFormProps) => {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const { user } = useUser();
  if (!user) return null;

  useEffect(() => {
    setTransactionData({
      type: 'expense',
      date: '',
      transactor: user.id,
      transactee: [user.id],
      description: '',
      amount: [],
      notes: '',
    });
  }, []);

  const handleSubmit = async () => {
    // postTransaction will happen here!
    console.log('Form submitted');
    onClose();

    createTransaction(transactionData!);
  };

  return (
    <div className='ExpenseForm'>
      {transactionData ? (
        <TransactionsDataContext.Provider
          value={{ transactionData, setTransactionData }}
        >
          <AddExpenseForm
            open={open}
            onClose={onClose}
            handleSubmit={handleSubmit}
          />
        </TransactionsDataContext.Provider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExpenseForm;
