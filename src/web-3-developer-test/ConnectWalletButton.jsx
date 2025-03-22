"use client";

import { useState, useContext } from "react";
import {
  Button,
  Menu,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { WalletContext } from "./contexts/WalletContext";

export default function ConnectWalletButton() {
  const { account, connect, disconnect, points } = useContext(WalletContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle wallet connection when button is clicked
  const handleConnectWallet = async () => {
    if (!account) {
      try {
        await connect();
      } catch (error) {
        console.error("Connection error:", error);
      }
    }
  };

  // Disconnect wallet and close the menu
  const handleDisconnect = () => {
    disconnect();
    handleMenuClose();
  };

  // Menu open/close handlers for the wallet dropdown
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Copy wallet address to clipboard with visual feedback
  const copyToClipboard = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {account ? (
        // When connected, show avatar that opens wallet menu
        <>
          <Avatar
            src="/Deer.svg"
            alt="User Icon"
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer" }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: "visible",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
          >
            {/* Custom wallet info card with user details */}
            <Paper
              sx={{
                p: 2,
                width: 300,
                bgcolor: "white",
                color: "#2c3e50",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar src="/Deer.svg" alt="User Icon" />
                <Box sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center">
                    {/* Truncate address for better UI */}
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "monospace" }}
                    >
                      {`${account.slice(0, 8)}...${account.slice(-8)}`}
                    </Typography>
                    {/* Copy address button with tooltip feedback */}
                    <Tooltip title={copied ? "Copied!" : "Copy address"}>
                      <IconButton
                        size="small"
                        onClick={copyToClipboard}
                        sx={{ ml: 1 }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
              {/* User role badge - would be dynamic in a real app */}
              <Typography
                variant="body2"
                sx={{
                  bgcolor: "#3a506b",
                  color: "white",
                  p: 1,
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                Normal User
              </Typography>
              {/* Points display - would come from blockchain in a real app */}
              <Typography variant="body2" sx={{ mt: 2 }}>
                Card Points:{" "}
                <span style={{ color: "#3a506b", fontWeight: "bold" }}>
                  {points}
                </span>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </Paper>
          </Menu>{" "}
        </>
      ) : (
        // When not connected, show connect button
        <Button
          variant="contained"
          color="primary"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
