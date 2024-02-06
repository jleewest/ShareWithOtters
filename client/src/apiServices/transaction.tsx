import { Transaction, TransactionData, TransactionReturn } from '../index';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getTransactionsByClerkId(
  userId: string,
  groupId: string
): Promise<TransactionReturn> {
  const response = await fetch(`${BASE_URL}/transaction/${groupId}/${userId}/`);
  if (response.ok) {
    const data = await response.json();
    return data as Promise<TransactionReturn>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function createTransaction(
  transaction: TransactionData
): Promise<Transaction[]> {
  const response = await fetch(`${BASE_URL}/transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<Transaction[]>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function deleteTransaction(id: number): Promise<Transaction> {
  const response = await fetch(`${BASE_URL}/transaction/delete/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<Transaction>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function updateTransactionStatus(
  id: number
): Promise<Transaction> {
  const response = await fetch(`${BASE_URL}/transaction/accept/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<Transaction>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function editTransaction(
  transaction: Transaction,
  id: number
): Promise<Transaction> {
  const response = await fetch(`${BASE_URL}/transaction/edit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      date: transaction.date,
      amount: transaction.amount,
      description: transaction.description,
      notes: transaction.notes,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<Transaction>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function getAllTransactions(): Promise<Transaction[]> {
  const response = await fetch(`${BASE_URL}/transactions`);
  if (response.ok) {
    const data = await response.json();
    return data as Promise<Transaction[]>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}
