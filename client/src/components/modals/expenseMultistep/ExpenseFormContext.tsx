import { useState, useEffect } from 'react';
import { TransactionData, TransactionsDataContext } from '../../../index';
import AddExpenseForm from './AddExpenseFrom';
import { useUser } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';

type ExpenseFormProps = {
  open: boolean;
  onClose: () => void;
};

const ExpenseForm = ({ open, onClose }: ExpenseFormProps) => {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const params = useParams();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setTransactionData({
        type: 'expense',
        date: '',
        transactor: user.id,
        transactee: [user.id],
        description: '',
        groupId: Number(params.id),
        amount: [],
        notes: '',
      });
    }
  }, [user]);

  return (
    <div className='ExpenseForm'>
      {transactionData ? (
        <TransactionsDataContext.Provider
          value={{ transactionData, setTransactionData }}
        >
          <AddExpenseForm openExpense={open} onCloseExpense={onClose} />
        </TransactionsDataContext.Provider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExpenseForm;
