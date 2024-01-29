import { useContext, createContext, Dispatch, SetStateAction } from 'react';

export type User = {
  id: number;
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Group = {
  id: number;
  title: string;
  description: string;
};

export type User_Group = {
  id: number;
  userId: string;
  groupId: number;
};

export type Transaction = {
  id: number;
  groupId: number;
  type: string;
  date: string;
  transactor: string;
  transactee: string;
  description: string;
  amount: number;
  notes: string;
};

export type TransactionData = {
  type: string;
  date: string;
  transactor: string;
  transactee: string[];
  description: string;
  amount: number[];
  notes: string;
};

export type TTransactionContext = {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
};

export const TransactionsContext = createContext<TTransactionContext | null>(
  null
);

export const useTransactionContext = () => {
  const context = useContext(TransactionsContext);
  if (!context) throw Error('TransactionContext not provided');
  return context;
};
