import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getInputPlaceholdersStyling,
  getButtonStyling,
} from "../../styles/formStyling";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import AlertLayout from "../../utlis/Alerts";
import { Buffer } from "buffer";
interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [password, setPassword] = useState("");
  const [hideContent, setHideContent] = useState(false);
  const {
    isLoggedIn,
    setIsLoggedIn,
    isLoginModalOpen,
    username,
    setUsername,
    setRoles,
    setAvatarImage,
    setFirstName,
    setLastName,
    setEmail,
    setPhoneNumber,
    setAddress,
    setCity,
    setCv,
  } = useContext(IsLoggedInContext);
  const { themeMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);

  const { dispatch } = useAlertContext();

  const buttonStyling = getButtonStyling(themeMode);

  const handleLogin = async () => {
    const loginData = {
      username: username,
      password: password,
    };
    dispatch({ type: "CLEAR_ALERTS" });

    document.body.style.overflow = isLoginModalOpen ? "hidden" : "auto";

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        console.log(
          Buffer.from(data.accessToken.split(".")[1], "base64").toString(
            "utf-8"
          )
        );
        setUsername(data.user.username);
        setRoles(data.user.roles);
        setAvatarImage(data.user.avatarImage);
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setPhoneNumber(data.user.phoneNumber);
        setEmail(data.user.email);
        setAddress(data.user.address);
        setCity(data.user.city);
        setCv(data.user.cv);
        setIsLoggedIn(true);
        setHideContent(true);

        if (location.pathname === "/register-user") {
          dispatch({
            type: "SHOW_SUCCESS",
            payload: "You are already registered!",
          });
        }
        dispatch({
          type: "SHOW_SUCCESS",
          payload: "Logged in successfully!",
        });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        dispatch({
          type: "SHOW_ERROR",
          payload: "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      dispatch({ type: "SHOW_ERROR", payload: `Error during login: ${error}` });
    }
  };

  isLoggedIn &&
    location.pathname === "/register-user" &&
    setTimeout(() => {
      navigate("/");
    }, 1500);

  const handleSignUp = () => {
    onClose();
    navigate("/register-user");
  };

  useEffect(() => {
    dispatch({ type: "CLEAR_ALERTS" });
 
    setHideContent(false);
  }, [isLoginModalOpen]);

  const colorsForModal = {
    backgroundColor: themeMode === "dark" ? "black" : "white",
    color: themeMode === "dark" ? "#2feb00" : "black",
  };

  return (
    <Box>
      <Dialog open={open} onClose={onClose}>
        <AlertLayout />
        <DialogContent sx={colorsForModal}>
          {!hideContent && (
            <>
              <DialogTitle
                sx={{
                  ...colorsForModal,
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                {" "}
                Login{" "}
              </DialogTitle>
              <TextField
                variant="outlined"
                label="Username"
                value={username}
                sx={{
                  ...inputPlaceholdersStyling,
                  width: "100%",
                  marginTop: "20px",
                }}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                  ...inputPlaceholdersStyling,
                  width: "100%",
                  marginTop: "20px",
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
                sx={{
                  ...buttonStyling,
                  border: themeMode === "dark" ? "white 1px solid" : "",
                }}
              >
                Login
              </Button>
            </>
          )}

          {!isLoggedIn ? (
            <>
              {location.pathname === "/register-user" ? (
                <> </>
              ) : (
                <>
                  <Typography variant="body1"> Not registered? </Typography>
                  <Link
                    to="/register-user"
                    onClick={handleSignUp}
                    className={colorsForModal.color}
                  >
                    Sign up HERE{" "}
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Typography variant="h6">
                {" "}
                Welcome to your account : {username}{" "}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LoginModal;
