import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./styles/ThemeProvider";
import { Box, Button, Container } from "@mui/material";
import HeaderForOtherRoutes from "./components/Header/HeaderForOtherRoutes";
import { Offer } from "./components/JobOffers/OfferInterface";
import styles from "./components/JobOffers/OffersCard.module.css";
import appStyle from "./App.module.css";
import OfferCard from "./components/JobOffers/OfferCard";
import { FlexContainer, LeftColumn, RightColumn } from "./OffersViewWithMap";
import { useFilterContext } from "./utlis/FilterContext";
import { useParams } from "react-router-dom";

interface OfferWithIdAndMapViewProps {
  mapComponent: React.ReactNode;
  handleCloseOffer: () => void;
  onMapReset: () => void;
  isMobile: boolean;
  showOfferCard: boolean;
  selectedOffer: Offer | null;
  handleToggleOfferCard: () => void;
}

const OfferWithIdAndMapView: React.FC<OfferWithIdAndMapViewProps> = ({
  mapComponent,
  handleCloseOffer,
  onMapReset,
  isMobile,
  showOfferCard,
  handleToggleOfferCard,
  selectedOffer,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const { state: filterState, dispatch } = useFilterContext();

  const { id } = useParams<{ id: string }>();

  const offerCardVariable = selectedOffer ? (
    <OfferCard
      offer={selectedOffer}
      onCloseOffer={handleCloseOffer}
      onMapReset={onMapReset}
      isSelected={true}
      offerId={selectedOffer.id}
      onOfferClick={() => {}}
    />
  ) : null;

  useEffect(() => {
    if (id) {
      // Fetch the offer data based on the ID from your data source
      const fetchOfferData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/offers/${id}`);
          const data = await response.json();
          dispatch({ type: "SET_SELECTED_OFFER", payload: data });
        } catch (error) {
          console.error(error);
        }
      };

      fetchOfferData();
    }
  }, [id]);

  return (
    <>
      {selectedOffer && (
        <HeaderForOtherRoutes
          routeView={`
            ${selectedOffer.company}
            in ${selectedOffer.location}`}
        />
      )}

      {isMobile && (
        <Box className={appStyle["container"]}>
          <Button
            onClick={handleToggleOfferCard}
            variant="contained"
            className={`${appStyle["button"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {showOfferCard ? "MAP" : "JOB"}
          </Button>
        </Box>
      )}
      {isMobile ? (
        <Box>
          {showOfferCard && selectedOffer ? (
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
                ? "linear-gradient(180deg,  #000000 50%,  #FF0000 99%)"
                : "linear-gradient(180deg,  #121a26 3%,  #FF0000 99%)",
          }}
        >
          <LeftColumn
            className={`${styles["offers-list"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
            sx={{
              background: "linear-gradient(180deg,  #121a26 13%,  #a0bbfa 99%)",
            }}
          >
            <>{offerCardVariable}</>
          </LeftColumn>
          <RightColumn>{mapComponent}</RightColumn>
        </FlexContainer>
      )}
    </>
  );
};

export default OfferWithIdAndMapView;
