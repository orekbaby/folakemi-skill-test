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
        background: "radial-gradient(circle, rgba(30, 20, 100, 0.5), rgba(5, 3, 15, 0.7)), #0a1a3a",
    backgroundBlendMode: "darken",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
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
  variant={isMobile ? "subtitle2" : "body1"}
  component="div"
  noWrap
  sx={{
    fontWeight: 600,
    fontStyle: "italic",
    background: "linear-gradient(to right, #d9d9d9, #a6a6a6, #787878)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1.5rem" }, // Made smaller
    letterSpacing: "0.5px",
    textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
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
