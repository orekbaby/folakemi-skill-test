"use client";

import { createContext, useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

// Create context to manage wallet state globally across the app
const WalletContext = createContext(undefined);

const WalletProvider = ({ children }) => {
  // Main state for wallet connection and user feedback
  const [account, setAccount] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState(0); // For demo purposes - would be fetched from blockchain in production
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  // Check if user was previously connected and restore session
  // This improves UX by not requiring reconnection on page refresh
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        // Get accounts that are already connected to the dApp
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          const savedAccount = localStorage.getItem("walletAddress");
          const savedPoints = localStorage.getItem("cardPoints");

          // Only reconnect if the current account matches the saved one
          // This prevents connecting to a different account than the user expects
          if (savedAccount && accounts.includes(savedAccount)) {
            setAccount(savedAccount);
          }

          if (savedPoints) {
            setPoints(Number.parseInt(savedPoints, 10));
          }
        }
      }
    };

    checkConnection();
  }, []);

  // Helper function to show toast notifications
  // I'm using a custom wrapper instead of direct Snackbar calls to keep the UI code clean
  const showToast = (message, severity = "success", duration = 6000) => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);

    setTimeout(() => {
      setToastOpen(false);
    }, duration);
  };

  const handleCloseToast = () => {
    setToastOpen(false);
  };

  // Main wallet connection function
  // Handles all the edge cases like MetaMask not installed, user rejection, etc.
  const connect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const provider = window.ethereum;

      // Check if MetaMask is installed
      if (!provider) {
        showToast(
          "MetaMask is not installed. Please install it to continue.",
          "error"
        );
        return;
      }

      // Request account access - this triggers the MetaMask popup
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const selectedAccount = accounts[0];
        setAccount(selectedAccount);
        localStorage.setItem("walletAddress", selectedAccount);

        // In a real app, we'd fetch points from the blockchain
        // Using random points for demo purposes
        const newPoints = Math.floor(Math.random() * 1000);
        setPoints(newPoints);
        localStorage.setItem("cardPoints", newPoints.toString());

        // Show truncated address in toast for better UX
        showToast(
          `Wallet connected successfully: ${selectedAccount.slice(
            0,
            8
          )}...${selectedAccount.slice(-8)}`,
          "success"
        );
      } else {
        showToast("No wallet address found", "error");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);

      // Handle specific MetaMask error codes with user-friendly messages
      if (error.code === -32002) {
        // This happens when a connection request is already pending
        showToast(
          "Connection request already pending. Check your MetaMask extension.",
          "warning"
        );
      } else if (error.code === 4001) {
        // User rejected the connection request
        showToast(
          "Connection rejected. Please approve the connection request.",
          "error"
        );
      } else {
        showToast(error.message || "Failed to connect wallet", "error");
      }

      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Disconnect wallet and clean up local storage
  // Also attempts to revoke permissions if the provider supports it
  const disconnect = async () => {
    setAccount(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("cardPoints");
    showToast("Wallet disconnected successfully", "success");

    try {
      // Attempt to revoke permissions - not all wallets support this
      const provider = window.ethereum;
      if (provider && provider.request) {
        await provider.request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        });
      }
    } catch (error) {
      console.error("Error revoking permissions:", error);
      // Non-critical error, so we don't show a toast
    }
  };

  return (
    <WalletContext.Provider
      value={{ account, isConnecting, error, connect, disconnect, points }}
    >
      {children}
      {/* Global toast notification system for wallet events */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toastSeverity}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </WalletContext.Provider>
  );
};

export { WalletProvider, WalletContext };
