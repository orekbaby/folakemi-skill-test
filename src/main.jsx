import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login/Login";
import Navbar from "./web-3-developer-test/Navbar";
import Register from "./Login/Register";
import Play from "./MemoryCardGame/Play";
import Easy from "./MemoryCardGame/MemoryEasy";
import Medium from "./MemoryCardGame/MemoryMedium";
import MemoryCardGame from "./MemoryCardGame/MemoryCardGame";
import Congratulations from "./MemoryCardGame/Congratulation";
import CongtEasy from "./MemoryCardGame/Congratseasy";
import CongtNormal from "./MemoryCardGame/Congratsnormal";
import { WalletProvider } from "./web-3-developer-test/contexts/WalletContext";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/congratulations"
            element={
              isAuthenticated ? <Congratulations /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/congt-easy"
            element={isAuthenticated ? <CongtEasy /> : <Navigate to="/login" />}
          />
          <Route
            path="/congt-normal"
            element={
              isAuthenticated ? <CongtNormal /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/easy"
            element={isAuthenticated ? <Easy /> : <Navigate to="/login" />}
          />
          <Route
            path="/medium"
            element={isAuthenticated ? <Medium /> : <Navigate to="/login" />}
          />
          <Route
            path="/play"
            element={isAuthenticated ? <Play /> : <Navigate to="/login" />}
          />
          <Route
            path="/memory-card-game"
            element={
              isAuthenticated ? <MemoryCardGame /> : <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
