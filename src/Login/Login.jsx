"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasLetter = /[a-zA-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      minLength.test(password) &&
      hasLetter.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Both fields are required");
      return;
    }
    if (!validatePassword(formData.password)) {
      setError(
        "Password must be at least 8 characters and include a letter, number, and special character."
      );
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("token", "dummyToken");
      onLogin();
      setShowModal(true);
      setLoading(false);
    }, 1000);
  };

  const handleLevelSelect = (level) => {
    console.log(`Selected Level: ${level}`);
    navigate("/play");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        filter: showModal ? "blur(1px)" : "none",
        transition: "filter 0.3s ease-in-out",
      }}
    >
      <Box sx={{ p: 4, bgcolor: "white", boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            sx={{ "&:focus-within": { borderColor: "blue" } }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            sx={{ "&:focus-within": { borderColor: "blue" } }}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #1565C0 30%, #0D47A1 90%)",
                boxShadow: "0 4px 8px 3px rgba(33, 150, 243, .4)",
                transform: "translateY(-2px)",
              },
              "&:disabled": {
                background: "linear-gradient(45deg, #9E9E9E 30%, #BDBDBD 90%)",
                boxShadow: "none",
              },
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Box>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: { xs: "80%", sm: "60%", md: "40%", lg: "30%" },
            maxWidth: "400px",
            height: "auto",
            maxHeight: "70vh",
            overflowY: "auto",
            outline: "none",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            sx={{ fontSize: "16px" }}
            gutterBottom
          >
            Select a Level
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleLevelSelect("Easy")}
              autoFocus // Ensures accessibility
            >
              Easy
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleLevelSelect("Medium")}
            >
              Medium
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleLevelSelect("Hard")}
            >
              Hard
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Login;
