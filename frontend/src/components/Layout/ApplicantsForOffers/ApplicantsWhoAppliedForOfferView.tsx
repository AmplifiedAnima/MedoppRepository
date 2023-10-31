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
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import { InfoOutlined } from "@mui/icons-material";
import {
  getContainerStyles,
  getInnerBoxStyles,
  getTableStyles,
  getCellStyles,
  getHeaderStyles,
} from "../../../styles/tablesStyles";
import ApplicantsTablePopover from "./ApplicantsTablePopover";
import { motion } from "framer-motion";

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
  const [dataIsBeingFetched, setDataIsBeingFetched] = useState(false);
  const isMobile = window.innerWidth < 768;
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

  const containerStyles = getContainerStyles(themeMode);
  const innerBoxStyles = getInnerBoxStyles(isMobile);
  const tableStyles = getTableStyles();
  const cellStyles = getCellStyles(themeMode);
  const headerStyles = getHeaderStyles(themeMode);

  useEffect(() => {
    if (!isLoggedIn) setApplications([]);
    setDataIsBeingFetched(true)
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
          setApplications(data);
          setDataIsBeingFetched(false)
        } else {
          setDataIsBeingFetched(false)
          console.log("Error fetching job applications:", response.status);
        }
      } catch (error) {
        setDataIsBeingFetched(false)
        console.error("Error fetching job applications:", error);
      }
    };

    fetchJobApplications();
  }, [isLoggedIn]);

  return (
    <Box sx={{ ...containerStyles, height: "auto" }}>
      <HeaderForOtherRoutes
        routeView={
          isEmployee ? "Offers - Where I Applied" : "Offers - Who Applied"
        }
      />
      {!isLoggedIn ? (
        <Box sx={{height: "100vh"  }}>
          <Typography variant="h5">SIGN UP TO SEE THIS CONTENT</Typography>
        </Box>
      ) : (
        <Box sx={innerBoxStyles}>
          <motion.div
            className="black"
            initial={{ opacity: 0 }}
            animate={{ transition: { duration: 2 }, opacity: 1 }}
          >
            <Table sx={tableStyles}>
              <TableHead>
                <TableRow>
                  <TableCell sx={headerStyles}>
                    {" "}
                    <Typography variant="h5">First Name </Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5">Last Name </Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5">E-mail </Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5">Phone Number</Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5">Cover letter</Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5"></Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5"></Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
           
                <TableBody sx={{ padding: "20px 10px" }}>
                  {applications.map((application) => (
                    <>
                      <TableRow key={application.id}>
                        <TableCell sx={cellStyles}>
                          {isMobile && (
                            <>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    themeMode === "dark"
                                      ? "#2feb00"
                                      : "#679af8",
                                }}
                              >
                                First Name
                              </Typography>
                            </>
                          )}
                          <Typography> {application.firstName}</Typography>
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
                              First Name
                            </Typography>
                          )}
                          <Typography> {application.lastName}</Typography>
                        </TableCell>
                        <TableCell sx={cellStyles}>
                          {isMobile && (
                            <>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    themeMode === "dark"
                                      ? "#2feb00"
                                      : "#679af8",
                                }}
                              >
                                First Name
                              </Typography>
                            </>
                          )}
                          <Typography> {application.email}</Typography>
                        </TableCell>
                        <TableCell sx={cellStyles}>
                          {isMobile && (
                            <>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    themeMode === "dark"
                                      ? "#2feb00"
                                      : "#679af8",
                                }}
                              >
                                First Name
                              </Typography>
                            </>
                          )}
                          <Typography> {application.phoneNumber}</Typography>
                        </TableCell>
                        <TableCell>
                          {isMobile && (
                            <>
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    themeMode === "dark"
                                      ? "#2feb00"
                                      : "#679af8",
                                }}
                              >
                                Cover letter{" "}
                              </Typography>
                            </>
                          )}
                          <IconButton
                            onClick={handlePopoverOpen(application.coverLetter)}
                            sx={{
                              color: themeMode === "dark" ? "white" : "black",
                            }}
                          >
                            <InfoOutlined />
                          </IconButton>
                          <ApplicantsTablePopover
                            content={selectedCoverLetter}
                            themeMode={themeMode}
                            anchorEl={popoverAnchorEl}
                            onClose={handlePopoverClose}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
                            }}
                          >
                            <Link
                              href={application.cvFilePath}
                              color="inherit"
                              underline="hover"
                            >
                              CV
                            </Link>
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ ...cellStyles, justifyContentz: "center" }}
                        >
                          <Typography
                            sx={{
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
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
                      <Box sx={{ padding: isMobile ? "20px 0px" : "" }} />
                    </>
                  ))}
                </TableBody>
            </Table>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default ApplicantsWhoAppliedForOfferView;
