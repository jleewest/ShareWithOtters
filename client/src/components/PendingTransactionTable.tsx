import '../css/TransactionTable.css';
import { Transaction } from '../index';
import { useTransactionContext } from '../index';
import { useState, useEffect } from 'react';

export type TransactionPendingReturn = {
  expense: Transaction[];
  payment: Transaction[];
};

const PendingTransactionTable = () => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] =
    useState<TransactionPendingReturn>();

  // Use only transactions with pending status
  useEffect(() => {
    setTransactionsByStatus(transactions.pending);
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

export default PendingTransactionTable;
