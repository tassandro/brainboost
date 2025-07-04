//npm install jwt-decode
import {jwtDecode} from 'jwt-decode'
import API from '../api';
import {User} from '@/services/userServices'

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

type DecodedToken = { sub: string };

function safelyDecode(token: string): DecodedToken { //função que retorna o token decodificado: token
  return jwtDecode<DecodedToken>(token);
}

// exemplo de token decodificado
// {
//   "sub": "admin",
//   "exp": 1745540776
// }

//início do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token'); //lê o token do localStorage

    if (storedToken) {
      setToken(storedToken);  //armazena o token no estado
      try {
        const decoded = safelyDecode(storedToken);
        setUser({ id: decoded.sub }); 

      } catch (err) {
        console.error("Erro ao decodificar token:", err);
        logout(); // Se o token não puder ser decodificado, faça logout

      }
    }
    setLoading(false); // Finaliza o carregamento após ler o localStorage
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    try {
      const decoded = safelyDecode(newToken);
      setUser({ id: decoded.sub });
      console.log("Username: ", decoded.sub); 
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