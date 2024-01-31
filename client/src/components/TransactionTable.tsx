import TransactionItem from './TransactionItem';
import '../css/TransactionTable.css';
import { Transaction } from '../index';
import { useTransactionContext } from '../index';
import { useState } from 'react';

type TransactionTableProps = {
  status: string;
};

type TransactionReturn = {
  pending: { expense: Transaction[]; payment: Transaction[] };
  active: {
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
};

const TransactionTable = ({
  status,
}: //refreshTransactions
TransactionTableProps) => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] =
    useState<TransactionReturn>();

  if (status === 'pending') {
    setTransactionsByStatus([transactions.pending]);
  } else {
    setTransactionsByStatus(transactions.active);
  }

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
          {transactionsByStatus.length > 0 ? (
            transactionsByStatus.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <tr>
              <td>No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
