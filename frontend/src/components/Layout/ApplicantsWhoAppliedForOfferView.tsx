import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Popover,
  useMediaQuery,
  Link,
} from "@mui/material";
import { ThemeContext } from "../../styles/ThemeProviderContext";
import { IsLoggedInContext } from "../../utlis/IsLoggedInContext";
import HeaderForOtherRoutes from "../Header/HeaderForOtherRoutes";
import { InfoOutlined } from "@mui/icons-material";

interface JobApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  cvFilePath: string;
  offerId: string;
}

const ApplicantsWhoAppliedForOfferView: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isMobile = useMediaQuery("(max-width: 600px)");
  const { themeMode } = useContext(ThemeContext);

  const { isLoggedIn, roles } = useContext(IsLoggedInContext);
  const isEmployee = isLoggedIn && roles.includes("Employee");

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState("");

  const handlePopoverOpen = (coverLetter: string) => (event: any) => {
    setPopoverAnchorEl(event.currentTarget);
    setSelectedCoverLetter(coverLetter);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setSelectedCoverLetter("");
  };

  useEffect(() => {
    if (!isLoggedIn) setApplications([]);
    const fetchJobApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:3000/job-applications/${
            isEmployee ? "offers-applied-for" : "applications-for-user-offers"
          }`,
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
          setIsSubmitted(true);
          setApplications(data);
        } else {
          console.log("Error fetching job applications:", response.status);
        }
      } catch (error) {
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, [isLoggedIn]);

  return (
    <Box
      sx={{
        background:
          themeMode === "dark"
            ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)" // Dark mode gradient
            : "#FFFFFF",
        color: themeMode === "dark" ? "white" : "black",
        height: "737px",
      }}
    >
      <Paper elevation={3}>
        <HeaderForOtherRoutes
          routeView={
            isEmployee ? "Offers - Where I Applied" : "Offers - Who Applied"
          }
        />
        {!isLoggedIn ? (
          <Box
            sx={{
              background:
                themeMode === "dark"
                  ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)" // Dark mode gradient
                  : "#FFFFFF",
              color: themeMode === "dark" ? "white" : "black",
              height: "665px",
            }}
          >
            <Typography variant="h5">SIGN UP TO SEE THIS CONTENT</Typography>
          </Box>
        ) : (
          <Paper
            elevation={3}
            sx={{
              background:
                themeMode === "dark"
                  ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)" // Dark mode gradient
                  : "#FFFFFF",

              borderRadius: "0",
              maxHeight: isMobile ? "550px" : "630px",
              padding: "15px 5px",
              maxWidth: "auto",
              overflow: "auto",
            }}
          >
            <TableContainer>
              <Table>
                <TableHead
                  sx={{
                    color: "white",
                  }}
                >
                  <TableRow sx={{ color: "white" }}>
                    <TableCell
                      sx={{
                        width: isMobile ? "30%" : "5%",
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      First Name
                    </TableCell>
                    <TableCell
                      sx={{
                        width: isMobile ? "30%" : "10%",
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Last Name
                    </TableCell>
                    <TableCell
                      sx={{
                        width: isMobile ? "40%" : "5%",
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Email @
                    </TableCell>
                    <TableCell
                      sx={{
                        width: isMobile ? "40%" : "5%",
                        color: themeMode === "dark" ? "white" : "black",
                      }}
                    >
                      Phone number
                    </TableCell>
                    <TableCell
                      sx={{ color: themeMode === "dark" ? "white" : "black" }}
                    >
                      Cover letter
                    </TableCell>
                    <TableCell
                      sx={{ color: themeMode === "dark" ? "white" : "black" }}
                    >
                      CV
                    </TableCell>
                    <TableCell
                      sx={{ color: themeMode === "dark" ? "white" : "black" }}
                    >
                      Job offer
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell
                        sx={{ color: themeMode === "dark" ? "white" : "black" }}
                      >
                        {application.firstName}
                      </TableCell>
                      <TableCell
                        sx={{ color: themeMode === "dark" ? "white" : "black" }}
                      >
                        {application.lastName}
                      </TableCell>
                      <TableCell
                        sx={{ color: themeMode === "dark" ? "white" : "black" }}
                      >
                        {application.email}
                      </TableCell>
                      <TableCell
                        sx={{ color: themeMode === "dark" ? "white" : "black" }}
                      >
                        {application.phoneNumber}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={handlePopoverOpen(application.coverLetter)}
                          sx={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
                          <InfoOutlined />
                        </IconButton>
                        <Popover
                          open={Boolean(popoverAnchorEl)}
                          anchorEl={popoverAnchorEl}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <Box
                            sx={{
                              width: isMobile ? "100%" : "400px",
                              height: "400px",
                              color: themeMode === "dark" ? "white" : "black",
                              background:
                                themeMode === "dark"
                                  ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)" // Dark mode gradient
                                  : "#FFFFFF",
                              borderRadius: "0",
                            }}
                          >
                            <div
                              style={{
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                                padding: "20px",
                                color: themeMode === "dark" ? "white" : "black",
                                borderRadius: "0",
                              }}
                            >
                              <Typography
                                sx={{
                                  color:
                                    themeMode === "dark" ? "white" : "black",
                                }}
                              >
                                {selectedCoverLetter}
                              </Typography>
                            </div>
                          </Box>
                        </Popover>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
                          <Link
                            href={application.cvFilePath}
                            color="inherit"
                            underline="hover"
                          >
                            Download CV
                          </Link>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color: themeMode === "dark" ? "white" : "black",
                          }}
                        >
                          <Link
                            href={`/offers/${application.offerId}`}
                            color="inherit"
                            underline="hover"
                          >
                            Check offer
                          </Link>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default ApplicantsWhoAppliedForOfferView;
