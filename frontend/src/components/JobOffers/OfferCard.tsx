import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { Offer } from "./OfferInterface";
import ApplyingForAJobView from "./ApplyingForAJobView/ApplyingForAJobView";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import { getButtonStyles } from "../../styles/buttonStyling";

interface OfferCardProps {
  offer: Offer;

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
  const {
    title,
    company,
    location,
    salary,
    typeOfEmployment,
    specialties,
  } = offer;

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const { themeMode } = useContext(ThemeContext);
  const buttonStyles = getButtonStyles(themeMode);

  const { isLoggedIn, roles } = useContext(IsLoggedInContext);
  const isEmployee = isLoggedIn && roles.includes("Employee");
  const { dispatch: alertDispatch } = useAlertContext();

  const sanitizedDescription = DOMPurify.sanitize(offer.description);

  const handleApply = () => {
    setIsApplicationModalOpen(true);
  };

  const handleClick = () => {

    console.log(offer.id)
  };

  const handleClose = () => {
    onCloseOffer();
  };
 
  const handleCloseApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  useEffect(() => {
    alertDispatch({ type: "CLEAR_ALERTS" });
  }, [isApplicationModalOpen]);

  return (
    <Card
      sx={{
        margin: "10px 20px",
        borderRadius: "8px",
        backgroundColor:
          themeMode === "dark"
            ? "rgba(0,0,0, 1)"
            : "rgba(209, 233, 246, 0.1)",
        display: "grid",
        width: "auto",
        position: "relative",
        fontFamily: "Helvetica",
      }}
    >
      <CardContent>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              alignSelf: "center",
              fontSize: "18px",
              color: "#ffffff",
              paddingLeft: "0px",
              "@media (max-width: 768px)": {
                fontSize: "15px"
              },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#ffffff",
              fontSize: "16px",
              "@media (max-width: 768px)": {
                fontSize: "13px",
              },
            }}
          >
            {specialties}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#ffffff",
              fontSize: "16px",
              "@media (max-width: 768px)": {
                fontSize: "13px",
              },
            }}
          >
            {company}
          </Typography>
        </Box>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{
              color: themeMode === "dark" ? " #7fee01" : "#21d3ff",
              borderRadius: "8px",
              padding: "10px 2px",
              fontSize: "17px",
              fontWeight: "bold",
              "@media (max-width: 768px)": {
                fontSize: "14px",
              },
            }}
          >
            {salary} PLN/MONTH
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              display: "inline",
              color: themeMode === "dark" ? "white" : "#21d3ff",
              borderRadius: "8px",
              padding: "8px 2px",
              fontSize: "16px",
              "@media (max-width: 768px)": {
                fontSize: "13px",
              },
            }}
          >
            {location}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              color: themeMode === "dark" ? "#7fee01" : "#21d3ff",
              marginTop: "12px",
              fontSize: "16px",
              "@media (max-width: 768px)": {
                fontSize: "13px",
              },
            }}
          >
            {typeOfEmployment.toUpperCase()}
          </Typography>
        </Box>
        <Box sx={{ fontSize: "16px", color: "white" }}>
          {isSelected && (
            <Box
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
              sx={{ wordBreak: "break-word" }}
            />
          )}
        </Box>
        <Link key={offer.id} to={`/offers/${offer.id}`}>
          {!isSelected && (
            <Button
              variant="contained"
              color="success"
              sx={buttonStyles}
              onClick={handleClick}
            >
              VIEW JOB OFFER
            </Button>
          )}
        </Link>
        {isSelected && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0px",
            }}
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
              CLOSE
            </Button>

            {isEmployee && (
              <Button
                variant="contained"
                sx={buttonStyles}
                onClick={handleApply}
              >
                APPLY HERE
              </Button>
            )}
          </Box>
        )}
      </CardContent>
      <ApplyingForAJobView
        isOpen={isApplicationModalOpen}
        onClose={handleCloseApplicationModal}
        offerId={offerId}
      />
    </Card>
  );
};

export default OfferCard;
