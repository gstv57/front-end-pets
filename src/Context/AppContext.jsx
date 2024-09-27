import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setToken(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      checkAuthStatus();
    }
  }, [token]);

  return (
    <AppContext.Provider
      value={{ token, setToken, user, setUser, checkAuthStatus }}
    >
      {children}
    </AppContext.Provider>
  );
}
