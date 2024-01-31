import '../css/TransactionTable.css';
import { Transaction } from '../index';
import { useTransactionContext } from '../index';
import { useState, useEffect } from 'react';

export type TransactionActiveReturn = {
  expense: {
    awaitedPendingExpenseFromSentToOther: Transaction[];
    confirmedExpenses: Transaction[];
  };
  payment: {
    paid: Transaction[];
    pendingPaid: Transaction[];
    received: Transaction[];
  };
};

const TransactionTable = () => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] =
    useState<TransactionActiveReturn>();

  // Use only transactions with active status
  useEffect(() => {
    setTransactionsByStatus(transactions.active);
  }, [transactions]);

  console.log(transactionsByStatus);

  return (
    <div className='TransactionTable'>
      <table className='transaction-table'>
        <thead>
          <tr>
            <th>Status</th>
            <th>Transactor</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/*{transactionsByStatus.length > 0 ? (
            transactionsByStatus.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <tr>
              <td>No transactions found</td>
            </tr>
          )}*/}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
