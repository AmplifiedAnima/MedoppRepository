import React, { useContext } from "react";
import { Box, Alert, Typography } from "@mui/material";
import { useAlertContext } from "./AlertHandlingContext";
import { ThemeContext } from "../styles/ThemeProviderContext";
import { Close } from "@mui/icons-material";
import { FilterContext } from "./FilterContext";

interface AlertLayoutSpecialtyProps {
  onSpecialtyClose?: () => void;
  onLocationClose?: () => void;
  onEmploymentTypeClose?: () => void;
  onPriceRangeClose?: () => void;
}

const AlertLayout: React.FC<AlertLayoutSpecialtyProps> = ({
  onSpecialtyClose,
  onLocationClose,
  onEmploymentTypeClose,
  onPriceRangeClose,
}) => {
  const { themeMode } = useContext(ThemeContext);

  const notificationStyle = {
    position: "absolute",
    top: "62px",
    right: "0px",
    backgroundColor: themeMode === "dark" ? "black" : "#001b45",
    borderRadius: "4px",
    color: "white",
    zIndex: 1000,
  };

  const textInsideNotifications = {
    color: themeMode === "dark" ? "#2feb00" : "#FFFFFF",
    fontWeight: "bold",
    padding: "5px 20px",
    fontSize: "15px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
  };

  const { messages, dispatch } = useAlertContext();

  const closingTheAlert = () => {
    dispatch({ type: "CLEAR_ALERTS" });
  };

  const closeNotificationOfSpecialty = () => {
    dispatch({ type: "HIDE_SPECIALTY" });

    if (onSpecialtyClose) {
      onSpecialtyClose();
    }
  };

  const closeNotificationOfLocation = () => {
    dispatch({ type: "HIDE_LOCATION" });

    if (onLocationClose) {
      onLocationClose();
    }
  };

  const closeNotificationOfTypeOfEmployment = () => {
    dispatch({ type: "HIDE_TYPEOFEMPLOYMENT" });

    if (onEmploymentTypeClose) {
      onEmploymentTypeClose();
    }
  };

  const closeNotificationOfPriceRange = () => {
    dispatch({ type: "HIDE_PRICERANGE" });

    if (onPriceRangeClose) {
      onPriceRangeClose();
    }
  };
  return (
    <>
      <Box sx={notificationStyle}>
        {messages.specialty && (
          <Box sx={textInsideNotifications}>
            {messages.specialty}
            <Close
              onClick={closeNotificationOfSpecialty}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        )}
        {messages.location && (
          <Box sx={textInsideNotifications}>
            {messages.location}
            <Close
              onClick={closeNotificationOfLocation}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        )}
        {messages.typeOfEmployment && (
          <Box sx={textInsideNotifications}>
            {messages.typeOfEmployment}
            <Close
              onClick={closeNotificationOfTypeOfEmployment}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        )}
        {messages.priceRange && (
          <Box sx={textInsideNotifications}>
            {messages.priceRange}
            <Close
              onClick={closeNotificationOfPriceRange}
              sx={{ cursor: "pointer" }}
            />
          </Box>
        )}
      </Box>
      <Box
        position="fixed"
        bottom="20px"
        right="20px"
        zIndex={1000}
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        {messages.info && (
          <Alert severity="info" onClose={closingTheAlert}>
            {messages.info}
          </Alert>
        )}
        {messages.error && (
          <Alert severity="error" onClose={closingTheAlert}>
            {messages.error}
          </Alert>
        )}
        {messages.success && (
          <Alert severity="success" onClose={closingTheAlert}>
            {messages.success}
          </Alert>
        )}
        {messages.warning && (
          <Alert severity="warning" onClose={closingTheAlert}>
            {messages.warning}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default AlertLayout;
