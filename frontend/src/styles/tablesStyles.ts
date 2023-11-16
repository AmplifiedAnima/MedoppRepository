export const getContainerStyles = (themeMode: string) => {
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

export const getInnerBoxStyles = () => {
  return {
    "@media (max-width: 768px)": {
      padding: "2px 20px",
      display: "block",
    },
  };
};

export const getTableStyles = () => {
  return {
    maxWidth: "100%",

    "& td": {
      padding: "22px 5px",
    },
    "@media (max-width: 768px)": {
      "& th": {
        display: "none",
      },
      "& td": {
        padding: "8px 0",
        borderBottom: "1px solid #ddd",
        textAlign: "center",
        display: "block",
      },
    },
  };
};
export const getHeaderStyles = (themeMode: string) => {
  return {
    color: themeMode === "dark" ? "white" : "black",
    fontWeight: "bold",

    padding: "10px 20px",
    textAlign: "center",
    textTransform: "capitalize",
    "& body1": {
      color: themeMode === "dark" ? "#2feb00" : "#679af8",
      fontSize: "24px",
      textTransform: "none",
    },
    "& h5": {
      color: themeMode === "dark" ? "#2feb00" : "#679af8",
      fontSize: "20px",
      "@media (max-width: 1248px)": {
        fontSize: "20px",
        overflow: "hidden",
      },
      "@media (max-width: 968px)": {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
  };
};

export const getCellStyles = (themeMode: string) => {
  return {
    color: themeMode === "dark" ? "white" : "black",
    fontWeight: "bold",
    fontSize: "1rem",
    padding: "10px 0px",
    textTransform: "capitalize",
    textAlign: "center",
  };
};
export const getadditionalIsMobileStyling = (themeMode: string) => {
  return {
    color: themeMode === "dark" ? "#2feb00" : "#679af8",
    display: "none",
    "@media (max-width: 768px)": {
      paddingBottom: "10px",
      display: "block",
      fontSize: "17px",
    },
  };
};
