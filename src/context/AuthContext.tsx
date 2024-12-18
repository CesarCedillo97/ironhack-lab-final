import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import GetLocalStorageData from '../storage/GetLocalStorageData';
import {LoginUserResponse} from '../utils/types';
import {StorageKeys} from '../storage/StorageKeys';
import SaveToLocalStorage from '../storage/SaveToLocalStorage';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const storedUser = await GetLocalStorageData<LoginUserResponse>(
      StorageKeys.USER,
    );
    if (storedUser.success && storedUser.data) {
      setIsAuthenticated(true);
    }
  };

  const login = () => setIsAuthenticated(true);
  const logout = async () => {
    await SaveToLocalStorage<LoginUserResponse | null>(StorageKeys.USER, null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
