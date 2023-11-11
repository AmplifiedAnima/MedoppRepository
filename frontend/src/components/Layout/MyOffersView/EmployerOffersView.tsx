import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import { useEffect, useContext, useState } from "react";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import { Box, Typography } from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import DeleteOfferModal from "./MyOffersViewComponents/DeleteOfferModal";
import {
  getContainerStyles,
  getInnerBoxStyles,
} from "../../../styles/tablesStyles";
import { deleteOffer } from "./MyOffersViewComponents/EmployerOffersViewFunctionsHandlers";
import { motion } from "framer-motion";
import { TableHeaderOffersViewComponents } from "./MyOffersViewComponents/TableHeaderOffersViewComponents";
import { OfferFetchedForUserView } from "./OfferFetchedForUserView.interface";

const EmployersOffersView = () => {
  const { isLoggedIn, roles } = useContext(IsLoggedInContext);
  const { themeMode } = useContext(ThemeContext);
  const [userOffers, setUserOffers] = useState<OfferFetchedForUserView[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string>("");
  const isEmployer = isLoggedIn && roles.includes("Employer");

  const handleDeleteModalOpen = (offerId: string) => {
    setIsDeleteModalOpen(true);
    setSelectedOfferId(offerId);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleOfferDeletion = async (offerId: string) => {
    const deletionResult = await deleteOffer(offerId);
    if (deletionResult) {
      setDataLoaded(false);
      handleDeleteModalClose();
    }
  };

  useEffect(() => {
    const fetchEmployersOffers = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/offers/employer-offers`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserOffers(data);
          console.log(data);
          setDataLoaded(true);
        } else {
          console.log("Error fetching user offers: ", response.status);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    if (!dataLoaded) {
      fetchEmployersOffers();
    }
  }, [dataLoaded, isLoggedIn]);

  const containerStyles = getContainerStyles(themeMode);
  const innerBoxStyles = getInnerBoxStyles();

  return (
    <Box sx={containerStyles}>
      <HeaderForOtherRoutes routeView="My Offers" />
      <motion.div
        className="black"
        initial={{ opacity: 0 }}
        animate={{ transition: { duration: 2 }, opacity: 1 }}
      >
        <Box sx={innerBoxStyles}>
          {isLoggedIn && isEmployer ? (
            <>
              <TableHeaderOffersViewComponents
                userOffers={userOffers}
                handleDeleteModalOpen={handleDeleteModalOpen}
              />
              <DeleteOfferModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteModalClose}
                handleDelete={() => handleOfferDeletion(selectedOfferId)}
                offerId={selectedOfferId}
              />
            </>
          ) : (
            <Box sx={{ height: "1200px" }}>
              <Typography
                variant="h4"
                sx={{
                  color:
                    themeMode === "dark"
                      ? "#2feb00"
                      : "linear-gradient(180deg,  #121a26 13%,  #a0bbfa 99%)",
                }}
              >
                Please login to access this part of the website (you have to be
                logged in as employer)
              </Typography>
            </Box>
          )}
        </Box>
      </motion.div>
    </Box>
  );
};

export default EmployersOffersView;
