import { Box, Button } from "@mui/material";
import React, { useReducer } from "react";
import { useAlertContext } from "./AlertHandlingContext";

interface AlertLayoutSpecialtyProps {
  message: string;
  onClose: () => void;
  type: string; // Specify the type of notification
}

export const CustomAlert: React.FC<AlertLayoutSpecialtyProps> = ({
  message,
  onClose,
  type,
}) => {
  const notificationStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    zIndex: 1000,
  };

  return (
    <Box sx={notificationStyle}>
      <div>
        {message}
        <Button onClick={onClose}>Close</Button>
      </div>
    </Box>
  );
};

export const initialStateNotifications = {
  specialty: null,
  location: null,
  typeOfEmployment: null,
  priceRange: null,
};

type NotificationAction =
  | { type: "SHOW_NOTIFICATION"; payload: string; notificationType: string }
  | { type: "HIDE_NOTIFICATION"; notificationType: string };

export const searchNotificationsReducer = (
  state: typeof initialStateNotifications,
  action: NotificationAction
) => {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return { ...state, [action.notificationType]: action.payload };
    case "HIDE_NOTIFICATION":
      return { ...state, [action.notificationType]: null };
    default:
      return state;
  }
};

const AlertManager: React.FC = () => {
  const [notifications, dispatchNotifications] = useReducer(
    searchNotificationsReducer,
    initialStateNotifications
  );

  // Use the dispatchNotifications function to show/hide notifications
  const showNotification = (message: string, type: string) => {
    dispatchNotifications({
      type: "SHOW_NOTIFICATION",
      payload: message,
      notificationType: type,
    });
  };

  const hideNotification = (type: string) => {
    dispatchNotifications({
      type: "HIDE_NOTIFICATION",
      notificationType: type,
    });
  };

  return (
    <>
      {notifications.specialty && (
        <CustomAlert
          message={notifications.specialty}
          onClose={() => hideNotification("specialty")}
          type="specialty"
        />
      )}
      {notifications.location && (
        <CustomAlert
          message={notifications.location}
          onClose={() => hideNotification("location")}
          type="location"
        />
      )}
      {notifications.typeOfEmployment && (
        <CustomAlert
          message={notifications.typeOfEmployment}
          onClose={() => hideNotification("typeOfEmployment")}
          type="typeOfEmployment"
        />
      )}
      {notifications.priceRange && (
        <CustomAlert
          message={notifications.priceRange}
          onClose={() => hideNotification("typeOfEmployment")}
          type="priceRange"
        />
      )}
    </>
  );
};

export default AlertManager;
