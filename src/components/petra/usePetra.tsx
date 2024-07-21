'use client'
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { useState, useEffect, useCallback } from "react";

function usePetra() {
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  useEffect(() => {
    if (typeof window.petra !== 'undefined') {
      const petra = new PetraWallet();
      setWallet(petra);
      
      // Check if already connected without prompting
      petra.account().then(acc => {
        if (acc) {
          setAccount(acc);
          setIsConnected(true);
        }
      }).catch(() => {
        // If account() fails, it means we're not connected
        setIsConnected(false);
      });
    }
  }, []);

  const connectWallet = useCallback(async () => {
    setIsCancelled(false)
    if (!wallet) {
      setError("Petra wallet is not installed. Please install it to continue.");
      return;
    }
    if (isConnected) {
      console.log("Wallet already connected");

      return;
    }
    setLoading(true);
    setError("");
    try {
      await wallet.connect();
      const acc = await wallet.account();
      setAccount(acc);
      setIsConnected(true);
    } catch (error) {
      console.error("Wallet connection error:", error);
      setError("Failed to connect wallet. Please try again.");
      setIsCancelled(true)
    } finally {
      setLoading(false);
    }
  }, [wallet, isConnected]);

  const disconnectWallet = useCallback(async () => {
    if (!wallet || !isConnected) return;
    setLoading(true);
    try {
      await wallet.disconnect();
      setAccount(null);
      setIsConnected(false);
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
      setError("Failed to disconnect wallet. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [wallet, isConnected]);

  return {
    account,
    wallet,
    connectWallet,
    disconnectWallet,
    loading,
    error,
    isInstalled: !!wallet,
    isConnected,
    isCancelled
  };
}

export default usePetra;