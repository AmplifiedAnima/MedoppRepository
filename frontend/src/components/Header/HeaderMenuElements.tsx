import React, { useContext, useEffect, useState } from "react";
import { Button, Switch } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { useNavigate } from "react-router-dom";
import caduceus_blue from "../../static/IconsMedopp/CADUCEUS_BLUE.png";
import caduceus_green from "../../static/IconsMedopp/CADUCEUS_GREEN.png";
import PowerIcon1Green from "./PowerIcon1Green.png";
import PowerIcon2Blue from "./PowerIcon2Blue.png";
import { ProfileIcon, ProfileIconDarkMode } from "../IconsIconFinder";
import { IconButton } from "@mui/material";

export const IconButtons = (
  handleProfileToggle: () => void,
  handleLoginModalOpen: () => void,
  imageStyles: {},
  isLoggedIn: boolean,
  themeMode: string
) => (
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
      <img src={PowerIcon1Green} alt="PowerIcon" style={imageStyles} />
    ) : (
      <img src={PowerIcon2Blue} alt="PowerIcon" style={imageStyles} />
    )}
  </IconButton>
);

export const HeaderMenuItem: React.FC = () => {
  const { themeMode } = useContext(ThemeContext);
  const isMobile = window.innerWidth < 768;

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };
  const iconHeightAndWeight = isMobile ? "38px" : "45px";

  return (
    <>
      <Button
        color="inherit"
        startIcon={
          themeMode === "dark" ? (
            <img
              src={caduceus_green}
              alt="Icon"
              width={iconHeightAndWeight}
              height={iconHeightAndWeight}
            />
          ) : (
            <img
              src={caduceus_blue}
              alt="Icon"
              width={iconHeightAndWeight}
              height={iconHeightAndWeight}
            />
          )
        }
        onClick={handleNavigation}
      />
    </>
  );
};

export const Switcher: React.FC = () => {
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const handleThemeToggle = () => {
    toggleTheme();
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    localStorage.setItem("themeMode", newThemeMode);
  };


  return (
    <>
      <Switch
        size="small"
        checked={themeMode === "dark"}
        onChange={handleThemeToggle}
        color="default"
        sx={{
          background:
            themeMode === "light" ? "rgba(65, 115, 252, 0.379)" : "#263139",
          transition: "background-color 1s",
          minWidth: "10px",
          minHeight: "10px",
          "@media (max-width: 768px)": {
            minWidth: "5px",
            minHeight: "5px",
          },
          borderRadius: "12px",
          "&.MuiSwitch-root": {
            position: "relative",
            height: "25px",
            marginRight: "10px",
            "@media (max-width: 768px)": {
              marginRight: "0px",
            },
          },
          "& .MuiSwitch-thumb": {
            minWidth: "0px",
            color: `${themeMode === "dark" ? "yellowgreen" : "black"}`,
            backgroundColor: `${themeMode === "dark" ? "white" : "white"}`,
            border: `1.5px solid ${themeMode === "dark" ? "black" : "white"}`,
          },
        }}
      />
    </>
  );
};
