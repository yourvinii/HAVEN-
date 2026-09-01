import { createContext, useContext, useState } from "react";
import {
  setAuthData,
  getToken,
  getUser,
  clearAuthData,
} from "../utils/storage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = getToken();
    const savedUser = getUser();

    if (token && savedUser) {
      return savedUser;
    }

    return null;
  });

  const login = (token, userData) => {
    setAuthData(token, userData);
    setUser(userData);
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}