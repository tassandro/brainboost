//npm install jwt-decode
import {jwtDecode} from 'jwt-decode'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string } | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

type DecodedToken = { id: string };

function safelyDecode(token: string): DecodedToken {
  return jwtDecode<DecodedToken>(token);
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = safelyDecode(storedToken);
        setUser({ id: decoded.id }); // ou decoded.id_user dependendo do payload
      } catch (err) {
        console.error("Erro ao decodificar token:", err);
      }
    }
    setLoading(false); // Finaliza o carregamento após ler o localStorage
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    try {
      const decoded = safelyDecode(newToken);
      setUser({ id: decoded.id }); // ou decoded.id_user
    } catch (err) {
      console.error("Erro ao decodificar token no login:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
