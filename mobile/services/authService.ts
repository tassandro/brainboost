import qs from 'qs';
import axios from './api';

type AuthResponse = {
  access_token: string;
  token_type: string;
};

export const registerUser = (full_name: string, username: string, password: string) => {
    return axios.post<AuthResponse>('/register', {
      full_name,
      username,
      password
    });
  };

export const loginUser = (username: string, password: string) => {
  return axios.post<AuthResponse>(
    '/login',
    qs.stringify({ username, password }), // serializa como username=...&password=...
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};
