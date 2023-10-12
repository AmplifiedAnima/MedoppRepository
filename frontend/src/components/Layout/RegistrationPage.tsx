import React, { useRef, FormEvent, useContext, useEffect } from "react";
import { TextField, Button, Container, Paper, Box } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProvider";
import HeaderForOtherRoutes from "../Header/HeaderForOtherRoutes";
import {
  getInputPlaceholdersStyling,
  getPaperStyling,
  getButtonStyling,
} from "./inputStylingForFormLoginRegistration";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import AlertLayout from "../../utlis/Alerts";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import { useNavigate } from "react-router";

const RegistrationPage = () => {
  const { themeMode } = useContext(ThemeContext);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const {
    isLoggedIn,
    setIsLoggedIn,
    setUsername,
    setRoles,
  } = useContext(IsLoggedInContext);
  
  const { dispatch } = useAlertContext();

  const handleRegistration = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      cv: cvRef.current?.value,
      address: addressRef.current?.value,
    };

    dispatch({ type: "CLEAR_ALERTS" });

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({
          type: "SHOW_SUCCESS",
          payload: `You have registered correctly !`,
        });

        localStorage.setItem("token", data.accessToken);
        setUsername(data.user.username);
        setRoles(data.user.roles);
        setIsLoggedIn(true);
      } else {
        dispatch({ type: "SHOW_ERROR", payload: response.statusText });
        console.error("Registration failed:", response.statusText);
        // Handle failed registration, e.g., show an error message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle any other errors that may occur during registration
    }
  };

  const titleOfRegistrationForm = `Registration`;

  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);
  const paperStyling = getPaperStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);

  return (
    <Box
      sx={{
        backgroundColor: themeMode === "dark" ? "black" : " #121a26",
      }}
    >
      <HeaderForOtherRoutes routeView={titleOfRegistrationForm} />
      {!isLoggedIn && (
        <Container
          maxWidth="xl"
          sx={{
            marginTop: "40px",
            height: "629px",
          }}
        >
          {" "}
          <Paper elevation={3} sx={{ ...paperStyling, padding: "20px 40px" }}>
            <form onSubmit={handleRegistration}>
              <TextField
                label="Username"
                fullWidth
                inputRef={usernameRef}
                variant="outlined"
                margin="normal"
                sx={inputPlaceholdersStyling}
              />
              <TextField
                label="Password"
                fullWidth
                type="password"
                inputRef={passwordRef}
                variant="outlined"
                margin="normal"
                sx={inputPlaceholdersStyling}
              />
              <TextField
                label="Phone Number"
                fullWidth
                inputRef={phoneNumberRef}
                variant="outlined"
                margin="normal"
                sx={inputPlaceholdersStyling}
              />

              <TextField
                label="Address"
                fullWidth
                inputRef={addressRef}
                variant="outlined"
                margin="normal"
                sx={inputPlaceholdersStyling}
              />
              <TextField
                label="City"
                fullWidth
                inputRef={cityRef}
                variant="outlined"
                margin="normal"
                sx={inputPlaceholdersStyling}
              />
              <TextField
                label="CV"
                fullWidth
                inputRef={cvRef}
                variant="outlined"
                margin="normal"
                sx={inputPlaceholdersStyling}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  ...buttonStyling,
                  border: themeMode === "dark" ? "white 1px solid" : "",
                  marginBottom: "20px",
                }}
                fullWidth
              >
                Register
              </Button>
            </form>
          </Paper>
          <AlertLayout />
        </Container>
      )}
    </Box>
  );
};

export default RegistrationPage;
