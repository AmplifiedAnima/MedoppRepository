import React, { useState, useEffect, useContext } from "react";
import { Typography, Box } from "@mui/material";
import { ThemeContext } from "../../../styles/ThemeProviderContext";
import { IsLoggedInContext } from "../../../utlis/IsLoggedInContext";
import HeaderForOtherRoutes from "../../Header/HeaderForOtherRoutes";

import {
  getContainerStyles,
  getInnerBoxStyles,
} from "../../../styles/tablesStyles";
import { motion } from "framer-motion";
import { OfferInterface } from "../../JobOffers/Offer.Interface";
import { JobApplicationInterface } from "./JobApplication.interface";
import { ApplicantsWhoAppliedForOfferViewComponents } from "./ApplicantsForOffersComponents/ApplicantsWhoAppliedForOfferViewComponents";

const ApplicantsWhoAppliedForOfferView: React.FC = () => {
  const [applications, setApplications] = useState<JobApplicationInterface[]>(
    []
  );
  const [dataIsBeingFetched, setDataIsBeingFetched] = useState(false);
  const { themeMode } = useContext(ThemeContext);

  const { isLoggedIn, roles } = useContext(IsLoggedInContext);
  const isEmployee = isLoggedIn && roles.includes("Employee");

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [contentOfPopover, setcontentOfPopover] = useState<
    string | OfferInterface
  >("");
  const [LinkToPopover, setLinkToPopover] = useState("");

  const handlePopoverOpen =
    (content: string | OfferInterface) => (event: any) => {
      setPopoverAnchorEl(event.currentTarget);
      setcontentOfPopover(content);
    };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const containerStyles = getContainerStyles(themeMode);
  const innerBoxStyles = getInnerBoxStyles();

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
        routeView={isEmployee ? "Where I Applied" : "Who Applied"}
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
            <ApplicantsWhoAppliedForOfferViewComponents
              applications={applications}
              setLinkToPopover={setLinkToPopover}
              handlePopoverOpen={handlePopoverOpen}
              content={contentOfPopover}
              themeMode={themeMode}
              anchorEl={popoverAnchorEl}
              onClose={handlePopoverClose}
              LinkString={LinkToPopover}
            />
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default ApplicantsWhoAppliedForOfferView;
