'use client'
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { useState, useEffect } from "react";

function WalletConnection() {
  const [wallet, setWallet] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Initialize the Petra wallet
    const petra = new PetraWallet();
    setWallet(petra);
  }, []);

  const connectWallet = async () => {
    if (!wallet) {
      console.error("Wallet not initialized");
      return;
    }

    try {
      await wallet.connect();
      const acc = await wallet.account();
      setAccount(acc);
      console.log("Connected to account:", acc.address);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = async () => {
    if (!wallet) {
      console.error("Wallet not initialized");
      return;
    }

    try {
      await wallet.disconnect();
      setAccount(null);
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <div>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected: {account.address}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </div>
  );
}

export default WalletConnection;