// src/context/UserContext.js
import { createContext, useState, useContext } from 'react';

// Création du contexte
export const UserContext = createContext();

// Hook personnalisé pour accéder au contexte plus facilement
export const useUser = () => useContext(UserContext);

const initialUserData = JSON.parse(localStorage.getItem('userData')) || null;
// Provider
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData);

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};
