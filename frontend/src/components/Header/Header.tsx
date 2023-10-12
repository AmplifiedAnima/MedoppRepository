import React, { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import SearchBar from "./SearchBar";
import ButtonSection from "./ButtonSection";
import Dashboard from "./Dashboard";
import specialities from "../Specialities";
import { ThemeContext } from "../../styles/ThemeProvider";
import styles from "./Header.module.css";
import { Switcher } from "./HeaderMenuElements";
import { HeaderMenuItem } from "./HeaderMenuElements";
import { ProfileIcon, ProfileIconDarkMode } from "../IconsIconFinder";
import { useNavigate } from "react-router-dom";
import PowerIcon1Green from "./PowerIcon1Green.png";
import PowerIcon2Blue from "./PowerIcon2Blue.png";
import FilterModal from "../Layout/FilterModal";
import { FilterOptions, useFilterContext } from "../../utlis/FilterContext";
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
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const { dispatch } = useAlertContext();
  const { state: filterState, dispatch: filterDispatch } = useFilterContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleProfileToggle = () => {
    setIsProfileOpen((prevOpen) => !prevOpen);
  };

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setIsFilterModalOpen(false);
  };

  const handleButtonSearch = (specialty: string) => {
    filterDispatch({ type: "SET_SPECIALTIES", payload: specialty });
  };

  const handleFilterOptionsApply = (filterOptions: FilterOptions) => {
    filterDispatch({
      type: "SET_PRICE_RANGE",
      payload: { min: filterOptions.minPrice, max: filterOptions.maxPrice },
    });
    filterDispatch({ type: "SET_LOCATION", payload: filterOptions.location });
    filterDispatch({
      type: "SET_EMPLOYMENT_TYPE",
      payload: filterOptions.typeOfEmployment,
    });
  };

  const handleLoginModalOpen = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
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
          className={`${styles["app-bar"]} ${
            themeMode === "dark" ? styles["dark-mode"] : ""
          }`}
        >
          <HeaderMenuItem />
          <IconButton
            color="inherit"
            className={styles["filter-button"]}
            onClick={handleFilterModalOpen}
          ></IconButton>
          <SearchBar />
          <Box
            className={styles["buttons-container"]}
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
            className={styles["profile-button"]}
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
      />
      <LoginModal open={isLoginModalOpen} onClose={handleLoginModalClose} />
      <AlertLayout />
    </>
  );
};

export default Header;
