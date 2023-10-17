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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onHandleSearchSubmit();
    }
  };

  const inputStyle = {
    width: "370px",
    padding: "2.5px 10px",
    fontSize: "17px",
    borderRadius: "4px",
    border: themeMode ==='dark' ? " 1px solid #36d336" : '',
    backgroundColor: themeMode === "dark" ? "#000000" : "#e9f2ed",
    color: themeMode === "dark" ? "#36d336" : "#000000",
    fontWeight: "bold",
    position: "relative",
    zIndex: 1,
    boxShadow: "none",

    "@media (max-width: 768px)": {
      width: "100%",
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
            marginLeft: "5px",
          }}
          onClick={onHandleSearchSubmit}
        >
          <SearchIcon sx={{ color: "white", fontSize: "30px" }} />
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
