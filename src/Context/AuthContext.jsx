import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setAuthLogoutFunction } from '../utils/apiClient';

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,     // will be { username, roles } or null
    token: null,    // the raw JWT, or null
    isLoading: true,
  });

  // Decode token to { username, roles } or null
  const extractUserInfo = useCallback((token) => {
    try {
      const { sub: username, scope } = jwtDecode(token);
      if (!username) return null;
      return {
        username,
        roles: scope ? scope.split(' ') : [],
      };
    } catch (err) {
      console.error('Invalid token:', err);
      return null;
    }
  }, []);
  

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setAuthState({ user: null, token: null, isLoading: false });
      return;
    }

    const user = extractUserInfo(token);
    if (!user) {
      localStorage.removeItem('access_token');
      setAuthState({ user: null, token: null, isLoading: false });
    } else {
      setAuthState({ user, token, isLoading: false });
    }
  }, [extractUserInfo]);


  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    setAuthState({ user: null, token: null, isLoading: false });
    window.location.href = '/login';
  }, []);

  useEffect(() => {
    setAuthLogoutFunction(logout);
  }, [logout]);

  const login = useCallback((token) => {
    const user = extractUserInfo(token);
    if (!user) {
      console.error('Login failed: invalid token.');
      return;
    }
    localStorage.setItem('access_token', token);
    setAuthState({ user, token, isLoading: false });
    window.location.href = '/';
  }, [extractUserInfo]);


  const contextValue = {
    user: authState.user,
    username: authState.user?.username ?? null,
    roles: authState.user?.roles ?? [],
    token: authState.token,
    isLoading: authState.isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
