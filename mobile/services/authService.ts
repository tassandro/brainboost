import qs from 'qs';
import { jwtDecode } from 'jwt-decode';
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
    qs.stringify({ username, password }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
};

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export function getDecodedToken(token: string) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}
