export const getButtonStyles = (themeMode: string) => {
    return {
      fontSize: "14px",
      letterSpacing: "2px",
      padding: "7px 10px",
      borderRadius: "6px",
      backgroundColor: themeMode === "dark" ? "#333a31" : "#0d305f",
      color: themeMode === "dark" ? "#02dc10" : "#f4f4f4",
      "&:hover": {
        backgroundColor: themeMode === "dark" ? "#1a1f17" : "#1552a5",
        color: themeMode === "dark" ? "#02f016" : "#ffffff",
      },
    };
  };
  