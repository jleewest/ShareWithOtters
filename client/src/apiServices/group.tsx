import { Group, NewGroup } from '../index';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function postGroup(group: NewGroup): Promise<NewGroup> {
  const response = await fetch(`${BASE_URL}/group`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: group.title,
      description: group.description,
      user: group.user,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    return data as Promise<NewGroup>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}

export async function editGroup(group: Group, id: number): Promise<Group> {
  const response = await fetch(`${BASE_URL}/group/edit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: group.title,
      description: group.description,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data as Promise<Group>;
  }
  return Promise.reject(new Error('Something went 🦖RA-WRong'));
}
