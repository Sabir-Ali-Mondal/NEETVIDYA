import { createContext, useState, useEffect, useCallback } from "react";
import api from "../config/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("neetvidya_token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/auth/me");
      setUser(data.data.user);
    } catch {
      localStorage.removeItem("neetvidya_token");
      localStorage.removeItem("neetvidya_refresh");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (emailOrId, password) => {
    const { data } = await api.post("/auth/login", { email: emailOrId, password });
    const { user: userData, accessToken, refreshToken } = data.data;
    localStorage.setItem("neetvidya_token", accessToken);
    localStorage.setItem("neetvidya_refresh", refreshToken);
    setUser(userData);
    return userData;
  };

  const register = async (name, email, password, phone) => {
    const { data } = await api.post("/auth/register", { name, email, password, phone });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("neetvidya_token");
    localStorage.removeItem("neetvidya_refresh");
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
