import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import Dashboard from "./Dashboard";
import { Switcher, HeaderMenuItem } from "./HeaderMenuElements";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import LoginModal from "../Layout/LoginModal";
import AlertLayout from "../../utlis/Alerts";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import { IconButtons } from "./HeaderMenuElements";

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
    localStorage.removeItem("token");
    setIsLoggedIn(false); 
    setIsProfileOpen(false);
    dispatch({ type: "SHOW_SUCCESS", payload: "Sucessfully logged out!" });
    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERTS" });
    }, 1500);
  };
  const isMobile = window.innerWidth < 768;

  const imageStyles = {
    width: isMobile ? "30px" : "40px",
    height: isMobile ? "30px" : "40px",
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
                maxWidth: "100%",
                whiteSpace: "wrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: themeMode === "dark" ? "#2feb00" : "#679af8",
                alignItems: "center",
                flexWrap: "wrap",
                fontSize: isMobile ? "12px" : "16px",
                padding: isMobile ? "0px 10px" : "0px 5px",
              }}
            >
              {routeView}
            </Typography>
          </Box>
          <Switcher />
          {IconButtons(
            handleProfileToggle,
            handleLoginModalOpen,
            imageStyles,
            isLoggedIn,
            themeMode
          )}
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
