import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import styles from "./OffersCard.module.css";
import { ThemeContext } from "../../styles/ThemeProvider";
import { Offer } from "./OfferInterface";
import ApplyingForAJobView from "./ApplyingForAJobView/ApplyingForAJobView"; 
import DOMPurify from "dompurify";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import { useAlertContext } from "../../utlis/AlertHandlingContext";

interface OfferCardProps {
  offer: Offer;
  onOfferClick: (offer: Offer) => void;
  onCloseOffer: () => void;
  onMapReset: () => void;
  isSelected: boolean;
  offerId: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onOfferClick,
  onCloseOffer,
  onMapReset,
  isSelected,
  offerId,
}) => {
  const {
    title,
    company,
    location,
    salary,
    description,
    typeOfEmployment,
    specialties,
  } = offer;
  
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const { themeMode } = useContext(ThemeContext);

  const { isLoggedIn,roles } = useContext(IsLoggedInContext);
  const isEmployee = isLoggedIn && roles.includes("Employee");
  const { dispatch: alertDispatch } = useAlertContext();

  const sanitizedDescription = DOMPurify.sanitize(offer.description);
  const truncatedDescription =
    description.length > 20
      ? description.substring(0, 100) + " (READ MORE)"
      : description;

  const sanitizedTruncatedDescription =
    DOMPurify.sanitize(truncatedDescription);

  const handleApply = () => {
    setIsApplicationModalOpen(true);
  };

  const handleClick = () => {
    onOfferClick(offer);
    // console.log(offerId);
  };

  const handleClose = () => {
    onCloseOffer();
  };

  const handleApplicationModal = () => {
    setIsApplicationModalOpen(false);
  };

  useEffect(() => {
    alertDispatch({ type: "CLEAR_ALERTS" });
  }, [isApplicationModalOpen, alertDispatch]);

  return (
    <Card
      sx={{
        margin: "25px",
        backgroundColor: "#D1E9F6",
        borderRadius: "8px",
      }}
      className={`${styles["offer-card"]} ${
        themeMode === "dark" ? styles["dark-mode"] : ""
      }`}
    >
      <CardContent>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            color="#335075"
            className={`${styles["title"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className={`${styles["subTitle"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {specialties}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className={`${styles["subTitle"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {company}
          </Typography>
        </Box>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            color="#335075"
            className={`${styles["salary"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {salary} PLN/MONTH
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className={`${styles["subTitle"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {location}
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            className={`${styles["typeOfContract"]} ${
              themeMode === "dark" ? styles["dark-mode"] : ""
            }`}
          >
            {typeOfEmployment.toUpperCase()}
          </Typography>
        </Box>
        <Box
          className={`${styles["bodyOfDescription"]} ${
            themeMode === "dark" ? styles["dark-mode"] : ""
          }`}
        >
          {isSelected ? (
            <Box dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          ) : (
            <Box
              dangerouslySetInnerHTML={{
                __html: sanitizedTruncatedDescription,
              }}
            />
          )}
        </Box>
        <Link
          key={offer.id}
          to={`/offers/${offer.id}`}
          className={styles["offer-link"]}
        >
          {!isSelected && (
            <Button
              variant="contained"
              color="success"
              sx={{ marginTop: "10px" }}
              className={`${styles["offer-button"]} ${
                themeMode === "dark" ? styles["dark-mode"] : ""
              }`}
              onClick={handleClick}
            >
              VIEW JOB OFFER
            </Button>
          )}
        </Link>
        {isSelected && (
          <Box className={styles["button-container"]}>
            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: "10px" }}
              className={`${styles["offer-button"]} ${
                themeMode === "dark" ? styles["dark-mode"] : ""
              }`}
              onClick={handleClose}
            >
              CLOSE
            </Button>
            {isEmployee && (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px" }}
                className={`${styles["offer-apply"]} ${
                  themeMode === "dark" ? styles["dark-mode"] : ""
                }`}
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
        onClose={handleApplicationModal}
        offerId={offerId}
      />
    </Card>
  );
};

export default OfferCard;
