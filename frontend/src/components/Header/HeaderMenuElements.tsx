import React, { useContext, useState } from "react";
import { Typography, Button, Menu, MenuItem, Switch } from "@mui/material";
import { CaduceusIcon, CaduceusIconDarkMode } from "../IconsIconFinder";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

export const HeaderMenuItem: React.FC = () => {
  const { themeMode } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <>
      <Typography variant="h6">
        <Button
          color="inherit"
          startIcon={
            themeMode === "dark" ? <CaduceusIconDarkMode /> : <CaduceusIcon />
          }
          onClick={handleNavigation}
        >
          MedOpp
        </Button>
      </Typography>
    </>
  );
};

export const Switcher: React.FC = () => {
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const handleThemeToggle = () => {
    toggleTheme();
    console.log(themeMode);
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
          borderRadius: "12px",
          "&.MuiSwitch-root": {
            position: "relative",
            height: "25px",
            marginRight: "10px",
          },
          "& .MuiSwitch-thumb": {
            minWidth: "0px",
            color: `${themeMode === "dark" ? "yellowgreen" : "black"}`,
            backgroundColor: `${themeMode === "dark" ? "white" : "white"}`,
            border: `1.5px solid ${themeMode === "dark" ? "black" : "white"}`,
          },
          // "&.MuiSwitch-track": {
          //   height: "10px",
          // },
          // "@media (max-width: 600px)": {
          //   width: "40px",
          //   marginRight: "0px",
          //   marginLeft: "25px",
          //   // Adjust ot
          // },
        }}
      />
    </>
  );
};
