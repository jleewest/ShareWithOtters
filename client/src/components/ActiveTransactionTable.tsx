import '../css/TransactionTable.css';
import { Transaction } from '../index';
import {
  useTransactionContext,
  TransactionWithUser,
  TransactionWithRenderType,
} from '../index';
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

const TransactionTable = () => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] =
    useState<TransactionWithUser[]>();
  const [
    awaitedPendingExpenseSentToOther,
    setAwaitedPendingExpenseSentToOther,
  ] = useState<TransactionWithRenderType[]>();
  const [confirmedExpenses, setConfirmedExpenses] =
    useState<TransactionWithRenderType[]>();
  const [paid, setPaid] = useState<TransactionWithRenderType[]>();
  const [pendingPaid, setPendingPaid] = useState<TransactionWithRenderType[]>();
  const [received, setReceived] = useState<TransactionWithRenderType[]>();

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
        transactions.active.expense.confirmedExpenses.map((transaction) => ({
          ...transaction,
          renderType: 'received',
        }))
      );
    }
  }, [transactions]);

  // Use only transactions with active status
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
          {transactionsByStatus ? (
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
