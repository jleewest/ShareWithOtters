import { useContext, createContext, Dispatch, SetStateAction } from 'react';

export type User = {
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

export type User_GroupWithTransactions = User_Group & {
  group: { description: string; title: string };
};

export type User_GroupUsers = User_Group & {
  user: { clerkId: string; firstName: string; lastName: string };
};

export type Transaction = {
  id: number;
  groupId: number;
  type: string;
  date: string;
  status: 'pending' | 'active';
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
  groupId: number;
  amount: number[];
  notes: string;
};

export type TransactionReturn = {
  pending: { expense: TransactionWithUser[]; payment: TransactionWithUser[] };
  active: {
    expense: {
      awaitedPendingExpenseSentToOther: TransactionWithUser[];
      confirmedExpenses: TransactionWithUser[];
    };
    payment: {
      paid: TransactionWithUser[];
      pendingPaid: TransactionWithUser[];
      received: TransactionWithUser[];
    };
  };
};

export type TransactionWithUser = Transaction & {
  userActee: {
    firstName: string;
    lastName: string;
  };
  userActor: {
    firstName: string;
    lastName: string;
  };
};

export type TransactionWithRenderType = TransactionWithUser & {
  renderType: string;
};

//context for Transaction Context Provider
export type TTransactionContext = {
  transactions: TransactionReturn | undefined;
  setTransactions: Dispatch<SetStateAction<TransactionReturn | undefined>>;
};

export const TransactionsContext = createContext<TTransactionContext | null>(
  null
);

export const useTransactionContext = () => {
  const context = useContext(TransactionsContext);
  if (!context) throw Error('TransactionContext not provided');
  return context;
};

export type TransactionTableProps = {
  transactions: Transaction[]; // Add this line to include the transactions prop
  status: 'pending' | 'active';
  refreshTransactions: () => Promise<void>;
};

//context for TransactionData Context Provider
export type TTransactionDataContext = {
  transactionData: TransactionData;
  setTransactionData: Dispatch<SetStateAction<TransactionData | null>>;
};

export const TransactionsDataContext =
  createContext<TTransactionDataContext | null>(null);

export const useTransactionDataContext = () => {
  const context = useContext(TransactionsDataContext);
  if (!context) throw Error('TransactionDataContext not provided');
  return context;
};
