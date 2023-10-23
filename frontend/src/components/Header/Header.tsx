import React, { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import SearchBar from "./SearchBar";
import ButtonSection from "./ButtonSection";
import Dashboard from "./Dashboard";
import specialities from "../Specialities";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { Switcher } from "./HeaderMenuElements";
import { HeaderMenuItem } from "./HeaderMenuElements";
import FilterModal from "../Layout/FilterModal";
import { useSearchHook } from "../Layout/SearchFunctionalityHook";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import LoginModal from "../Layout/LoginModal";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import AlertLayout from "../../utlis/Alerts";
import filterWhite from "../../static/IconsMedopp/FILTER_WHITE.png";
import filterGreen from "../../static/IconsMedopp/FILTER_GREEN.png";
import { IconButtons } from "./HeaderMenuElements";

const Header: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const imageStyles = {
    width: isMobile ? "30px" : "40px",
    height: isMobile ? "30px" : "40px",
  };

  const filterIconHeightAndWeight = isMobile ? "27px" : "34px";

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
        {`@media (min-width: 1480px) {
          ::-webkit-scrollbar {
            display: none;}}`}
      </style>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: themeMode === "dark" ? "#000000" : "#001b45",
            color: "#ffffff",
            padding: isMobile ? "5px 10px" : "2px 20px",
            margin: "0px",
          }}
        >
          <HeaderMenuItem />

          <IconButton onClick={handleFilterModalOpen}>
            {themeMode === "light" ? (
              <img
                src={filterWhite}
                alt="Icon"
                width={filterIconHeightAndWeight}
                height={filterIconHeightAndWeight}
              />
            ) : (
              <img
                src={filterGreen}
                alt="Icon"
                width={filterIconHeightAndWeight}
                height={filterIconHeightAndWeight}
              />
            )}
          </IconButton>
          <Box sx={{ padding: isMobile ? "0 2px" : "0 6px" }} />
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
          {IconButtons(
            handleProfileToggle,
            handleLoginModalOpen,
            imageStyles,
            isLoggedIn,
            themeMode
          )}
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
