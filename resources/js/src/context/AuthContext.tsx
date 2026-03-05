import React, { createContext, useContext } from 'react';

type AuthValue = { permissions: Set<string> };
const AuthContext = createContext<AuthValue>({ permissions: new Set() });

export const AuthProvider = AuthContext.Provider;
export const useAuth = () => useContext(AuthContext);
