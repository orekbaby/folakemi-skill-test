"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  ThemeProvider,
  createTheme,
  alpha,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Snackbar,
  Alert,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7F56D9",
    },
    secondary: {
      main: "#646cff",
    },
    background: {
      default: "transparent",
      paper: "rgba(18, 29, 63, 0.7)",
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(127, 86, 217, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(127, 86, 217, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#7F56D9",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.6)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#7F56D9",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
  },
});

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("error");

  //Function to show toast notification
  const showToast = (message, severity = "error") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setToastOpen(true);
  };

  // Function to close toast notification
  const handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(false);
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasLetter = /[a-zA-Z]/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // Return specific validation errors
    if (!minLength.test(password)) {
      return {
        valid: false,
        message: "Password must be at least 8 characters long.",
      };
    }
    if (!hasLetter.test(password)) {
      return {
        valid: false,
        message: "Password must include at least one letter.",
      };
    }
    if (!hasUpperCase.test(password)) {
      return {
        valid: false,
        message: "Password must include at least one uppercase letter.",
      };
    }
    if (!hasNumber.test(password)) {
      return {
        valid: false,
        message: "Password must include at least one number.",
      };
    }
    if (!hasSpecialChar.test(password)) {
      return {
        valid: false,
        message:
          'Password must include at least one special character (!@#$%^&*(),.?":{}|<>).',
      };
    }

    return { valid: true, message: "" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.password) {
      setError("Both fields are required");
      return;
    }

    // Password validation with specific feedback
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      return;
    }

    setLoading(true);

    try {
      // Call the API endpoint
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userID", response.data.userID);
      onLogin();
      navigate("/play");
    } catch (error) {
      let errorMessage = "Error logging in";

      if (error.response) {
        errorMessage = error.response.data.message || error.response.statusText;

        if (error.response.status === 400) {
          errorMessage = "User not found. Please register first.";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please try again later.";
      } else {
        errorMessage = error.message;
      }

      showToast(errorMessage);

      setError(errorMessage);

      // show the modal after a delay (simulating successful login)
      setTimeout(() => {
        onLogin();
        setShowModal(true);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  const handleLevelSelect = (level) => {
    if (!level) return;
    console.log(`Selected Level: ${level}`);
    if (level === "Easy") {
      navigate("/MemoryEasy");
    } else if (level === "Medium") {
      navigate("/MemoryMedium");
    } else if (level === "Hard") {
      navigate("/MemoryCardGame");
    }
    setShowModal(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
        <Box
          sx={{
            p: 4,
            bgcolor: "rgba(18, 29, 63, 0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
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
              height: "4px",
              background: "linear-gradient(90deg, #646cff, #7F56D9, #646cff)",
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
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              background:
                "linear-gradient(45deg, #b3e5fc, #e1bee7, #81d4fa, #ce93d8)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
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
              InputProps={{
                sx: {
                  backgroundColor: alpha("#121d3f", 0.3),
                },
              }}
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
              InputProps={{
                sx: {
                  backgroundColor: alpha("#121d3f", 0.3),
                },
              }}
              helperText={
                <FormHelperText
                  sx={{
                    color: "rgba(255, 255, 255, 0.6)",
                    mt: 0.5,
                    fontSize: "0.75rem",
                  }}
                >
                  Password must contain at least 8 characters, including
                  uppercase, lowercase, number, and special character.
                </FormHelperText>
              }
            />
            {error && (
              <Typography
                color="error"
                variant="body2"
                sx={{
                  mt: 1,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: "rgba(244, 67, 54, 0.1)",
                  border: "1px solid rgba(244, 67, 54, 0.3)",
                }}
              >
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                background: "linear-gradient(45deg, #646cff 10%, #7F56D9 90%)",
                boxShadow: "0 3px 15px rgba(127, 86, 217, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #535bf2 10%, #6A46C9 90%)",
                  boxShadow: "0 4px 20px rgba(127, 86, 217, 0.6)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background:
                    "linear-gradient(45deg, #2A2A2A 30%, #3A3A3A 90%)",
                  boxShadow: "none",
                },
              }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Box>

        <Snackbar
          open={toastOpen}
          autoHideDuration={6000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleToastClose}
            severity={toastSeverity}
            variant="filled"
            sx={{
              width: "100%",
              bgcolor:
                toastSeverity === "error"
                  ? "rgba(211, 47, 47, 0.9)"
                  : undefined,
              backdropFilter: "blur(8px)",
              border:
                toastSeverity === "error"
                  ? "1px solid rgba(244, 67, 54, 0.3)"
                  : undefined,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {toastMessage}
          </Alert>
        </Snackbar>

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
              bgcolor: "rgba(18, 29, 63, 0.8)",
              backdropFilter: "blur(15px)",
              p: 3,
              borderRadius: 3,
              border: "1px solid rgba(127, 86, 217, 0.3)",
              boxShadow: "0 8px 32px rgba(10, 5, 20, 0.5)",
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
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.9)",
                mb: 2,
              }}
            >
              Select a Level
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <RadioGroup
                aria-labelledby="level-selection-radio-group"
                name="level-selection"
                value={selectedLevel}
                onChange={(e) => {
                  const level = e.target.value;
                  setSelectedLevel(level);
                }}
              >
                {[
                  {
                    value: "Easy",
                    color: "#4CAF50",
                    gradient:
                      "linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)",
                  },
                  {
                    value: "Medium",
                    color: "#FF9800",
                    gradient:
                      "linear-gradient(45deg, #FF9800 30%, #F57C00 90%)",
                  },
                  {
                    value: "Hard",
                    color: "#F44336",
                    gradient:
                      "linear-gradient(45deg, #F44336 30%, #D32F2F 90%)",
                  },
                ].map((level) => (
                  <FormControlLabel
                    key={level.value}
                    value={level.value}
                    control={
                      <Radio
                        sx={{
                          "&": {
                            color: alpha(level.color, 0.6),
                          },
                          "&.Mui-checked": {
                            color: level.color,
                          },
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: 2,
                          background: alpha(level.color, 0.1),
                          border: `1px solid ${alpha(level.color, 0.2)}`,
                          transition: "all 0.2s ease",
                          "&:hover": {
                            background: alpha(level.color, 0.15),
                            borderColor: alpha(level.color, 0.3),
                          },
                          maxWidth: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: level.color,
                          }}
                        >
                          {level.value}
                        </Typography>
                      </Box>
                    }
                    sx={{
                      margin: 0,
                      marginY: 1,
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                      "& .MuiFormControlLabel-label": {
                        width: "100%",
                      },
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  />
                ))}
              </RadioGroup>

              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background:
                    "linear-gradient(to bottom, rgba(80, 80, 80, 0.9), rgba(60, 60, 60, 0.8), rgba(40, 40, 40, 0.9))",
                  color: "white",
                  borderRadius: "8px",
                  height: "40px",
                  boxShadow: "0px 1px 1.99px 0px rgba(16,24,40,0.1)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  transition: "background 0.3s ease, transform 0.1s ease",
                  "&:hover": {
                    background:
                      "linear-gradient(to bottom, rgba(120, 120, 120, 1), rgba(90, 90, 90, 0.9), rgba(70, 70, 70, 1))",
                  },
                  "&:active": {
                    background:
                      "linear-gradient(to bottom, rgba(200, 100, 50, 1), rgba(180, 80, 40, 1), rgba(150, 60, 30, 1))",
                    transform: "scale(0.95)",
                  },
                }}
                onClick={() => handleLevelSelect(selectedLevel)}
                disabled={!selectedLevel}
              >
                Start Game
              </Button>

              <Box sx={{ mt: 1, textAlign: "center" }}>
                <Button
                  variant="text"
                  sx={{
                    color: "#3a506b",
                    "&:hover": {
                      background: "rgba(58, 80, 107, 0.05)",
                    },
                  }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
