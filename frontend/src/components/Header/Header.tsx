import React, { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import SearchBar from "./SearchBar";
import ButtonSection from "./ButtonSection";
import Dashboard from "./Dashboard";
import specialities from "../Specialities";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { Switcher } from "./HeaderMenuElements";
import { HeaderMenuItem } from "./HeaderMenuElements";
import {
  ProfileIcon,
  ProfileIconDarkMode,
  filterWhiteIcon,
  filterGreenIcon,
} from "../IconsIconFinder";
import PowerIcon1Green from "./PowerIcon1Green.png";
import PowerIcon2Blue from "./PowerIcon2Blue.png";
import FilterModal from "../Layout/FilterModal";
import { useSearchHook } from "../Layout/SearchFunctionalityHook";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import LoginModal from "../Layout/LoginModal";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import AlertLayout from "../../utlis/Alerts";

const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { isLoggedIn, setIsLoggedIn, isLoginModalOpen, setIsLoginModalOpen } =
    useContext(IsLoggedInContext);

  const { themeMode } = useContext(ThemeContext);
  const { dispatch } = useAlertContext();

  const handleProfileToggle = () => {
    setIsProfileOpen((prevOpen) => !prevOpen);
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  const {
    handleResetAllSearchQueries,
    handleFilterOptionsApply,
    handleSpecialtyReset,
    handleLocationReset,
    handleTypeOfEmploymentReset,
    handlePriceRangeReset,
    handleButtonSearch,
    handleInputChange,
    handleSearchSubmit,
    searchQuery,
  } = useSearchHook(handleFilterModalClose);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <>
      <style>
        {
        `@media (min-width: 1480px) {
          ::-webkit-scrollbar {
            display: none;}}`
        }
      </style>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: themeMode === "dark" ? "#000000" : "#001b45",
            color: "#ffffff",
            padding: "0px 20px",
            margin: "0px",
          }}
        >
          <HeaderMenuItem />
          <Box sx={{ padding: "0 2px" }} />
          <IconButton color="inherit" onClick={handleFilterModalOpen}>
            {themeMode === "dark" ? filterGreenIcon() : filterWhiteIcon()}
          </IconButton>
          <Box sx={{ padding: "0 6px" }} />
          <SearchBar
            onHandleSearchSubmit={handleSearchSubmit}
            onHandleInputChange={handleInputChange}
            searchQuery={searchQuery}
          />
          <Box
            style={{
              width: "100%",
              display: isMobile ? "none" : "block",
              overflowX: "auto",
              margin: "0px",
            }}
          >
            <ButtonSection
              buttons={specialities}
              onButtonSearch={handleButtonSearch}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Switcher />
          <IconButton
            color="inherit"
            onClick={isLoggedIn ? handleProfileToggle : handleLoginModalOpen}
            sx={{ paddingLeft: "10px" }}
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
      </AppBar>
      <Dashboard
        isOpen={isProfileOpen}
        onClose={handleProfileToggle}
        onLogout={handleLogout}
      />
      <FilterModal
        open={isFilterModalOpen}
        onClose={handleFilterModalClose}
        onApply={handleFilterOptionsApply}
        resetAllQueries={handleResetAllSearchQueries}
      />
      <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
      <AlertLayout
        onSpecialtyClose={handleSpecialtyReset}
        onLocationClose={handleLocationReset}
        onEmploymentTypeClose={handleTypeOfEmploymentReset}
        onPriceRangeClose={handlePriceRangeReset}
      />
    </>
  );
};

export default Header;
