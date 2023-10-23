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
