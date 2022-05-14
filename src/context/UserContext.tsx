import React, { useState, createContext, useContext, Dispatch } from 'react';

export type User = {
  token: string;
  info: {
    name: string;
    nickname: string;
  } | null;
};

type userContextType = {
  user: User;
  setUser: Dispatch<User>;
};

const initialState = {
  token: '',
  info: null,
};

const Context = createContext<userContextType>({
  user: initialState,
  setUser: () => null,
});

export const UserContext: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(initialState);

  return <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>;
};

export const useUserContext = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error(`useUserContext must be used within a UserContext`);
  }

  return context;
};
