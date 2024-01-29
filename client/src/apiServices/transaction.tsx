import { Transaction } from '../index';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getTransactionsByClerkId(
  id: string
): Promise<Transaction[]> {
  const response = await fetch(`${BASE_URL}/transaction/${id}`);
  if (response.ok) {
    const data = await response.json();
    return data as Promise<Transaction[]>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function createTransaction(
  transaction: Transaction
): Promise<Transaction> {
  const response = await fetch(`${BASE_URL}/transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: transaction.type,
      date: transaction.date,
      transactor: transaction.transactor,
      transactee: transaction.transactee,
      description: transaction.description,
      amount: transaction.amount,
      notes: transaction.notes,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<Transaction>;
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
