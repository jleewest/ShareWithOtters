import { User } from '../index';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/user`);
  if (response.ok) {
    const data = await response.json();
    return data as Promise<User[]>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function getUserByClerkId(id: string): Promise<User> {
  const response = await fetch(`${BASE_URL}/user/${id}`);
  if (response.ok) {
    const data = await response.json();
    return data as Promise<User>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function addUser(user: User): Promise<User> {
  const response = await fetch(`${BASE_URL}/user/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clerkId: user.clerkId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<User>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}
