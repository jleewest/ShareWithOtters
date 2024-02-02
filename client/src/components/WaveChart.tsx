import { useTransactionContext } from '../index';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export type DatedTransaction = {
  date: string;
  amount: number;
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
        }))
      );
      setPendingPayment(
        transactions.pending.payment.map((transaction) => ({
          date: new Date(transaction.date).toLocaleDateString(),
          amount: -transaction.amount,
        }))
      );
      if (transactions) {
        setAwaitedPending(
          transactions.active.expense.awaitedPendingExpenseSentToOther.map(
            (transaction) => ({
              date: new Date(transaction.date).toLocaleDateString(),
              amount: transaction.amount,
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
              amount: -transaction.amount,
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
            }))
        );
        setReceived(
          transactions.active.payment.received.map((transaction) => ({
            date: new Date(transaction.date).toLocaleDateString(),
            amount: -transaction.amount,
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

  //reduce each date-array to net amount
  useEffect(() => {
    if (groupedTransactions) {
      const calculateDailyNetBalance = () => {
        const dailyNetBalance = groupedTransactions.map((dateArray) => {
          const date = dateArray[0].date;
          const accumulatedAmount = dateArray.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          );
          return { x: date, y: accumulatedAmount };
        });
        console.log(dailyNetBalance);
      };
      calculateDailyNetBalance();
    }
  }, [groupedTransactions]);

  console.log(groupedTransactions);

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
