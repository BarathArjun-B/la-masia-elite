import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import authService, { setAccessToken } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const clearMessages = useCallback(() => {
    setError("");
    setNotice("");
  }, []);

  const bootstrap = useCallback(async () => {
    setLoading(true);

    try {
      const data = await authService.refreshToken();
      setUser(data.user);
    } catch (err) {
      setAccessToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const runAuthAction = useCallback(async (action, successMessage) => {
    setActionLoading(true);
    clearMessages();

    try {
      const data = await action();
      if (data.user) {
        setUser(data.user);
      }
      if (successMessage) {
        setNotice(successMessage);
      }
      return data;
    } catch (err) {
      setError(err.message || "Authentication failed.");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [clearMessages]);

  const register = useCallback(
    (payload) => runAuthAction(() => authService.register(payload), "Welcome to La Masia Elite."),
    [runAuthAction],
  );

  const login = useCallback(
    (payload) => runAuthAction(() => authService.login(payload), "Login successful."),
    [runAuthAction],
  );

  const logout = useCallback(async () => {
    await runAuthAction(() => authService.logout(), "Logged out successfully.");
    setUser(null);
  }, [runAuthAction]);

  const forgotPassword = useCallback(
    (email) => runAuthAction(() => authService.forgotPassword(email), "Password reset link sent."),
    [runAuthAction],
  );

  const resetPassword = useCallback(
    (payload) => runAuthAction(() => authService.resetPassword(payload), "Password reset complete."),
    [runAuthAction],
  );

  const verifyEmail = useCallback(
    (token) => runAuthAction(() => authService.verifyEmail(token), "Email verified successfully."),
    [runAuthAction],
  );

  const value = useMemo(
    () => ({
      user,
      loading,
      actionLoading,
      error,
      notice,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      forgotPassword,
      resetPassword,
      verifyEmail,
      refreshSession: bootstrap,
      clearMessages,
    }),
    [
      actionLoading,
      bootstrap,
      clearMessages,
      error,
      forgotPassword,
      loading,
      login,
      logout,
      notice,
      register,
      resetPassword,
      user,
      verifyEmail,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
};
