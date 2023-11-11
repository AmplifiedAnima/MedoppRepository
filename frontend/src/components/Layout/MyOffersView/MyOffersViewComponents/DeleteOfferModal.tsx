import React, { useContext, useState, useEffect, useReducer } from "react";
import {
  Link,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { IsLoggedInContext } from "../../../../utlis/IsLoggedInContext";
import { ThemeContext } from "../../../../styles/ThemeProviderContext";
import { getButtonStyling } from "../../../../styles/formStyling";
import { useNavigate } from "react-router-dom";

interface DeleteOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: (offerId: string) => Promise<void>;
  offerId: string; // Add this line
}

const DeleteOfferModal: React.FC<DeleteOfferModalProps> = ({
  isOpen,
  onClose,
  handleDelete,
  offerId,
}) => {
  const { isLoggedIn, roles } = useContext(IsLoggedInContext);

  const { themeMode } = useContext(ThemeContext);

  const [hideButton, setHideButton] = useState(false);

  const buttonStyling = getButtonStyling(themeMode);

  const isEmployer = isLoggedIn && roles.includes("Employer");
  const navigate = useNavigate();

  const cancelButtonStyling = {
    ...buttonStyling,
    width: "auto",
    "&:hover": {
      backgroundColor: "red",
      color: "white",
    },
  };

  const modalStyling = {
    backgroundColor: themeMode === "dark" ? "black" : "white",
    color: themeMode === "dark" ? "#2feb00" : "black",
  };

  const dialogContentStyling = {
    ...modalStyling,
  };

  useEffect(() => {
    setTimeout(() => {
      setHideButton(false);
    }, 1500);
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} maxWidth="xl">
        <DialogTitle
          sx={{
            backgroundColor: themeMode === "dark" ? "black" : "white",
            color: themeMode === "dark" ? "#2feb00" : "black",
          }}
        >
          {isLoggedIn && isEmployer && !hideButton ? (
            <Typography variant="h5">Delete The Offer</Typography>
          ) : (
            <Typography variant="h5" sx={{ alignContent: "center" }}>
              {" "}
              Applied!{" "}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent sx={dialogContentStyling}>
          <Typography variant="body1">
            Are you sure you want to delete this offer ?
          </Typography>
        </DialogContent>
        <DialogActions sx={modalStyling}>
          {!hideButton && (
            <>
              <Button onClick={onClose} sx={cancelButtonStyling}>
                Cancel
              </Button>
              <Box sx={{ padding: "0px 80px" }} />
              <Button
                variant="contained"
                onClick={() => handleDelete(offerId)}
                sx={{ ...buttonStyling, width: "auto" }}
              >
                Delete
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteOfferModal;
