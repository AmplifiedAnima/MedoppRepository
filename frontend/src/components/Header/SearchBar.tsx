import React, { useState, useEffect, useContext } from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { Box, Button, Input } from "@mui/material";

interface SearchBarProps {
  onHandleSearchSubmit: () => void;
  onHandleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onHandleSearchSubmit,
  onHandleInputChange,
  searchQuery,
}) => {
  const { themeMode } = useContext(ThemeContext);

  const isMobile = window.innerWidth < 768;

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onHandleSearchSubmit();
    }
  };

  const inputStyle = {
    padding: "2px 10px",
    fontSize: "17px",
    borderRadius: "4px",
    border: themeMode === "dark" ? " 1px solid #36d336" : "",
    backgroundColor: themeMode === "dark" ? "#000000" : "#e9f2ed",
    color: themeMode === "dark" ? "#36d336" : "#000000",
    fontWeight: "bold",
    position: "relative",
    zIndex: 1,
    boxShadow: "none",

    "@media (min-width: 1480px)": {
      width: "400px",
    },

    "@media (max-width: 768px)": {
      width: "100%",
      padding: "2px 7px",
      fontSize: "14px",
    },
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Input
          type="text"
          disableUnderline={true}
          sx={inputStyle}
          placeholder={"Search here..."}
          value={searchQuery}
          onChange={onHandleInputChange}
          onKeyUp={handleKeyPress}
        />
        <Button
          sx={{
            background: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          onClick={onHandleSearchSubmit}
        >
          <SearchIcon
            sx={{ color: "white", fontSize: isMobile ? "25px" : "30px" }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
