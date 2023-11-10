import React from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Offer } from "../../JobOffers/OfferInterface";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  Link,
  Button,
} from "@mui/material";
import { getButtonStyles } from "../../../styles/buttonStyling";

interface ApplicantsTablePopoverProps {
  content: Offer | string;
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
  const buttonStyling = getButtonStyles(themeMode);

  const stringChecker = (content: Offer | string) => {
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
      return content;
    } else {
      return (
        <Table>
          <TableHead>
            <TableCell sx={colorSx}>Company</TableCell>
            <TableCell sx={colorSx}>Profession</TableCell>
            <TableCell sx={colorSx}>Specialty</TableCell>
            <TableCell sx={colorSx}>Location</TableCell>
            <TableCell sx={colorSx}>Salary</TableCell>
            <TableCell sx={colorSx}>Page </TableCell>
          </TableHead>
          <TableBody>
            <TableCell sx={colorSx}>{content.company}</TableCell>
            <TableCell sx={colorSx}> {content.label}</TableCell>
            <TableCell sx={colorSx}>{content.specialties}</TableCell>
            <TableCell sx={colorSx}>{content.location}</TableCell>
            <TableCell sx={colorSx}>{content.salary}</TableCell>
            <TableCell sx={colorSx}>
              <Button sx={buttonStyling}>
                <Link href={LinkString} color="inherit" underline="hover">
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
          width: "auto",
          height: "auto",
          color: themeMode === "dark" ? "white" : "black",
          background:
            themeMode === "dark"
              ? "linear-gradient(20deg, rgb(0, 0, 0) 2%, #263139 69%)"
              : "#FFFFFF",
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
