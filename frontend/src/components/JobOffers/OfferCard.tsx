import React, { useContext } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { OfferInterface } from "./Offer.Interface";
import ApplyingForAJobView from "./ApplyingForAJobView/ApplyingForAJobView";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { getButtonStyles } from "../../styles/buttonStyling";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BusinessIcon from "@mui/icons-material/Business";
import { ArrowBack, Description } from "@mui/icons-material";
import { getOfferIconUrl } from "../../utlis/GoogleMapsApi/MapComponentUtils";
import { FilterContext } from "../../utlis/FilterContext";
import {
  getCardStylingOffersList,
  gridStylingOffersList,
  getCommonTextStyling,
  iconStyling,
} from "../../styles/offersListStyle";

interface OfferCardProps {
  offer: OfferInterface;
  onCloseOffer: () => void;
  isSelected: boolean;
  offerId: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onCloseOffer,
  isSelected,
  offerId,
}) => {
  const { state: filterState } = useContext(FilterContext);
  const { themeMode } = useContext(ThemeContext);

  const sanitizedDescription = DOMPurify.sanitize(offer.description);
  const offerCardStyling = getCardStylingOffersList(themeMode, isSelected);
  const commonTextStyling = getCommonTextStyling(isSelected);
  const buttonStyles = getButtonStyles(themeMode);
  const iconUrl = getOfferIconUrl(
    offer.label,
    themeMode,
    isSelected,
    filterState
  );

  const handleClose = () => {
    onCloseOffer();
  };

  return (
    <>
      {isSelected && (
        <Box
          sx={{ display: "flex", justifyContent: "start", padding: "0px 20px" }}
        >
          <Button
            variant="contained"
            color="error"
            sx={{
              ...buttonStyles,
              "&:hover": {
                color: "white",
              },
            }}
            onClick={handleClose}
          >
            <ArrowBack
              sx={{
                fontSize: "20px",
                "@media (max-width: 768px)": {
                  fontSize: "14px",
                },
              }}
            />
          </Button>
        </Box>
      )}
      <Card sx={offerCardStyling}>
        <CardContent>
          <Link
            key={offer.id}
            to={!isSelected ? `/offers/${offer.id}` : "#"}
            style={{
              textDecoration: "none",
              cursor: isSelected ? "auto" : "pointer",
            }}
          >
            <Box sx={gridStylingOffersList}>
              <Typography sx={commonTextStyling}>{offer.title}</Typography>

              <Typography variant="subtitle1" sx={commonTextStyling}>
                <img
                  src={iconUrl}
                  alt=""
                  width="17px"
                  height="17px"
                  style={{
                    position: "relative",
                    top: "1.4px",
                    marginRight: "3px",
                  }}
                />{" "}
                {!isSelected ? offer.label : offer.specialties}
              </Typography>
              <Typography variant="subtitle1" sx={commonTextStyling}>
                <BusinessIcon sx={iconStyling} /> {offer.company}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  ...commonTextStyling,
                  color: themeMode === "dark" ? " #7fee01" : "#21d3ff",
                }}
              >
                {offer.salary} PLN
              </Typography>

              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  ...commonTextStyling,
                  color: themeMode === "dark" ? "#7fee01" : "#21d3ff",
                }}
              >
                <LocationOnIcon sx={iconStyling} /> {offer.location}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  ...commonTextStyling,
                  color: themeMode === "dark" ? "#7fee01" : "#21d3ff",
                }}
              >
                <Description sx={iconStyling} style={{ marginRight: "6px" }} />
                {offer.typeOfEmployment.toUpperCase()}
              </Typography>
            </Box>
          </Link>
          <Box sx={{ fontSize: "16px", color: "white" }}>
            {isSelected && (
              <>
                <Box
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                  sx={{
                    wordBreak: "break-word",
                    placeItems: "center",
                    margin: "50px 40px",
                    width: "inherit",
                  }}
                />
                <ApplyingForAJobView offerId={offerId} />
              </>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default OfferCard;
