import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import { useEffect, useContext, useState } from "react";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import DeleteOfferModal from "./DeleteOfferModal";
import {
  getContainerStyles,
  getInnerBoxStyles,
  getTableStyles,
  getCellStyles,
  getHeaderStyles,
} from "../../../styles/tablesStyles";
import { deleteOffer } from "./EmployerOffersViewFunctionsHandlers";
import { motion } from "framer-motion";
interface OfferFetchedForUserView {
  id: string;
  label: string;
  title: string;
  company: string;
  location: string;
  typeOfEmployment: string;
  description: string;
  specialties: string;
}

const EmployersOffersView = () => {
  const isMobile = window.innerWidth < 768;
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
  const tableStyles = getTableStyles();
  const cellStyles = getCellStyles(themeMode);
  const headerStyles = getHeaderStyles(themeMode);
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
              <Table sx={tableStyles}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={headerStyles}>
                      <Typography variant="h5">Job title</Typography>
                    </TableCell>
                    <TableCell sx={headerStyles}>
                      <Typography variant="h5">Profession</Typography>
                    </TableCell>
                    <TableCell sx={headerStyles}>
                      <Typography variant="h5">Specialty</Typography>
                    </TableCell>
                    <TableCell sx={headerStyles}>
                      <Typography variant="h5">Location</Typography>
                    </TableCell>
                    <TableCell sx={headerStyles}> </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {userOffers.map((offer) => (
                    <TableRow
                      key={offer.id}
                      sx={{ margin: isMobile ? "45px 0px" : "20px 0px" }}
                    >
                      <TableCell sx={cellStyles}>
                        {isMobile && (
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
                            }}
                          >
                            Title
                          </Typography>
                        )}
                        {offer.title}
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        {isMobile && (
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
                            }}
                          >
                            Profession
                          </Typography>
                        )}
                        {offer.label}
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        {isMobile && (
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
                            }}
                          >
                            Specialty:
                          </Typography>
                        )}
                        {offer.specialties}
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        {isMobile && (
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
                            }}
                          >
                            Location:
                          </Typography>
                        )}
                        {offer.location}
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        {/* <Button
                            sx={{
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
                            }}
                          >
                            Offer Edition
                          </Button> */}

                        <Button
                          onClick={() => handleDeleteModalOpen(offer.id)}
                          sx={{
                            color: themeMode === "dark" ? "#2feb00" : "#679af8",
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <Box
                        sx={{
                          padding: "20px 0px",
                        }}
                      />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
