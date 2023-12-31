export const getInputPlaceholdersStyling = (themeMode: "dark" | "light") => ({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    padding: "20px",
    borderColor: themeMode === "dark" ? "#2feb00" : "rgba(65, 115, 252, 0.379)",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: themeMode === "dark" ? "#2feb00" : "rgba(65, 115, 252, 0.379)",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: themeMode === "dark" ? "#2feb00" : "black",
  },
  "& .MuiInputLabel-outlined": {
    color: themeMode === "dark" ? "#2feb00" : "black",
    fontWeight: "bold",
  },
  "& .MuiOutlinedInput-input": {
    color: themeMode === "dark" ? "#2feb00" : "black",
    "&:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0 100px ${
        themeMode === "dark" ? "#000" : "#fff"
      } inset`,
      "-webkit-text-fill-color": themeMode === "dark" ? "#2feb00" : "black",
      "background-clip": "text !important",
    },
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: themeMode === "dark" ? "#229907" : "lightgray",
  },
  "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
    background: "transparent",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    fontSize: "13px",
  },
});

export const getInputPlaceholdersStylingForJobApply = (
  themeMode: "dark" | "light"
) => ({
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    padding: "20px",
    borderColor: themeMode === "dark" ? "#2feb00" : "white",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: themeMode === "dark" ? "#2feb00" : "white",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: themeMode === "dark" ? "#2feb00" : "white",
  },
  "& .MuiInputLabel-outlined": {
    color: themeMode === "dark" ? "#2feb00" : "white",
    fontWeight: "bold",
  },
  "& .MuiOutlinedInput-input": {
    color: themeMode === "dark" ? "#2feb00" : "white",
    "&:-webkit-autofill": {
      "-webkit-box-shadow": `0 0 0 100px ${
        themeMode === "dark" ? "#000" : "transparent"
      } inset`,
      "-webkit-text-fill-color":
        themeMode === "dark" ? "#2feb00" : "transparent",
      "background-clip": "text !important",
    },
  },
  "& .MuiAutocomplete-listbox .MuiAutocomplete-option.Mui-focused": {
    background: "transparent",
  },

  "@media (max-width: 600px)": {
    width: "100%",
    fontSize: "13px",
  },
});
export const getReactQuillStyling = (themeMode: "dark" | "light") => {
  const borderColor = themeMode === "dark" ? "#2feb00" : "";
  return {
    width: "100%",
    maxWidth: "420px",
    minWidth: "100%",
    backgroundColor: "transparent",
    color: themeMode === "dark" ? "#2feb00" : "black",
    border: `1px solid ${borderColor}`,
    borderRadius: "4px",
    minHeight: "auto",
    "&.quill-disabled": {
      pointerEvents: "none",
      opacity: 1,
    },
  };
};
export const getCustomMenuItemStyles = (themeMode: "dark" | "light") => ({
  background: themeMode === "dark" ? "black" : "white",
  color: themeMode === "dark" ? "white" : "black",
  "&:hover": {
    background: themeMode === "dark" ? "#2feb00" : "#001b45",
    color: themeMode === "dark" ? "black" : "white",
  },
  "&.Mui-selected": {
    background: themeMode === "dark" ? "#2feb00" : "#001b45",
    color: themeMode === "dark" ? "black" : "white",
  },
});

export const getPaperStyling = (themeMode: "dark" | "light") => ({
  padding: "10px 30px",
  margin: "20px 10px",
  background:
    themeMode === "dark"
      ? "linear-gradient(20deg, rgb(0, 0, 0) 20%, #263139 89%)"
      : "#FFFFFF",
  color: themeMode === "dark" ? "white" : "black",
  width: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  borderRadius: "15px",
  "@media (max-width: 600px)": {
    width: "auto",
    padding: "35px",
    marginLeft: "20px",
  },
});

export const getButtonStyling = (themeMode: "dark" | "light") => ({
  width: "100%",
  padding: "15px",
  marginTop: "25px",
  transition: "background-color 0.3s",
  backgroundColor: themeMode === "dark" ? "black" : "#092140",
  border: "1px solid black",
  color: themeMode === "dark" ? "white" : "white",

  "&:hover": {
    backgroundColor: themeMode === "dark" ? "#2feb00" : "#2feb00",
    color: "black",
  },

  "@media (max-width: 600px)": {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
  },
});
