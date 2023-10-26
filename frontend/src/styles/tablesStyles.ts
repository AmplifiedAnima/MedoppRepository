export const getContainerStyles = (themeMode:string) => {
    return {
      background:
        themeMode === "dark"
          ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)"
          : "white",
      color: themeMode === "dark" ? "white" : "black",
      maxWidth: "100%",
      "@media (max-width: 768px)": {
        width: "100%",
      },
    };
  };
  
  export const getInnerBoxStyles = (isMobile: boolean) => {
    return {
      padding: isMobile ? "5px 20px" : "10px 30px",
      display: isMobile ? "block" : "",
    };
  };
  
  export const getTableStyles = (themeMode: string, isMobile: boolean) => {
    return {
      maxWidth: "100%",
      "@media (max-width: 768px)": {
        "& th": {
          display: "none",
        },
        "& td": {
          padding: "8px 0",
          borderBottom: "1px solid #ddd",
          textAlign: "left",
          display: "block",
        },
      },
    };
  };
  
  export const getCellStyles = (themeMode: string) => {
    return {
      color: themeMode === "dark" ? "white" : "black",
      fontWeight: "bold",
      fontSize: "1rem",
      padding: "8px 12px",
      textTransform: "capitalize",
    };
  };
  
  export const getHeaderStyles = (themeMode: string) => {
    return {
      color: themeMode === "dark" ? "white" : "black",
      fontWeight: "bold",
      fontSize: "1rem",
      padding: "8px 12px",
      textTransform: "capitalize",
      "& h5": {
        color: themeMode === "dark" ? "#2feb00" : "#679af8", // Blue or green text color
      },
    };
  };
  