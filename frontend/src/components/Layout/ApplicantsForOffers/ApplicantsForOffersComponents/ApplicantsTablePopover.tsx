import React from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { OfferInterface } from "../../../JobOffers/Offer.Interface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  Link,
  Button,
} from "@mui/material";
import { getButtonStyles } from "../../../../styles/buttonStyling";
import { JobApplicationInterface } from "../JobApplication.interface";

interface ApplicantsTablePopoverProps {
  content: OfferInterface | string;
  themeMode: string;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  LinkString?: string;
}

const ApplicantsTablePopover: React.FC<ApplicantsTablePopoverProps> = ({
  themeMode,
  anchorEl,
  onClose,
  content,
  LinkString,
}) => {
  const colorSx = {
    color: themeMode === "dark" ? "white" : "black",
    "@media (max-width: 768px)": {
      padding: "10px 0px",
      display: "block",
    },
  };
  const headerStyles = {
    color: themeMode === "dark" ? "white" : "black",
    "@media (max-width: 768px)": {
      padding: "10px 0px",
      display: "none",
    },
  };
  const buttonStyling = getButtonStyles(themeMode);

  const mobileHeaders = (content: string) => {
    return (
      <Typography
        sx={{
          color: themeMode === "dark" ? "#2feb00" : "#679af8",
          display: "none",
          "@media (max-width:768px)": {
            display: "block",
            marginBottom: "6px",
            fontSize: "13px",
          },
        }}
      >
        {content} :
      </Typography>
    );
  };

  const stringChecker = (content: OfferInterface | string) => {
    if (typeof content === "string") {
      if (content === "") {
        return (
          <>
            <Typography variant="body1">
              The cover letter was not submitted...
            </Typography>
          </>
        );
      }

      return (
        <>
          <Typography variant="body2">Cover letter</Typography>
          <br></br>
          <Typography variant="body2" sx={{ maxWidth: "400px" }}>
            {content}
          </Typography>
        </>
      );
    } else {
      return (
        <Table>
          <TableHead>
            {<TableCell sx={headerStyles}>Company</TableCell>}
            <TableCell sx={headerStyles}>Profession</TableCell>
            <TableCell sx={headerStyles}>Specialty</TableCell>
            <TableCell sx={headerStyles}>Location</TableCell>
            <TableCell sx={headerStyles}>Salary</TableCell>
            <TableCell sx={headerStyles}>Page </TableCell>
          </TableHead>
          <TableBody>
            <TableCell sx={colorSx}>
              {mobileHeaders("Company")}
              {content.company}
            </TableCell>
            <TableCell sx={colorSx}>
              {mobileHeaders("Profession")}
              {content.label}
            </TableCell>
            <TableCell sx={colorSx}>
              {mobileHeaders("Specialty")}
              {content.specialties}
            </TableCell>
            <TableCell sx={colorSx}>
              {mobileHeaders("Location")}
              {content.location}
            </TableCell>
            <TableCell sx={colorSx}>
              {mobileHeaders("Salary")}
              {content.salary}
            </TableCell>
            <TableCell sx={colorSx}>
              <Button sx={buttonStyling}>
                <Link href={LinkString} color="inherit" underline="none">
                  Visit
                </Link>
              </Button>
            </TableCell>
          </TableBody>
        </Table>
      );
    }
  };
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        width: "auto",
        height: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          color: themeMode === "dark" ? "white" : "black",
          background:
            themeMode === "dark"
              ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)"
              : "#FFFFFF",
          "@media (max-width: 768px)": {
            padding: "10px 0px",
            display: "block",
            width: "auto",
            height: "auto",
          },
          "@media (max-width: 280px)": {
            padding: "10px 0px",
            display: "block",
            height: "auto",
          },
        }}
      >
        <Box
          style={{
            wordWrap: "break-word",
            padding: "40px",
            color: themeMode === "dark" ? "white" : "black",
          }}
        >
          <Box>{stringChecker(content)}</Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default ApplicantsTablePopover;
