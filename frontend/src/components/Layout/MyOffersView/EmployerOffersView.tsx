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
  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { themeMode } = useContext(ThemeContext);
  const [userOffers, setUserOffers] = useState<OfferFetchedForUserView[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string>("");

  const handleDeleteModalOpen = (offerId: string) => {
    setIsDeleteModalOpen(true);
    setSelectedOfferId(offerId);
  };
  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const colorWhite = { color: themeMode === "dark" ? "white" : "black" };

  const handleOfferDeletion = async (offerId: string) => {
    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch(`http://localhost:3000/offers/${offerId}`, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        console.log("offers has been deleted");
        setDataLoaded(false);
        handleDeleteModalClose();
      } else {
        console.log("Error deleting offer: ", response.status);
      }
    } catch (error) {
      console.error("Error: ", error);
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

          // Set dataLoaded to true to indicate that data has been loaded
          setDataLoaded(true);
        } else {
          console.log("Error fetching user offers: ", response.status);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    // Only fetch data if it hasn't been loaded initially
    if (!dataLoaded) {
      fetchEmployersOffers();
    }
  }, [dataLoaded]);

  // to be finished
  // const handleOfferEdition = async (offerId: string) => {
  //   try {
  //     const token = localStorage.getItem("token");

  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await fetch(`http://localhost:3000/offers/${offerId}`, {
  //       method: "PATCH",
  //       headers: headers,
  //     });

  //     if (response.ok) {
  //       console.log("Offer has been edited");
  //     } else {
  //       console.log("Error editing offer: ", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // };
  return (
    <Box
      sx={{
        background:
          themeMode === "dark"
            ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)" // Dark mode gradient
            : "#FFFFFF",
        color: themeMode === "dark" ? "white" : "black",
      }}
    >
      <HeaderForOtherRoutes routeView="My Offers" />
      <Box sx={{ height: isMobile ? "700px" : "560px" }}>
        {isLoggedIn ? (
          <>
            <Paper
              elevation={3}
              sx={{
                background:
                  themeMode === "dark"
                    ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)"
                    : "#FFFFFF",

                borderRadius: "0",

                maxHeight: isMobile ? "100%" : "630px",
                padding: "15px 5px",
                maxWidth: "auto",
                overflow: "auto",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={colorWhite}>Title</TableCell>
                    <TableCell sx={colorWhite}>Label</TableCell>
                    <TableCell sx={colorWhite}>Specialties</TableCell>
                    <TableCell sx={colorWhite}>Location</TableCell>
                    <TableCell sx={colorWhite}> Edit Offer </TableCell>
                    <TableCell sx={colorWhite}> Delete Offer</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {userOffers.map((offer) => (
                    <TableRow key={offer.id}>
                      <TableCell sx={colorWhite}>{offer.title}</TableCell>
                      <TableCell sx={colorWhite}>{offer.label}</TableCell>
                      <TableCell sx={colorWhite}>{offer.specialties}</TableCell>
                      <TableCell sx={colorWhite}>{offer.location}</TableCell>
                      <TableCell sx={colorWhite}>
                        <Button>Edit Offer</Button>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleDeleteModalOpen(offer.id)}>
                          Click to delete {offer.id}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
            <DeleteOfferModal
              isOpen={isDeleteModalOpen}
              onClose={handleDeleteModalClose}
              handleDelete={() => handleOfferDeletion(selectedOfferId)}
              offerId={selectedOfferId}
            />
          </>
        ) : (
          <Box sx={{ height: "634px" }}>
            <Typography
              variant="h4"
              sx={{
                color: themeMode === "dark" ? "#2feb00" : "black",
              }}
            >
              Please login to access this part of website{" "}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default EmployersOffersView;
