import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { WalletProvider } from "./components/WalletContext";

import Home from "./pages/Home";
import Search from "./pages/Search";
import History from "./pages/History";

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}
