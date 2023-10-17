export const getOffersListStyles = (themeMode: string) => {
    return {
      background:
        themeMode === "dark"
          ? "linear-gradient(184deg, rgb(0, 0, 0) 8%, #263139 79%)"
          : "linear-gradient(180deg, #001b45 31%, #95979b 99%)",
      minHeight: "672px",
      maxHeight: "672px",
      overflowY: "scroll",
      width: "auto",
      margin: "0",
      padding: "0",
    };
  };