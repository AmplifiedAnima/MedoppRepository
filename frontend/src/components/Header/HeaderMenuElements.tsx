import React, { useContext, useState } from "react";
import { Typography, Button, Menu, MenuItem, Switch } from "@mui/material";
import { CaduceusIcon, CaduceusIconDarkMode } from "../IconsIconFinder";
import { ThemeContext } from "../../styles/ThemeProvider";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

export const HeaderMenuItem: React.FC = () => {
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);
  const { themeMode } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

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
          onClick={handleMenuOpen}
          className={styles["title-button"]}
        >
          MedOpp
        </Button>
      </Typography>
      <Menu
        id="menu"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        className={styles["menu"]}
      >
        <MenuItem onClick={handleNavigation}>Home</MenuItem>
      </Menu>
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
        className={`${styles["switcher"]} ${
          themeMode === "dark" ? styles["dark-mode"] : ""
        }`}
        sx={{
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
          "&.MuiSwitch-track": {
            height: "10px",
          },
          "@media (max-width: 600px)": {
            width: "40px",
            marginRight: "0px",
            marginLeft: "25px",
            // Adjust ot
          },
        }}
      />
    </>
  );
};
