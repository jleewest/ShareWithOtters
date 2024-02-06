import {
  User_Group,
  User_GroupWithTransactions,
  User_GroupUsers,
} from '../index';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getGroupsByClerkId(
  id: string
): Promise<User_GroupWithTransactions[]> {
  const response = await fetch(`${BASE_URL}/user-group/${id}`);
  if (response.ok) {
    const data = await response.json();
    return data as Promise<User_GroupWithTransactions[]>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function getUsersByGroup(
  groupId: number
): Promise<User_GroupUsers[]> {
  const response = await fetch(`${BASE_URL}/user-group/${groupId}`);
  if (response.ok) {
    const data = await response.json();
    return data as Promise<User_GroupUsers[]>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function addUserToGroup(body: User_Group): Promise<User_Group> {
  const response = await fetch(`${BASE_URL}/user-group/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: body.userId,
      groupId: body.groupId,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<User_Group>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function deleteUserFromGroup(
  body: User_Group
): Promise<User_Group> {
  const response = await fetch(`${BASE_URL}/user-group/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: body.userId,
      groupId: body.groupId,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<User_Group>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}
