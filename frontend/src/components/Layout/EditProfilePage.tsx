import React, {
  useRef,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Box, Container, Paper, TextField, Button } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProvider";
import HeaderForOtherRoutes from "../Header/HeaderForOtherRoutes";
import {
  getInputPlaceholdersStyling,
  getPaperStyling,
  getButtonStyling,
} from "./inputStylingForFormLoginRegistration";

export const EditProfilePage = () => {
  const { themeMode } = useContext(ThemeContext);
  const usernameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);

  const inputPlaceholdersStyling = getInputPlaceholdersStyling(themeMode);
  const paperStyling = getPaperStyling(themeMode);
  const buttonStyling = getButtonStyling(themeMode);

  const [userData, setUserData] = useState({
    username: "",
    phoneNumber: "",
    cv: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/userdata", {
          method: "GET",
          headers: {
            // Include any necessary headers
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData({
            username: data.username,
            phoneNumber: data.phoneNumber,
            cv: data.cv,
            address: data.address,
            city: data.city,
          });
        } else {
          console.error("Failed to fetch user data:", response.statusText);
          // Handle failed data fetching
        }
      } catch (error) {
        console.error("Error during data fetching:", error);
        // Handle other errors
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUserData = {
      username: usernameRef.current?.value,
      phoneNumber: phoneNumberRef.current?.value,
      cv: cvRef.current?.value,
      address: addressRef.current?.value,
      city: cityRef.current?.value,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/editprofile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile update successful:", data);
        // Handle successful profile update, e.g., show a success message
      } else {
        console.error("Profile update failed:", response.statusText);
        // Handle failed profile update, e.g., show an error message
      }
    } catch (error) {
      console.error("Error during profile update:", error);
      // Handle other errors
    }
  };

  const titleOfEditProfileForm = "Edit Profile";

  return (
    <Box
      sx={{
        backgroundColor: themeMode === "dark" ? "black" : " #121a26",
      }}
    >
      <HeaderForOtherRoutes routeView={titleOfEditProfileForm} />
      <Container
        maxWidth="xl"
        sx={{
          marginTop: "20px",
          height: "709px",
          width:'680px',
          "@media (max-width: 800px)":
          {
            width: 'auto',
            height:'auto'
          }
        }}
      >
        <Paper elevation={3} sx={{ ...paperStyling, padding: "20px 40px" }}>
          <form onSubmit={handleProfileUpdate}>
            <TextField
              label="Username"
              fullWidth
              defaultValue={userData.username}
              variant="outlined"
              margin="normal"
              sx={inputPlaceholdersStyling}
            />
               <TextField
            label="Current Password"
            fullWidth
            type="password"
            variant="outlined"
            margin="normal"
            sx={inputPlaceholdersStyling}
          />
          <TextField
            label="New Password"
            fullWidth
            type="password"
            variant="outlined"
            margin="normal"
            sx={inputPlaceholdersStyling}
          />
            <TextField
              label="Phone Number"
              fullWidth
              defaultValue={userData.phoneNumber}
              variant="outlined"
              margin="normal"
              sx={inputPlaceholdersStyling}
            />
            <TextField
              label="Address"
              fullWidth
              defaultValue={userData.address}
              variant="outlined"
              margin="normal"
              sx={inputPlaceholdersStyling}
            />
            <TextField
              label="City"
              fullWidth
              defaultValue={userData.city}
              variant="outlined"
              margin="normal"
              sx={inputPlaceholdersStyling}
            />
            <TextField
              label="CV"
              fullWidth
              defaultValue={userData.cv}
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
              Update Profile
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
