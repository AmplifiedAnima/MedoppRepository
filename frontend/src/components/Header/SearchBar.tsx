import React, { useState, useEffect, useContext } from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../../styles/ThemeProvider";
import { useFilterContext } from "../../utlis/FilterContext";

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { themeMode, toggleTheme } = useContext(ThemeContext);
  const { state: filterState, dispatch: filterDispatch } = useFilterContext();

  const handleSearchSubmit = () => {
    filterDispatch({ type: "SET_QUERY", payload: searchQuery });
    filterDispatch({ type: "SET_SPECIALTIES", payload: "" });
    filterDispatch({ type: "SET_LOCATION", payload: "" });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };
  return (
    <div className={styles["search-bar-container"]}>
      <div
        className={`${styles["input-container"]} ${
          themeMode === "dark" ? styles["dark-mode"] : ""
        }`}
      >
        <input
          type="text"
          className={`${styles["search-input"]} ${
            themeMode === "dark" ? styles["dark-mode"] : ""
          }`}
          placeholder={"Search here..."}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className={styles["search-button"]}
          onClick={handleSearchSubmit}
        >
          <SearchIcon sx={{ color: "white", fontSize: "30px" }} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
