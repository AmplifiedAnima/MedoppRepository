import React, { useContext } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Offer } from "../../components/JobOffers/OfferInterface";
import { FilterState } from "../FilterContext";
import { getOfferIconUrl } from "./MapComponentUtils";
import { useNavigate } from "react-router";
import { ThemeContext } from "../../styles/ThemeProviderContext";

interface ClusterPopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  offers: Offer[];
  onClose: () => void;
  onOfferClickFromCluster: (offer: Offer) => void;
  filterState: FilterState;
}

const ClusterPopover: React.FC<ClusterPopoverProps> = ({
  open,
  anchorEl,
  offers,
  onClose,
  onOfferClickFromCluster,
  filterState,
}) => {
  const { themeMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleListItemClick = (offer: Offer) => {
    onOfferClickFromCluster(offer);
    navigate(`/offers/${offer.id}`);
    onClose();
  };

  return (
    
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box padding={2}>
        <Typography variant="h6">Cluster Offers</Typography>
        <List>
          {offers.map((offer, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleListItemClick(offer)}
            >
              <img
                src={getOfferIconUrl(offer.label, themeMode, false, filterState)}
                alt={offer.label}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <ListItemText primary={offer.title} secondary={offer.location} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Popover>

  );
};

export default ClusterPopover;
