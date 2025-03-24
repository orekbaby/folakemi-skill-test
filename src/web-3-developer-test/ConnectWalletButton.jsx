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

  const handleConnectWallet = async () => {
    if (!account) {
      try {
        await connect();
      } catch (error) {
        console.error("Connection error:", error);
      }
    }
  };

  const handleDisconnect = () => {
    disconnect();
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const copyToClipboard = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {account ? (
        <>
          <Avatar
            src="/Deer.svg"
            alt="User Icon"
            onClick={handleMenuOpen}
            sx={{
              cursor: "pointer",
              border: "2px solid rgba(127, 86, 217, 0.5)",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 0 10px rgba(127, 86, 217, 0.6)",
              },
            }}
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
                filter: "drop-shadow(0px 2px 8px rgba(10, 5, 20, 0.5))",
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "rgba(18, 29, 63, 0.9)",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <Paper
              sx={{
                p: 2,
                width: 300,
                bgcolor: "rgba(18, 29, 63, 0.9)",
                backdropFilter: "blur(10px)",
                color: "rgba(255, 255, 255, 0.87)",
                borderRadius: 2,
                border: "1px solid rgba(127, 86, 217, 0.2)",
                boxShadow: "0 8px 32px rgba(10, 5, 20, 0.4)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background:
                    "linear-gradient(90deg, #646cff, #7F56D9, #646cff)",
                  backgroundSize: "200% 100%",
                  animation: "gradient 3s ease infinite",
                },
                "@keyframes gradient": {
                  "0%": {
                    backgroundPosition: "0% 50%",
                  },
                  "50%": {
                    backgroundPosition: "100% 50%",
                  },
                  "100%": {
                    backgroundPosition: "0% 50%",
                  },
                },
              }}
            >
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar
                  src="/Deer.svg"
                  alt="User Icon"
                  sx={{
                    border: "1px solid rgba(127, 86, 217, 0.5)",
                    bgcolor: "rgba(127, 86, 217, 0.1)",
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "monospace",
                        color: "rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      {`${account.slice(0, 8)}...${account.slice(-8)}`}
                    </Typography>
                    <Tooltip title={copied ? "Copied!" : "Copy address"}>
                      <IconButton
                        size="small"
                        onClick={copyToClipboard}
                        sx={{
                          ml: 1,
                          color: "rgba(255, 255, 255, 0.7)",
                          "&:hover": {
                            color: "#7F56D9",
                            bgcolor: "rgba(127, 86, 217, 0.1)",
                          },
                        }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  bgcolor: "rgba(127, 86, 217, 0.3)",
                  color: "white",
                  p: 1,
                  borderRadius: 1,
                  display: "inline-block",
                  border: "1px solid rgba(127, 86, 217, 0.5)",
                }}
              >
                Normal User
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 2, color: "rgba(255, 255, 255, 0.8)" }}
              >
                Card Points:{" "}
                <span style={{ color: "#b3e5fc", fontWeight: "bold" }}>
                  {points}
                </span>
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background:
                    "linear-gradient(45deg, #646cff 10%, #7F56D9 90%)",
                  color: "white",
                  borderRadius: "8px",
                  height: { xs: "23.09px", md: "40px" },
                  width: { xs: "120.35px", md: "103.8px", lg: "120px" },
                  px: { xs: 2, md: "25.93px" },
                  py: "6.98px",
                  fontSize: { xs: "8px", md: "16px" },
                  fontWeight: "500",
                  lineHeight: "normal",
                  boxShadow: "0 3px 15px rgba(127, 86, 217, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #535bf2 10%, #6A46C9 90%)",
                    boxShadow: "0 4px 20px rgba(127, 86, 217, 0.6)",
                    transform: "translateY(-2px)",
                  },
                  "&:active": {
                    background:
                      "linear-gradient(45deg, #4a52e3 10%, #5a3ab0 90%)",
                    transform: "scale(0.95)",
                  },
                }}
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </Paper>
          </Menu>
        </>
      ) : (
        <Button
          variant="contained"
          sx={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1), rgba(245,245,245,0.95), rgba(0,0,0,0.1))",
            color: "black",
            borderTopLeftRadius: "7.97px",
            borderTopRightRadius: "7.97px",
            height: { xs: "23.09px", md: "40px" },
            width: { xs: "120.35px", md: "103.8px", lg: "130px" },
            px: { xs: 2, md: "21.93px" },
            py: "6.98px",
            fontSize: { xs: "8px", md: "15px" },
            fontWeight: "600",
            lineHeight: "normal",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.15)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            textTransform: "none",
            transition:
              "background 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease",

            outline: "none",
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },

            "&:hover": {
              background:
                "linear-gradient(to bottom, rgba(255,255,255,1), rgba(250,250,250,1), rgba(0,0,0,0.25))",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
              transform: "scale(1.02)",
              border: "none",
            },

            "&:active": {
              background:
                "linear-gradient(to bottom, rgba(240,240,240,1), rgba(220,220,220,1), rgba(0,0,0,0.4))",
              transform: "scale(0.96)",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.4)",
            },
          }}
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
