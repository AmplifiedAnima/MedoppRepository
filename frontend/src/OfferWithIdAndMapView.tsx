import React, { useContext, useEffect } from "react";
import { ThemeContext } from "./styles/ThemeProviderContext";
import { Box, Button } from "@mui/material";
import HeaderForOtherRoutes from "./components/Header/HeaderForOtherRoutes";
import { OfferInterface } from "./components/JobOffers/Offer.Interface";
import { getButtonStyles } from "./styles/buttonStyling";
import OfferCard from "./components/JobOffers/OfferCard";
import { FlexContainer, LeftColumn, RightColumn } from "./OffersViewWithMap";
import { useFilterContext } from "./utlis/FilterContext";
import { useParams } from "react-router-dom";
import { getOffersListStyles } from "./styles/offersListStyle";
import { useAlertContext } from "./utlis/AlertHandlingContext";
import { motion } from "framer-motion";
import { universalHeight } from "./utlis/GoogleMapsApi/MapComponent";

interface OfferWithIdAndMapViewProps {
  mapComponent: React.ReactNode;
  handleCloseOffer: () => void;
  isMobile: boolean;
  showOfferCard: boolean;
  selectedOffer: OfferInterface | null;
  handleToggleOfferCard: () => void;
}

const OfferWithIdAndMapView: React.FC<OfferWithIdAndMapViewProps> = ({
  mapComponent,
  handleCloseOffer,
  isMobile,
  showOfferCard,
  handleToggleOfferCard,
  selectedOffer,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const { dispatch } = useFilterContext();
  const { dispatch: alertDispatch } = useAlertContext();
  const buttonStyles = getButtonStyles(themeMode);
  const offersListStyle = getOffersListStyles(themeMode);
  const { id } = useParams<{ id: string }>();

  const offerCardVariable = selectedOffer ? (
    <OfferCard
      offer={selectedOffer}
      onCloseOffer={handleCloseOffer}
      isSelected={true}
      offerId={selectedOffer.id}
    />
  ) : null;

  useEffect(() => {
    alertDispatch({ type: "CLEAR_ALL_NOTIFICATIONS" });
  }, []);

  useEffect(() => {
    if (id) {
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
  useEffect(() => {}, []);
  return (
    <>
      {selectedOffer && (
        <HeaderForOtherRoutes
          routeView={`
            ${selectedOffer.label}
            in ${selectedOffer.location}`}
        />
      )}

      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            bottom: "0%",
            right: "40%",
            transform: "translateX(-0%)",
            zIndex: "1",
          }}
        >
          <Button
            onClick={handleToggleOfferCard}
            variant="contained"
            sx={buttonStyles}
          >
            {showOfferCard ? "MAP" : "JOB"}
          </Button>
        </Box>
      )}

      {isMobile ? (
        <Box>
          {showOfferCard && selectedOffer ? (
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
                ? "linear-gradient(180deg,  #000000 50%,  #FF0000 99%)"
                : "linear-gradient(180deg, #001b45 10%,#FFFFFF 99%)",
          }}
        >
          <LeftColumn sx={{ ...offersListStyle, height: universalHeight }}>
            <motion.div
              className="black"
              initial={{ opacity: 0 }}
              animate={{
                transition: { duration: 1 },
                opacity: 1,
              }}
            >
              <>{offerCardVariable}</>
            </motion.div>
          </LeftColumn>

          <RightColumn>{mapComponent}</RightColumn>
        </FlexContainer>
      )}
    </>
  );
};

export default OfferWithIdAndMapView;
