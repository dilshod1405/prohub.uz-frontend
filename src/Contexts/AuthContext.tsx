import React, { createContext, useContext, useState, ReactNode } from 'react';


interface AuthContextType {
  isAuthenticated: boolean;
  is_staff: boolean;
  login: (access: string, is_staff: boolean) => void;
  logout: () => void;
  checkToken: () => boolean;
  checkStaff: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [is_staff, setIsStaff] = useState(false);

  const login = (access: string, is_staff: boolean) => {
    localStorage.setItem('access', access);
    localStorage.setItem('is_staff', JSON.stringify(is_staff));
    setIsAuthenticated(true);
    setIsStaff(is_staff);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('is_staff');
    setIsAuthenticated(false);
    setIsStaff(false);
  };

  const checkToken = () => {
    const token = localStorage.getItem('access');
    if (!token) {
      return false;
    }
    return true;
  };

  const checkStaff = () => {
    const is_staff = localStorage.getItem('is_staff');
    if (is_staff === 'false') {
      return false;
    } else if (is_staff === 'true') {
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkToken, is_staff, checkStaff }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const login = (access: string, is_staff: boolean) => {
    context.login(access, is_staff);
  };

  return {
    ...context,
    login,};
};
