import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  getCellStyles,
  getHeaderStyles,
  getTableStyles,
  getadditionalIsMobileStyling,
} from "../../../../styles/tablesStyles";
import { useContext } from "react";
import { ThemeContext } from "../../../../styles/ThemeProviderContext";
import { OfferFetchedForUserView } from "../OfferFetchedForUserView.interface";
import { getButtonStyles } from "../../../../styles/buttonStyling";

interface TableOffersViewProps {
  userOffers: OfferFetchedForUserView[];
  handleDeleteModalOpen: (argument: string) => void;
}

export const TableHeaderOffersViewComponents: React.FC<
  TableOffersViewProps
> = ({ userOffers, handleDeleteModalOpen }) => {
  const { themeMode } = useContext(ThemeContext);
  const tableStyles = getTableStyles();
  const headerStyles = getHeaderStyles(themeMode);
  const cellStyles = getCellStyles(themeMode);
  const additionalIsMobileStyling = getadditionalIsMobileStyling(themeMode);
  const buttonStyling = getButtonStyles(themeMode);

  return (
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
              sx={{
                margin: "20px 0px",
                "@media (max-screen: 768px)": { margin: "45px 0px" },
              }}
            >
              <TableCell sx={cellStyles}>
                <Typography variant="body2" sx={additionalIsMobileStyling}>
                  Title
                </Typography>

                {offer.title}
              </TableCell>
              <TableCell sx={cellStyles}>
                <Typography variant="body2" sx={additionalIsMobileStyling}>
                  Profession
                </Typography>

                {offer.label}
              </TableCell>
              <TableCell sx={cellStyles}>
                <Typography variant="body2" sx={additionalIsMobileStyling}>
                  Specialty:
                </Typography>

                {offer.specialties}
              </TableCell>
              <TableCell sx={cellStyles}>
                <Typography variant="body2" sx={additionalIsMobileStyling}>
                  Location:
                </Typography>

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
                  sx={buttonStyling}
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
    </>
  );
};
