import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
  }
const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);

  const handleLogin = async () => {
    // Perform login logic
    try {
      // Your login logic here
      // ...
      setIsLoggedIn(true); // Update the login state to "logged in"
      onClose(); // Close the modal after successful login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
