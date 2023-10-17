
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
  };
};

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

  "&:active": {
    backgroundColor: themeMode === "dark" ? "yellow" : "green",
  },
  "@media (max-width: 600px)": {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
  },
});
