import { useState, useEffect } from 'react';
import { TransactionData, TransactionsDataContext } from '../../index';
import AddPaymentForm from './AddPaymentForm';
import { useUser } from '@clerk/clerk-react';

type PaymentFormProps = {
  open: boolean;
  onClose: () => void;
};

const PaymentForm = ({ open, onClose }: PaymentFormProps) => {
  const [transactionData, setTransactionData] =
    useState<TransactionData | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setTransactionData({
        type: 'payment',
        date: '',
        transactor: user.id,
        transactee: [user.id],
        description: '',
        amount: [],
        notes: '',
      });
    }
  }, [user]);

  return (
    <div className='PaymentForm'>
      {transactionData ? (
        <TransactionsDataContext.Provider
          value={{ transactionData, setTransactionData }}
        >
          <AddPaymentForm openPayment={open} onClosePayment={onClose} />
        </TransactionsDataContext.Provider>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PaymentForm;
