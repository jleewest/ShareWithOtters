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
    useState<TransactionWithRenderType[]>();
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
    <div className='PendingTransactions'>
      <div className='table-header'>
        <div>Pending transactions...</div>
        <div>Accept | Edit</div>
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

export default PendingTransactionTable;
