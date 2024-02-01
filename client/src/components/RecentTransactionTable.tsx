import '../css/TransactionTable.css';
import { useTransactionContext, TransactionWithRenderType } from '../index';
import { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem';

export type TransactionActiveReturn = {
  expense: {
    awaitedPendingExpenseFromSentToOther: TransactionWithRenderType[];
    confirmedExpenses: TransactionWithRenderType[];
  };
  payment: {
    paid: TransactionWithRenderType[];
    pendingPaid: TransactionWithRenderType[];
    received: TransactionWithRenderType[];
  };
};

const RecentTransactionTable = () => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] =
    useState<TransactionWithRenderType[]>();
  const [
    awaitedPendingExpenseSentToOther,
    setAwaitedPendingExpenseSentToOther,
  ] = useState<TransactionWithRenderType[]>();
  const [confirmedExpenses, setConfirmedExpenses] =
    useState<TransactionWithRenderType[]>();
  const [paid, setPaid] = useState<TransactionWithRenderType[]>();
  const [pendingPaid, setPendingPaid] = useState<TransactionWithRenderType[]>();
  const [received, setReceived] = useState<TransactionWithRenderType[]>();

  // Set renderType to each transaction
  useEffect(() => {
    if (transactions) {
      setAwaitedPendingExpenseSentToOther(
        transactions.active.expense.awaitedPendingExpenseSentToOther.map(
          (transaction) => ({
            ...transaction,
            renderType: 'awaitedPending',
          })
        )
      );
      setConfirmedExpenses(
        transactions.active.expense.confirmedExpenses.map((transaction) => ({
          ...transaction,
          renderType: 'confirmedExpense',
        }))
      );
      setPaid(
        transactions.active.payment.paid.map((transaction) => ({
          ...transaction,
          renderType: 'paid',
        }))
      );
      setPendingPaid(
        transactions.active.payment.pendingPaid.map((transaction) => ({
          ...transaction,
          renderType: 'pendingPaid',
        }))
      );
      setReceived(
        transactions.active.payment.received.map((transaction) => ({
          ...transaction,
          renderType: 'received',
        }))
      );
    }
  }, [transactions]);

  //Set all pending transactions with renderTYpe
  useEffect(() => {
    if (
      awaitedPendingExpenseSentToOther &&
      confirmedExpenses &&
      paid &&
      pendingPaid &&
      received
    ) {
      setTransactionsByStatus([
        ...awaitedPendingExpenseSentToOther,
        ...confirmedExpenses,
        ...paid,
        ...pendingPaid,
        ...received,
      ]);
    }
  }, [
    awaitedPendingExpenseSentToOther,
    confirmedExpenses,
    paid,
    pendingPaid,
    received,
  ]);
  console.log(transactionsByStatus);

  return (
    <div className='RecentTransactions'>
      <div className='table-header'>
        <div>Recent transactions</div>
      </div>
      <div className='table-body'>
        {transactionsByStatus ? (
          transactionsByStatus.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div>
            <div>No transactions found</div>
          </div>
        )}
      </div>
      <div className='table-footer'></div>
    </div>
  );
};

export default RecentTransactionTable;
