export const getOffersListStyles = (themeMode: string) => {
  return {
    background:
      themeMode === "dark"
        ? "linear-gradient(184deg, rgb(0, 0, 0) 8%, #263139 79%)"
        : "linear-gradient(180deg, #001b45 31%, #95979b 99%)",
    height: "100vh",
    width: "100vw",
    overflowY: "scroll",
    margin: "0",
    padding: "0",
  };
};

export const getCardStylingOffersList = (
  themeMode: string,
  isSelected: boolean
) => ({
  margin: "10px 20px",
  borderRadius: "8px",
  backgroundColor:
    themeMode === "dark" ? "rgba(0,0,0, 1)" : "rgba(209, 233, 246, 0.055)",
  width: "auto",
  position: "relative",
  fontFamily: "Helvetica",
  height: "auto",
  "&:hover": {
    backgroundColor: isSelected ? null : "rgba(200, 233, 246, 0.15)",
  },
});

export const gridStylingOffersList = {
  display: "grid",
  gridTemplateColumns: "2fr 2.5fr 2fr",
  marginLeft: "40px",
  gap: "0px 20px",
  "@media (min-width: 769px) and (max-width: 1200px)": {
    gridTemplateColumns: "2fr 1.5fr",
    margin: "0px 20px",
    gap: "0px 20px",
  },

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr 1fr",
    margin: "0px 20px",
  },
  "@media (max-width: 540px)": {
    gridTemplateColumns: "2.5fr 1.5fr",
    margin: "0px 20px",
  },
  "@media (max-width: 280px)": {
    display: "block",
    margin: "0px 20px",
    marginLeft: "25px",
  },
};

export const getCommonTextStyling = (isSelected: boolean) => ({
  fontSize: "17px",
  color: "#ffffff",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",

  "@media (min-width: 769px) and (max-width: 1200px)": {
    overflow: "",
    whiteSpace: "",
    textOverflow: "",
    fontSize: "13px",
  },

  "@media (max-width: 768px)": {
    fontSize: "14px",
    margin: "3px 0px",
  },
});
export const iconStyling = {
  fontSize: "18px",
  paddingRight: "3.8px",
  position: "relative",
  top: "2px",
};
