// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import {
  apiSignUp,
  apiLogIn,
  apiVerifyToken,
  getToken,
  setToken,
  clearToken,
} from "../utils/api.js";

const AuthContext = createContext(null);

export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email }
  const [loading, setLoading] = useState(true); // verifying token on mount

  // ── On mount: verify any stored token with the server ─────────────────────
  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token) {
        try {
          const { user } = await apiVerifyToken();
          setUser(user);
        } catch {
          clearToken(); // token invalid/expired
        }
      }
      setLoading(false);
    })();
  }, []);

  // ── Sign Up ───────────────────────────────────────────────────────────────
  const signUp = useCallback(async ({ name, email, password }) => {
    const { token, user } = await apiSignUp({ name, email, password });
    setToken(token);
    setUser(user);
  }, []);

  // ── Log In ────────────────────────────────────────────────────────────────
  const logIn = useCallback(async ({ email, password }) => {
    const { token, user } = await apiLogIn({ email, password });
    setToken(token);
    setUser(user);
  }, []);

  // ── Log Out ───────────────────────────────────────────────────────────────
  const logOut = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
