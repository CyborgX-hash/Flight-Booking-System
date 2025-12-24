import React, { createContext, useEffect, useState } from "react";

export const WalletContext = createContext();

const API =
  process.env.REACT_APP_API_URL ||
  "https://flight-booking-system-1-w7cb.onrender.com";

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      const res = await fetch(`${API}/wallet`);
      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error("Failed to load wallet", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ balance, fetchWallet, loading }}>
      {children}
    </WalletContext.Provider>
  );
};
