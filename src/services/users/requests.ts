import api from '../api';
import { CreateUser, UpdateUserPassword, User } from './types';

export async function getUser(id: string): Promise<User> {
  const response = await api.get(`/users/${id}`);
  return response.data;
}

export async function createUser(user: CreateUser): Promise<User> {
  const response = await api.post('/users', user);
  return response.data;
}

export async function updateUserPassword({
  id,
  password,
}: UpdateUserPassword): Promise<User> {
  const response = await api.patch(`/users/${id}/password`, { password });
  return response.data;
}

export async function updateUser(user: User): Promise<User> {
  const response = await api.put(`/users/${user.id}`, user);
  return response.data;
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/users/${id}`);
}
