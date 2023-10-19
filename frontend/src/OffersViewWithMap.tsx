import React, { useContext } from "react";
import { ThemeContext } from "./styles/ThemeProviderContext";
import { Box, Button } from "@mui/material";
import Header from "./components/Header/Header";
import { Offer } from "./components/JobOffers/OfferInterface";
import appStyle from "./App.module.css";
import { styled } from "@mui/material/styles";
import { useFilterContext } from "./utlis/FilterContext";
import OfferCard from "./components/JobOffers/OfferCard";
import { getButtonStyles } from "./styles/buttonStyling";
import { getOffersListStyles } from "./styles/offersListStyle";

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
  mapComponent: React.ReactNode;
}

const OffersViewWithMap: React.FC<OffersViewWithMapProps> = ({
  isMobile,
  showJobBoard,
  handleToggleJobBoard,
  filteredOffers,
  handleOfferClose,
  mapComponent,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const { state: filterState } = useFilterContext();

  const buttonStyles = getButtonStyles(themeMode);
  const offersListStyle = getOffersListStyles(themeMode);

  const offerCardVariable = filteredOffers.map((offer, index) => (
    <OfferCard
      key={offer.id}
      offer={offer}

      onCloseOffer={handleOfferClose}
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
            sx={buttonStyles}
          >
            {showJobBoard ? "MAP" : "JOB"}
          </Button>
        </Box>
      )}
      {isMobile ? (
        <Box sx={{
          "@media (max-width: 768px)": {
            height: "auto"
          },
        }}>
          {showJobBoard ? (
            <Box sx={offersListStyle}>{offerCardVariable}</Box>
          ) : (
            <Box sx={{ overflow: "auto" }}>{mapComponent}</Box>
          )}
        </Box>
      ) : (
        <FlexContainer
          sx={{
            background:
              themeMode === "dark"
                ? "linear-gradient(180deg,  #000000 50%,  #02dc10 99%)"
                : "linear-gradient(180deg, #001b45 10%, #476bad 99%)",
          }}
        >
          <LeftColumn sx={offersListStyle} >
            <>{offerCardVariable}</>
          </LeftColumn>
          <RightColumn> {mapComponent} </RightColumn>
        </FlexContainer>
      )}
      
    </Container>
  );
};

export default OffersViewWithMap;
