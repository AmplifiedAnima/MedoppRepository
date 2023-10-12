import React, { useContext } from "react";
import { ThemeContext } from "./styles/ThemeProvider";
import { Box, Button } from "@mui/material";
import Header from "./components/Header/Header";
import { Offer } from "./components/JobOffers/OfferInterface";
import styles from "./components/JobOffers/OffersCard.module.css";
import appStyle from "./App.module.css";
import { styled } from "@mui/material/styles";
import { useFilterContext } from "./utlis/FilterContext";
import OfferCard from "./components/JobOffers/OfferCard";

export const Container = styled("div")({
  backgroundColor: "#E0E0F1",
});

export const FlexContainer = styled("div")({
  display: "flex",
  gap: "10px",
});

export const LeftColumn = styled("div")({
  flex: "1",
  padding: "0rem",
});

export const RightColumn = styled("div")({
  flex: "1",
  padding: "0rem",
  backgroundColor: "#293039",
});

interface OffersViewWithMapProps {
  filteredOffers: Offer[];
  isMobile: boolean;
  showJobBoard: boolean;
  handleToggleJobBoard: () => void;
  handleOfferClick: (offer: Offer | null) => void; // Update the function type
  handleOfferClose: () => void;
  handleMapReset: () => void;
  mapComponent: React.ReactNode;
}

const OffersViewWithMap: React.FC<OffersViewWithMapProps> = ({
  isMobile,
  showJobBoard,
  handleToggleJobBoard,
  filteredOffers,
  handleOfferClick,
  handleOfferClose,
  handleMapReset,
  mapComponent,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const { state: filterState } = useFilterContext();

  const offerCardVariable = filteredOffers.map((offer, index) => (
    <OfferCard
      key={offer.id}
      offer={offer}
      onOfferClick={handleOfferClick}
      onCloseOffer={handleOfferClose}
      onMapReset={handleMapReset}
      isSelected={false}
      offerId={filterState.selectedOffer?.id || ""}
    />
  ));

  return (
    <Container>
      <Header />
      {isMobile && (
        <Box className={appStyle["container"]}>
          <Button
            onClick={handleToggleJobBoard}
            variant="contained"
            className={`${appStyle["button"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {showJobBoard ? "MAP" : "JOB"}
          </Button>
        </Box>
      )}
      {isMobile ? (
        <Box>
          {showJobBoard ? (
            <Box
              className={`${styles["offers-list"]} ${
                themeMode === "dark" ? styles["dark-mode"] : ""
              }`}
            >
              {offerCardVariable}
            </Box>
          ) : (
            <Box sx={{ overflow: "auto" }}>{mapComponent}</Box>
          )}
        </Box>
      ) : (
        <FlexContainer
          sx={{
            background:
            themeMode === "dark"
              ? "linear-gradient(180deg,  #000000 10%,  #FF0000 99%)" // Dark mode with red background
              : "linear-gradient(180deg, #001b45 10%, #476bad 99%)" // Light mode with lighter golden background
          
          }}
        >
          <LeftColumn
            className={`${styles["offers-list"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            <>{offerCardVariable}</>
          </LeftColumn>
          <RightColumn>{mapComponent}</RightColumn>
        </FlexContainer>
      )}
    </Container>
  );
};

export default OffersViewWithMap;
