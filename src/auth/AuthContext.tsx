import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, userName: string) => void;
  logout: () => void;
  userName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const name = localStorage.getItem('userName');
    if (token) {
      setIsAuthenticated(true);
      setUserName(name || '');
    }
  }, []);

  const login = (token: string, userName: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userName', userName);
    setIsAuthenticated(true);
    setUserName(userName);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
