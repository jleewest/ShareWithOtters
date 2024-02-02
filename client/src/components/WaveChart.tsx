import { TransactionWithUser } from '../index';
import { useTransactionContext } from '../index';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const WaveChart = () => {
  const { transactions } = useTransactionContext();
  const [groupedTransactions, setGroupedTransactions] = useState<
    TransactionWithUser[][]
  >([]);
  const { user } = useUser();

  ////Group transactions by day
  useEffect(() => {
    if (transactions) {
      const allTransactions = [
        ...transactions.pending.expense,
        ...transactions.pending.payment,
        ...transactions.active.expense.confirmedExpenses,
        ...transactions.active.payment.received,
        ...transactions.active.expense.awaitedPendingExpenseSentToOther,
        ...transactions.active.payment.paid,
        ...transactions.active.payment.pendingPaid,
      ];

      //sort transactions by date
      const sortedTransactions = allTransactions
        .filter(
          (transaction) => transaction.transactor !== transaction.transactee
        )
        .sort((a, b) => a.date.localeCompare(b.date));

      //create array of date arrays containing respective transactions
      const groupedTransactions: TransactionWithUser[][] = [];
      sortedTransactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.date).toLocaleDateString();
        console.log(transactionDate);
        let existingArray = groupedTransactions.find(
          (existingDateGroup) =>
            new Date(existingDateGroup[0].date).toLocaleDateString() ===
            transactionDate
        );
        if (!existingArray) {
          existingArray = [];
          groupedTransactions.push(existingArray);
        }
        existingArray.push(transaction);
      });
      setGroupedTransactions(groupedTransactions);
    }
  }, [transactions]);

  console.log(groupedTransactions);

  // Group transactions by month and calculate total lent and owed
  //export const groupByMonth = (transactions: TransactionReturn) => {
  //  return transactions.reduce((acc, transaction) => {
  //    const month = new Date(transaction.date).getMonth();
  //    if (!acc[month]) acc[month] = 0;
  //    // Use absolute value of amount
  //    acc[month] += Math.abs(transaction.amount);
  //    return acc;
  //  }, {} as Record<number, number>);
  //};

  return (
    <div
      className='WaveChart'
      style={{ border: '2px solid var(--dark-accent-color)' }}
    >
      <h1>Wave Chart Render Here</h1>
    </div>
  );
};

export default WaveChart;
