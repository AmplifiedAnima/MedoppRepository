import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Link,
  Button,
} from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";
import { Description } from "@mui/icons-material";
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
import { Offer } from "../../JobOffers/OfferInterface";
import { getButtonStyles } from "../../../styles/buttonStyling";

export interface JobApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  coverLetter: string;
  cvFilePath: string;
  offerId: string;
  offer?: Offer;
}

const ApplicantsWhoAppliedForOfferView: React.FC = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [dataIsBeingFetched, setDataIsBeingFetched] = useState(false);
  const isMobile = window.innerWidth < 768;
  const { themeMode } = useContext(ThemeContext);

  const { isLoggedIn, roles } = useContext(IsLoggedInContext);
  const isEmployee = isLoggedIn && roles.includes("Employee");

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [contentOfPopover, setcontentOfPopover] = useState<string | Offer>("");
  const [LinkToPopover, setLinkToPopover] = useState("");

  const handlePopoverOpen = (content: string | Offer) => (event: any) => {
    setPopoverAnchorEl(event.currentTarget);
    setcontentOfPopover(content);
  };

  const handleLinkSpilling = (string: string) => (event: any) => {
    setLinkToPopover(string);
  };
  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const containerStyles = getContainerStyles(themeMode);
  const innerBoxStyles = getInnerBoxStyles();
  const tableStyles = getTableStyles();
  const cellStyles = getCellStyles(themeMode);
  const headerStyles = getHeaderStyles(themeMode);

  const additionalIsMobileStyling = {
    color: themeMode === "dark" ? "#2feb00" : "#679af8",
    display: "none",
    "@media (max-width: 768px)": {
      paddingBottom: "10px",
      display: "block",
      fontSize: "17px",
    },
  };

  const buttonStyling = getButtonStyles(themeMode);

  useEffect(() => {
    if (!isLoggedIn) setApplications([]);
    setDataIsBeingFetched(true);
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
          setDataIsBeingFetched(false);
        } else {
          setDataIsBeingFetched(false);
          console.log("Error fetching job applications:", response.status);
        }
      } catch (error) {
        setDataIsBeingFetched(false);
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
        <Box sx={{ height: "100vh" }}>
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
                    <Typography variant="h5"> Email Adress </Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5">Telephone</Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5">Cover Letter</Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5">Curriculum Vitae </Typography>
                  </TableCell>
                  <TableCell sx={headerStyles}>
                    <Typography variant="h5"> Offer </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ padding: "10px 10px" }}>
                {applications.map((application) => (
                  <>
                    <TableRow key={application.id}>
                      <TableCell sx={cellStyles}>
                        <>
                          <Typography
                            variant="body2"
                            sx={additionalIsMobileStyling}
                          >
                            First Name
                          </Typography>
                        </>

                        <Typography> {application.firstName}</Typography>
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        <Typography
                          variant="body2"
                          sx={additionalIsMobileStyling}
                        >
                          First Name
                        </Typography>

                        <Typography> {application.lastName}</Typography>
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        <>
                          <Typography
                            variant="body2"
                            sx={additionalIsMobileStyling}
                          >
                            First Name
                          </Typography>
                        </>

                        <Typography> {application.email}</Typography>
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        <>
                          <Typography
                            variant="body1"
                            sx={additionalIsMobileStyling}
                          >
                            First Name
                          </Typography>
                        </>

                        <Typography> {application.phoneNumber}</Typography>
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        <>
                          <Typography
                            variant="body2"
                            sx={additionalIsMobileStyling}
                          >
                            {" "}
                            Cover Letter
                          </Typography>
                          <Button
                            onClick={handlePopoverOpen(application.coverLetter)}
                            sx={{
                              ...buttonStyling,
                              width: "20px",
                              "@media (max-width: 768px)": {
                                width: "100%",
                              },
                              color:
                                themeMode === "dark" ? "#2feb00" : "#679af8",
                            }}
                          >
                            <InfoOutlined />
                          </Button>
                        </>

                        <ApplicantsTablePopover
                          content={contentOfPopover}
                          themeMode={themeMode}
                          anchorEl={popoverAnchorEl}
                          onClose={handlePopoverClose}
                        />
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        <Typography
                          variant="body2"
                          sx={additionalIsMobileStyling}
                        >
                          CV
                        </Typography>
                        <Link
                          href={application.cvFilePath}
                          color="inherit"
                          underline="hover"
                        >
                          <Button
                            sx={{
                              ...buttonStyling,
                              width: "20px",
                              "@media (max-width: 768px)": {
                                width: "100%",
                              },
                              padding: "7px 20px",
                            }}
                          >
                            <Description />
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell sx={cellStyles}>
                        <Typography
                          variant="body2"
                          sx={additionalIsMobileStyling}
                        >
                          Offer
                        </Typography>
                        <Button
                          onClick={handlePopoverOpen(application.offer!)}
                          onMouseEnter={handleLinkSpilling(
                            `/offers/${application.offerId}`
                          )}
                          sx={{
                            ...buttonStyling,
                            width: "20px",
                            "@media (max-width: 768px)": {
                              width: "100%",
                            },
                            color: themeMode === "dark" ? "#2feb00" : "#679af8",
                          }}
                        >
                          <InfoOutlined />
                        </Button>

                        <ApplicantsTablePopover
                          content={contentOfPopover}
                          themeMode={themeMode}
                          anchorEl={popoverAnchorEl}
                          onClose={handlePopoverClose}
                          LinkString={LinkToPopover}
                        />
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
