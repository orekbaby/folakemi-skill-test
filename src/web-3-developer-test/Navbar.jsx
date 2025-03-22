"use client";

import { useContext } from "react";
import { WalletContext } from "./contexts/WalletContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Container,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Navbar() {
  const { account } = useContext(WalletContext);
  const theme = useTheme();
  // Responsive breakpoints for different device sizes
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        // Subtle gradient background for a modern look
        background: "linear-gradient(90deg, #f8f9fa 0%, #e9f0f8 100%)",
        color: "#2c3e50",
        borderBottom: "1px solid #e0e7ff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: { xs: 1, sm: 1.5 },
            flexDirection: { xs: "row" },
            minHeight: { xs: "56px", sm: "64px" },
          }}
        >
          {/* Left side - Logo/Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Only show hamburger menu on mobile */}
            {isMobile && (
              <IconButton
                size="small"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              component="div"
              noWrap
              sx={{
                fontWeight: 600,
                color: "#3a506b",
                // Responsive font size
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.25rem",
                },
                // Prevent long titles from breaking layout
                maxWidth: { xs: "150px", sm: "200px", md: "none" },
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Memory Card Game
            </Typography>
          </Box>

          {/* Right side - Wallet */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
            }}
          >
            <ConnectWalletButton />

            {/* Show wallet address on non-mobile screens when connected */}
            {account && !isMobile && (
              <Typography
                variant="body2"
                sx={{
                  ml: { xs: 1, sm: 2 },
                  backgroundColor: "rgba(226, 232, 240, 0.6)",
                  padding: { xs: "3px 6px", sm: "4px 10px" },
                  borderRadius: "4px",
                  color: "#4a5568",
                  fontFamily: "monospace",
                  fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.875rem" },
                  display: { xs: "none", sm: "block" },
                }}
              >
                {/* Show shorter address on medium screens */}
                {isMedium
                  ? `${account.slice(0, 6)}...${account.slice(-4)}`
                  : `${account.slice(0, 8)}...${account.slice(-8)}`}
              </Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
