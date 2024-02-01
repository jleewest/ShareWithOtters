import '../css/TransactionTable.css';
import {
  useTransactionContext,
  TransactionWithUser,
  TransactionWithRenderType,
} from '../index';
import { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem';

export type TransactionPendingReturn = {
  expense: TransactionWithUser[];
  payment: TransactionWithUser[];
};

const PendingTransactionTable = () => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] =
    useState<TransactionWithUser[]>();
  const [pendingExpense, setPendingExpense] =
    useState<TransactionWithRenderType[]>();
  const [pendingPayment, setPendingPayment] =
    useState<TransactionWithRenderType[]>();

  // Use only transactions with pending status
  useEffect(() => {
    if (transactions) {
      setPendingExpense(
        transactions.pending.expense.map((transaction) => ({
          ...transaction,
          renderType: 'pendingExpense',
        }))
      );
      setPendingPayment(
        transactions.pending.payment.map((transaction) => ({
          ...transaction,
          renderType: 'pendingPayment',
        }))
      );
    }
  }, [transactions]);

  useEffect(() => {
    if (pendingExpense && pendingPayment) {
      setTransactionsByStatus([...pendingExpense, ...pendingPayment]);
    }
  }, [pendingExpense, pendingPayment]);

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

export default PendingTransactionTable;
