import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user info

  const login = (username, password,email) => {
    // In a real app, you'd call an API to verify credentials
    // For this example, a simple check:
    if (username === 'Ali' && password === 'Alik'&& email === 'Alikhalil1233214@gmail.com') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};