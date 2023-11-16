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
import { fetchJobApplications } from "./ApplicantsForOffersComponents/JobApplicationFetchingLogic";

const ApplicantsWhoAppliedForOfferView: React.FC = () => {
  const [applications, setApplications] = useState<JobApplicationInterface[]>(
    []
  );
  const [dataIsBeingFetched, setDataIsBeingFetched] = useState(false);
  const [showDelayedContent, setShowDelayedContent] = useState(false);

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

  const displayAfterAWhile = (
    <Typography variant="h5">SIGN UP TO SEE THIS CONTENT</Typography>
  );

  useEffect(() => {
    setDataIsBeingFetched(true);
    fetchJobApplications(isEmployee, setApplications, setDataIsBeingFetched);

    // Set a timeout to show delayed content after 2 seconds
    const timeoutId = setTimeout(() => {
      setShowDelayedContent(true);
    }, 2000);

    // Clear the timeout if the component unmounts or when the data is fetched
    return () => clearTimeout(timeoutId);
  }, [isLoggedIn]);

  return (
    <Box sx={{ ...containerStyles, height: "100vh" }}>
      <HeaderForOtherRoutes
        routeView={isEmployee ? "Where I Applied" : "Who Applied"}
      />

      <Box>
        {isLoggedIn && (
          <motion.div
            className="black"
            initial={{ opacity: 0 }}
            animate={{ transition: { duration: 2 }, opacity: 1 }}
          >
            {!dataIsBeingFetched ? (
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
            ) : (
              <Box sx={{ height: "100vh" }}>
                <Typography variant="h5">Loading...</Typography>
              </Box>
            )}
          </motion.div>
        )}
        {!isLoggedIn && (
          <Box sx={{ height: "100vh" }}>
            {" "}
            {showDelayedContent && displayAfterAWhile}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ApplicantsWhoAppliedForOfferView;
