import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (userId) setUser({ id: userId, name: userName });
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    const token = res.data.token;
    const userId = res.data.id;
    const name = res.data.name;

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userName", name);

    setUser({ id: userId, name });
  };

  const register = async (data) => {
    await registerUser(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
