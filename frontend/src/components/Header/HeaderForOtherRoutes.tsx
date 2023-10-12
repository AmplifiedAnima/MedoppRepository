
import React, { useContext, useState, useEffect } from "react";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProvider";
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
          className={`${styles["app-bar-for-other-routes"]} ${
            themeMode === "dark" ? styles["dark-mode"] : ""
          }`}
        >
          <HeaderMenuItem />

          <Box sx={{ flexGrow: 3 }} />
          <Box sx={{ flexGrow: 0.1 }}>
            <Typography
              variant="subtitle1"
              className={`${styles["routeViewText"]} ${
                themeMode === "dark" ? styles["dark-mode"] : ""
              }`}
              sx={{
                paddingLeft:'30px',
                fontSize: "15px",
                maxWidth: "100%", // Set maximum width to 100%
                whiteSpace: "wrap", // Prevent text from wrapping
                overflow: "hidden", // Hide overflow text
                textOverflow: "ellipsis", // Add ellipsis (...) for long text
              }}
            >
              {routeView}
            </Typography>
          </Box>
          <Switcher />
          <IconButton
            color="inherit"
            className={styles["profile-button"]}
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
                style={{ width: "45px", height: "45px" }}
              />
            ) : (
              <img
                src={PowerIcon2Blue}
                alt="PowerIcon"
                style={{ width: "45px", height: "45px" }}
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
