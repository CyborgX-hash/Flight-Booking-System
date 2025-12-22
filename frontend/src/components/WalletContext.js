import React, { createContext, useState } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(50000);

  const deduct = (amount) => {
    if (balance < amount) {
      alert("⚠️ Low wallet balance!");
      return false;
    }
    setBalance(balance - amount);
    return true;
  };

  return (
    <WalletContext.Provider value={{ balance, deduct }}>
      {children}
    </WalletContext.Provider>
  );
};
