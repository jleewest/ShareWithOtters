import '../css/TransactionTable.css';
import { Transaction } from '../index';
import { useTransactionContext } from '../index';
import { useState, useEffect } from 'react';

type TransactionTableProps = {
  status: string;
};

export type TransactionPendingReturn = {
  expense: Transaction[];
  payment: Transaction[];
};
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

const TransactionTable = ({
  status,
}: //refreshTransactions
TransactionTableProps) => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] = useState<
    TransactionPendingReturn | TransactionActiveReturn
  >();

  //EXAMPLE
  //if (transactionsByStatus && 'paid' in transactionsByStatus.payment) {
  //  console.log(transactionsByStatus?.payment.paid);
  //}
  useEffect(() => {
    // Use the appropriate transactions based on the status prop
    if (status === 'pending') {
      setTransactionsByStatus(transactions.pending);
    } else {
      setTransactionsByStatus(transactions.active);
    }
  }, [status, transactions]); // Run the effect when status or transactions change

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
