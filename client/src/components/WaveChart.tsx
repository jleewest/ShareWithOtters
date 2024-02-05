import { useTransactionContext } from '../index';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Filler);

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
  const [paid, setPaid] = useState<DatedTransaction[]>();
  const [pendingPaid, setPendingPaid] = useState<DatedTransaction[]>();

  const [netDataDate, setNetDataDate] = useState<string[]>([]);
  const [netDataAmount, setNetDataAmount] = useState<number[]>([]);
  const { user } = useUser();
  // To each transaction: set date without time, amount, and renderType
  useEffect(() => {
    if (transactions && user) {
      setPendingExpense(
        transactions.pending.expense.map((transaction) => ({
          date: new Date(transaction.date).toLocaleDateString(),
          amount: -transaction.amount,
        }))
      );
      setPaid(
        transactions.active.payment.paid.map((transaction) => ({
          date: new Date(transaction.date).toLocaleDateString(),
          amount: transaction.amount,
        }))
      );
      setPendingPaid(
        transactions.active.payment.pendingPaid.map((transaction) => ({
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
            .filter(
              (transaction) =>
                transaction.transactee === user.id &&
                transaction.transactor !== user.id
            )
            .map((transaction) => ({
              date: new Date(transaction.date).toLocaleDateString(),
              amount: -transaction.amount,
            }))
        );
        setConfirmedActorExpenses(
          transactions.active.expense.confirmedExpenses
            .filter(
              (transaction) =>
                transaction.transactor === user.id &&
                transaction.transactee !== user.id
            )
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
      paid &&
      pendingPaid &&
      confirmedActeeExpenses &&
      confirmedActorExpenses &&
      awaitedPending &&
      received
    ) {
      const allTransactions = [
        ...pendingExpense,
        ...pendingPayment,
        ...paid,
        ...pendingPaid,
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
    paid,
    pendingPaid,
    confirmedActeeExpenses,
    confirmedActorExpenses,
    awaitedPending,
    received,
  ]);

  //reduce each date-array to net amount
  useEffect(() => {
    if (groupedTransactions) {
      const calculateDailyNetBalance = () => {
        let cumulativeBalance = 0;
        const dailyBalance = groupedTransactions.map((dateArray) => {
          const date = dateArray[0].date;
          cumulativeBalance += dateArray.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
          );
          return {
            date: date,
            amount: cumulativeBalance,
          };
        });
        const limitedBalance = dailyBalance.slice(
          Math.max(0, dailyBalance.length - 10)
        );
        setNetDataAmount(limitedBalance.map((balance) => balance.amount));
        setNetDataDate(
          limitedBalance.map((balance) => moment(balance.date).format('MMM D'))
        );
      };
      calculateDailyNetBalance();
    }
  }, [groupedTransactions]);

  const data = {
    labels: netDataDate,
    datasets: [
      {
        data: netDataAmount,
        borderColor: 'rgb(15, 121, 134, 0.5)',
        fill: true,
        pointBorderColor: (context: any) => {
          const value = context.raw || 0;
          return value >= 0 ? '#0f7986' : '#c931a9';
        },
        backgroundColor: (context: any) => {
          const value = context.raw || 0;
          return value >= 0 ? 'rgb(15, 121, 134, 0.5)' : '#c931a9';
        },
      },
    ],
  };

  const options = {
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };
  return (
    <div
      className='WaveChart'
      style={{
        border: '2px solid var(--primary-color)',
        borderRadius: '10px',
      }}
    >
      <Line data={data} options={options}></Line>
    </div>
  );
};

export default WaveChart;
