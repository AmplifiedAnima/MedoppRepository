import React, { useContext } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Link,
  Button,
} from "@mui/material";
import { ThemeContext } from "../../../../styles/ThemeProviderContext";
import { Description } from "@mui/icons-material";
import { InfoOutlined } from "@mui/icons-material";
import {
  getTableStyles,
  getCellStyles,
  getHeaderStyles,
  getadditionalIsMobileStyling,
} from "../../../../styles/tablesStyles";
import { getButtonStyles } from "../../../../styles/buttonStyling";
import { JobApplicationInterface } from "../JobApplication.interface";
import { OfferInterface } from "../../../JobOffers/Offer.Interface";
import ApplicantsTablePopover from "./ApplicantsTablePopover";

interface ApplicantsWhoAppliedForOfferViewComponentsProps {
  applications: JobApplicationInterface[];
  handlePopoverOpen: (content: string | OfferInterface) => (event: any) => void;
  setLinkToPopover: (args: string) => void;
  content: OfferInterface | string;
  themeMode: string;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  LinkString?: string;
}

export const ApplicantsWhoAppliedForOfferViewComponents: React.FC<
  ApplicantsWhoAppliedForOfferViewComponentsProps
> = ({
  applications,
  handlePopoverOpen,
  setLinkToPopover,
  content,
  anchorEl,
  onClose,
  LinkString,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const tableStyles = getTableStyles();
  const cellStyles = getCellStyles(themeMode);
  const headerStyles = getHeaderStyles(themeMode);

  const additionalIsMobileStyling = getadditionalIsMobileStyling(themeMode);

  const buttonStyling = getButtonStyles(themeMode);

  const handleLinkSpilling = (args: string) => () => {
    setLinkToPopover(args);
  };

  return (
    <>
      <Table sx={tableStyles}>
        <TableHead>
          <TableRow>
            <TableCell sx={headerStyles}>
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
              <Typography variant="h5">Curriculum Vitae</Typography>
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
                    <Typography variant="body2" sx={additionalIsMobileStyling}>
                      First Name
                    </Typography>
                  </>

                  <Typography> {application.firstName}</Typography>
                </TableCell>
                <TableCell sx={cellStyles}>
                  <Typography variant="body2" sx={additionalIsMobileStyling}>
                    First Name
                  </Typography>

                  <Typography> {application.lastName}</Typography>
                </TableCell>
                <TableCell sx={cellStyles}>
                  <>
                    <Typography variant="body2" sx={additionalIsMobileStyling}>
                      First Name
                    </Typography>
                  </>

                  <Typography> {application.email}</Typography>
                </TableCell>
                <TableCell sx={cellStyles}>
                  <>
                    <Typography variant="body1" sx={additionalIsMobileStyling}>
                      First Name
                    </Typography>
                  </>

                  <Typography> {application.phoneNumber}</Typography>
                </TableCell>
                <TableCell sx={cellStyles}>
                  <>
                    <Typography variant="body2" sx={additionalIsMobileStyling}>
                      {" "}
                      Cover Letter
                    </Typography>
                    <Button
                      onClick={handlePopoverOpen(application.coverLetter)}
                      sx={{
                        ...buttonStyling,
                        width: "100px",
                        "@media (max-width: 1024px)": {
                          width: "80px",
                        },
                        "@media (max-width: 768px)": {
                          width: "100%",
                        },
                      }}
                    >
                      <Description />
                    </Button>
                  </>

                  <ApplicantsTablePopover
                    content={content}
                    themeMode={themeMode}
                    anchorEl={anchorEl}
                    onClose={onClose}
                  />
                </TableCell>
                <TableCell sx={cellStyles}>
                  <Typography variant="body2" sx={additionalIsMobileStyling}>
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
                        width: "100px",
                        maxWidth: "100%",
                        "@media (max-width: 100px)": {
                          width: "80px",
                        },
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
                  <Typography variant="body2" sx={additionalIsMobileStyling}>
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
                    content={content}
                    themeMode={themeMode}
                    anchorEl={anchorEl}
                    onClose={onClose}
                    LinkString={LinkString}
                  />
                </TableCell>
              </TableRow>
              <Box
                sx={{
                  padding: "0",
                  "@media (max-width: 768px)": {
                    padding: "20px 0px",
                  },
                }}
              />
            </>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
