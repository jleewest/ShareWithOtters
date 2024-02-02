import '../css/TransactionTable.css';
import { useTransactionContext, TransactionWithRenderType } from '../index';
import { useState, useEffect } from 'react';
import TransactionItem from './TransactionItem';
import { sortNewestFirst } from '../utils/transactionUtils';

export type TransactionPendingReturn = {
  expense: TransactionWithRenderType[];
  payment: TransactionWithRenderType[];
};

const PendingTransactionTable = () => {
  const { transactions } = useTransactionContext(); // Use the transactions from context
  const [transactionsByStatus, setTransactionsByStatus] =
    useState<TransactionWithRenderType[]>();
  const [pendingExpense, setPendingExpense] =
    useState<TransactionWithRenderType[]>();
  const [pendingPayment, setPendingPayment] =
    useState<TransactionWithRenderType[]>();

  // Set renderType to each transaction
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

  //Set all pending transactions with renderTYpe
  useEffect(() => {
    if (pendingExpense && pendingPayment) {
      setTransactionsByStatus(
        sortNewestFirst([...pendingExpense, ...pendingPayment])
      );
    }
  }, [pendingExpense, pendingPayment]);

  return (
    <div className='PendingTransactions'>
      <div className='table-header'>
        <div>Pending transactions...</div>
      </div>
      <div className='table-body'>
        {transactionsByStatus ? (
          transactionsByStatus.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              status='pending'
            />
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
