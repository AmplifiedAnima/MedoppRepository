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
  gridTemplateColumns: "1fr 1fr 1fr",
  marginLeft: "40px",
  gap: "0px 20px",
  "@media (min-width: 769px) and (max-width: 1200px)": {
    gridTemplateColumns: "1fr 1fr",
    margin: "0px 0px",
    gap: "0px 70px",
  },

  "@media (max-width: 768px)": {
    gridTemplateColumns: "1fr 1fr",
    gap: "0px 70px",
    margin: "0px 10px",
    marginLeft: "40px",
  },
  "@media (max-width: 280px)": {
    display: "block",
    margin: "0px 0px",
    gap: "0px",
    marginLeft: "30px",
  },
};

export const getCommonTextStyling = (isSelected: boolean) => ({
  fontSize: "16px",
  color: "#ffffff",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: !isSelected ? "200px" : "auto",
  "@media (max-width: 768px)": {
    fontSize: "14px",
  },
});
export const iconStyling = {
  fontSize: "16px",
  paddingRight: "4px",
  position: "relative",
  top: "2px",
};
