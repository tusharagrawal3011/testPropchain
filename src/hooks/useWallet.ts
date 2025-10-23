import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Connect wallet
  const connectWallet = async () => {
    try {
      setError(null);
      if (!window.ethereum) {
        setError("MetaMask not found. Please install it from https://metamask.io/");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) setAccount(accounts[0]);
    } catch (err: any) {
      if (err.code === 4001) setError("Connection request rejected.");
      else setError("Failed to connect wallet.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) setAccount(null);
        else setAccount(accounts[0]);
      };
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  return {
    account,
    error,
    connectWallet,
    disconnectWallet,
  };
};
