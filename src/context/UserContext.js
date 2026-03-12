import React, { createContext, useContext, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@little_lemon_user';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const loadUser = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(USER_KEY);
      if (json) setUser(JSON.parse(json));
    } catch (e) {}
  }, []);

  const saveUser = useCallback(async (data) => {
    setUser(data);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(data));
  }, []);

  const clearUser = useCallback(async () => {
    setUser(null);
    setHasCompletedOnboarding(false);
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem('@little_lemon_onboarding_done');
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
        loadUser,
        saveUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
