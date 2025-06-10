// userService.ts
import API from './api';

export type User = {
    id: string;
    full_name: string;
    username: string;
  };

export const getCurrentUser = async (): Promise<User> => {
  const response = await API.get<User>('/users/me');
  return response.data;
};

export const updateUser = async (
  id: string,
  data: { full_name: string; username: string; password?: string }
): Promise<User> => {
  const payload = { ...data };
  if (!payload.password) delete payload.password;

  const response = await API.put<User>(`/users/${id}`, payload);
  return response.data;
};