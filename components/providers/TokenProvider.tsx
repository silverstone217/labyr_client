"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  loading: boolean;
};

const TokenContext = createContext<TokenContextType | null>(null);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("token");
    }
    return null;
  });

  const [loading, setLoading] = useState(false); // pas besoin de setLoading

  // Fonction pour setter token et le stocker côté sessionStorage
  const setToken = (t: string | null) => {
    if (t) sessionStorage.setItem("token", t);
    else sessionStorage.removeItem("token");
    setTokenState(t);
  };

  useEffect(() => {
    const t = sessionStorage.getItem("token");
    setTimeout(() => {
      setTokenState(t);
      setLoading(false);
    }, 0);
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, loading }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useToken must be used within TokenProvider");
  return context;
};
