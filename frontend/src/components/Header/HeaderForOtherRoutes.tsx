import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import styles from "./Header.module.css";
import Dashboard from "./Dashboard";
import PowerIcon1Green from "./PowerIcon1Green.png";
import PowerIcon2Blue from "./PowerIcon2Blue.png";
import { Switcher, HeaderMenuItem } from "./HeaderMenuElements";
import { ProfileIcon, ProfileIconDarkMode } from "../IconsIconFinder";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import LoginModal from "../Layout/LoginModal";
import AlertLayout from "../../utlis/Alerts";
import { useAlertContext } from "../../utlis/AlertHandlingContext";

interface HeaderForOtherRoutesProps {
  routeView: string;
}

const HeaderForOtherRoutes: React.FC<HeaderForOtherRoutesProps> = ({
  routeView,
}) => {
  const { isLoggedIn, setIsLoggedIn, isLoginModalOpen, setIsLoginModalOpen } =
    useContext(IsLoggedInContext);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const { themeMode } = useContext(ThemeContext);
  const { dispatch } = useAlertContext();
  const handleProfileToggle = () => {
    setIsProfileOpen((prevOpen) => !prevOpen);
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false); // Update the login state to "not logged in"
    setIsProfileOpen(false);
    dispatch({ type: "SHOW_SUCCESS", payload: "Sucessfully logged out!" });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERTS" });
    }, 1500);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar
          sx={{
            background: themeMode === "dark" ? "#000000" : "#001b45",
            padding: "0px",
          }}
        >
          <HeaderMenuItem />

          <Box sx={{ flexGrow: 3 }} />
          <Box sx={{ flexGrow: 0.1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                paddingLeft: "30px",
                fontSize: "15px",
                maxWidth: "100%",
                whiteSpace: "wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: themeMode === "dark" ? "#2feb00" : "#679af8",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {routeView}
            </Typography>
          </Box>
          <Switcher />
          <IconButton
            color="inherit"

            onClick={isLoggedIn ? handleProfileToggle : handleLoginModalOpen}
          >
            {isLoggedIn ? (
              themeMode === "dark" ? (
                <ProfileIconDarkMode />
              ) : (
                <ProfileIcon />
              )
            ) : themeMode === "dark" ? (
              <img
                src={PowerIcon1Green}
                alt="PowerIcon"
                style={{ width: "40px", height: "40px" }}
              />
            ) : (
              <img
                src={PowerIcon2Blue}
                alt="PowerIcon"
                style={{ width: "40px", height: "40px" }}
              />
            )}
          </IconButton>
        </Toolbar>
        <Dashboard
          isOpen={isProfileOpen}
          onClose={handleProfileToggle}
          onLogout={handleLogout}
        />
      </AppBar>
      <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
      <AlertLayout />
    </>
  );
};

export default HeaderForOtherRoutes;
