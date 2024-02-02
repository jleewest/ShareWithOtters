import { useTransactionContext } from '../index';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export type DatedTransaction = {
  date: string;
  amount: number;
  renderType: string;
};

const WaveChart = () => {
  const { transactions } = useTransactionContext();
  const [groupedTransactions, setGroupedTransactions] = useState<
    DatedTransaction[][]
  >([]);
  const [pendingExpense, setPendingExpense] = useState<DatedTransaction[]>();
  const [pendingPayment, setPendingPayment] = useState<DatedTransaction[]>();
  const [awaitedPending, setAwaitedPending] = useState<DatedTransaction[]>();
  const [received, setReceived] = useState<DatedTransaction[]>();
  const [confirmedActorExpenses, setConfirmedActorExpenses] =
    useState<DatedTransaction[]>();
  const [confirmedActeeExpenses, setConfirmedActeeExpenses] =
    useState<DatedTransaction[]>();
  const { user } = useUser();

  // To each transaction: set date without time, amount, and renderType
  useEffect(() => {
    if (transactions && user) {
      setPendingExpense(
        transactions.pending.expense.map((transaction) => ({
          date: new Date(transaction.date).toLocaleDateString(),
          amount: transaction.amount,
          renderType: 'pendingExpense',
        }))
      );
      setPendingPayment(
        transactions.pending.payment.map((transaction) => ({
          date: new Date(transaction.date).toLocaleDateString(),
          amount: transaction.amount,
          renderType: 'pendingPayment',
        }))
      );
      if (transactions) {
        setAwaitedPending(
          transactions.active.expense.awaitedPendingExpenseSentToOther.map(
            (transaction) => ({
              date: new Date(transaction.date).toLocaleDateString(),
              amount: transaction.amount,
              renderType: 'awaitedPending',
            })
          )
        );
        setConfirmedActeeExpenses(
          transactions.active.expense.confirmedExpenses
            .filter((transaction) => {
              transaction.transactee === user.id &&
                transaction.transactor !== user.id;
            })
            .map((transaction) => ({
              date: new Date(transaction.date).toLocaleDateString(),
              amount: transaction.amount,
              renderType: 'confirmedActeeExpense',
            }))
        );
        setConfirmedActorExpenses(
          transactions.active.expense.confirmedExpenses
            .filter((transaction) => {
              transaction.transactee !== user.id &&
                transaction.transactor === user.id;
            })
            .map((transaction) => ({
              date: new Date(transaction.date).toLocaleDateString(),
              amount: transaction.amount,
              renderType: 'confirmedActorExpense',
            }))
        );
        setReceived(
          transactions.active.payment.received.map((transaction) => ({
            date: new Date(transaction.date).toLocaleDateString(),
            amount: transaction.amount,
            renderType: 'received',
          }))
        );
      }
    }
  }, [transactions, user]);

  ////Group transactions by day
  useEffect(() => {
    if (
      pendingExpense &&
      pendingPayment &&
      confirmedActeeExpenses &&
      confirmedActorExpenses &&
      awaitedPending &&
      received
    ) {
      const allTransactions = [
        ...pendingExpense,
        ...pendingPayment,
        ...confirmedActeeExpenses,
        ...confirmedActorExpenses,
        ...awaitedPending,
        ...received,
      ];

      //sort transactions by date
      const sortedTransactions = allTransactions.sort((a, b) =>
        a.date.localeCompare(b.date)
      );

      //create array of date arrays containing respective transactions
      const groupedTransactions: DatedTransaction[][] = [];
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
  }, [
    pendingExpense,
    pendingPayment,
    confirmedActeeExpenses,
    confirmedActorExpenses,
    awaitedPending,
    received,
  ]);

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
