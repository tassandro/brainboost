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
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
  };
  
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false); // Finaliza o carregamento após ler o localStorage
    }, []);
  
    const login = (newToken: string) => {
      localStorage.setItem('token', newToken);
      setToken(newToken);
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setToken(null);
    };
  
    const isAuthenticated = !!token;
  
    return (
      <AuthContext.Provider
        value={{ isAuthenticated, token, login, logout, loading }}
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
  