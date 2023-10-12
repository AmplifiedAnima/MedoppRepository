import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import { useAlertContext } from "../../utlis/AlertHandlingContext";
import AlertLayout from "../../utlis/Alerts";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filterOptions: FilterOptions) => void;
}

interface FilterOptions {
  minPrice: string;
  maxPrice: string;
  location: string;
  typeOfEmployment: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onApply,
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [location, setLocation] = useState<string>("");
  const [typeOfEmployment, setEmploymentType] = useState<string>("");
  const [isPriceRangeEnabled, setIsPriceRangeEnabled] =
    useState<boolean>(false);

  const { dispatch } = useAlertContext();
  
  const handleApply = () => {
    const filterOptions: FilterOptions = {
      minPrice: priceRange[0].toString(),
      maxPrice: priceRange[1].toString(),
      location: location.trim(),
      typeOfEmployment,
    };

    onApply(filterOptions);
    onClose();
  };

  const handlePriceRangeToggle = () => {
    setIsPriceRangeEnabled(!isPriceRangeEnabled);
    // Reset the price range values when disabling the price range
    if (!isPriceRangeEnabled) {
      setPriceRange([0, 20000]);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Advanced Search</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Salary Range (PLN)</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={isPriceRangeEnabled}
              onChange={handlePriceRangeToggle}
            />
          }
          label="Enable Price Range"
        />

        {isPriceRangeEnabled && (
          <Slider
            value={priceRange}
            onChange={(_, newValue) =>
              setPriceRange(newValue as [number, number])
            }
            min={2000}
            max={30000}
            valueLabelDisplay="auto"
            aria-label="Price Range Slider"
          />
        )}

        <Typography variant="subtitle1">Location:</Typography>
        <TextField
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          margin="normal"
        />

        <Typography variant="subtitle1">Employment Type:</Typography>
        <TextField
          select
          fullWidth
          value={typeOfEmployment}
          onChange={(e) => setEmploymentType(e.target.value.toUpperCase())}
          margin="normal"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="full-time">Full-Time</MenuItem>
          <MenuItem value="part-time">Part-Time</MenuItem>
          <MenuItem value="B2B">Contract B2B</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
