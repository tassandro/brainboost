import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage'; //necessário, pois não existe localStorage no React Native
import API from '@sv/api';
import { User } from '@sv/userServices';

import React, { createContext, useContext, useState, useEffect, ReactNode, } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string } | null;
  login: (token: string) => Promise<void>;
  // login: (token: string) => void;
  logout: () => Promise<void>;
  loading: boolean;
};

type DecodedToken = { sub: string };

function safelyDecode(token: string): DecodedToken {
  return jwtDecode<DecodedToken>(token);
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const decoded = safelyDecode(storedToken);
          setUser({ id: decoded.sub });
        }
      } catch (err) {
        console.error('Erro ao carregar token:', err);
        await logout(); // logout também precisa ser async agora
      } finally {
        setLoading(false);
      }
    };

    loadStoredToken();
  }, []);

  const login = async (newToken: string) => {
    try {
      await AsyncStorage.setItem('token', newToken);
      setToken(newToken);
      const decoded = safelyDecode(newToken);
      setUser({ id: decoded.sub });
      console.log('Username:', decoded.sub);
    } catch (err) {
      console.error('Erro ao salvar token:', err);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
      setUser(null);
    } catch (err) {
      console.error('Erro ao remover token:', err);
    }
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

export async function verifyToken() {
  try {
    console.log("Verificando token...");
    const res = await API.get<{ user: User }>("/verify-token");
    return res.data.user;
  } catch (err) {
    console.error("Erro ao verificar token:", err);
    throw new Error("Token inválido");
  }
}
